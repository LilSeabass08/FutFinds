/*
 * Game detail: load by route id, show info, join/leave with Firestore helpers.
 */
import { GameDetailJoinSection } from '@/components/GameDetailJoinSection';
import { getGameTypeLabel, GAME_SURFACE_BADGE } from '@/constants/gameDisplay';
import { getGameById, joinGame, leaveGame } from '@/firebase';
import { useAuth } from '@/hooks/AuthContext';
import type { Game } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getRouteGameId(raw: string | string[] | undefined): string | undefined {
  if (raw == null) {
    return undefined;
  }
  return typeof raw === 'string' ? raw : raw[0];
}

export default function GameDetailScreen() {
  const navigation = useNavigation();
  const { id: rawId } = useLocalSearchParams<{ id: string | string[] }>();
  const gameId = getRouteGameId(rawId);
  const { user } = useAuth();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const reloadGame = useCallback(async () => {
    if (!gameId) {
      return;
    }
    const next = await getGameById(gameId);
    if (next) {
      setGame(next);
    }
  }, [gameId]);

  useEffect(() => {
    let active = true;

    if (!gameId) {
      setLoadError('Missing game link.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(null);

    getGameById(gameId)
      .then((g) => {
        if (!active) {
          return;
        }
        if (!g) {
          setGame(null);
          setLoadError('Game not found.');
        } else {
          setGame(g);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }
        setLoadError('Could not load this game.');
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [gameId]);

  useLayoutEffect(() => {
    if (game?.title) {
      navigation.setOptions({ title: game.title });
    }
  }, [game?.title, navigation]);

  const onJoin = async () => {
    if (!user?.uid || !game) {
      return;
    }
    setActionError(null);
    setPending(true);
    try {
      await joinGame(game.id, user.uid);
      await reloadGame();
    } catch {
      setActionError('Could not join this game. Try again.');
    } finally {
      setPending(false);
    }
  };

  const onLeave = async () => {
    if (!user?.uid || !game) {
      return;
    }
    setActionError(null);
    setPending(true);
    try {
      await leaveGame(game.id, user.uid);
      await reloadGame();
    } catch {
      setActionError('Could not leave this game. Try again.');
    } finally {
      setPending(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0fdf4' }}>
        <ActivityIndicator size="large" color="#15803d" />
      </View>
    );
  }

  if (loadError || !game) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f0fdf4' }} edges={['bottom']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <Text style={{ fontSize: 16, color: '#b91c1c', textAlign: 'center' }}>
            {loadError ?? 'Game not found.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const surface = GAME_SURFACE_BADGE[game.surface];
  const joined = game.playersJoined.length;
  const cap = game.playersMax;
  const fillRatio = cap > 0 ? Math.min(joined / cap, 1) : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0fdf4' }} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 12 }}>
          {game.title}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor: surface.bg,
            }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: surface.text }}>{surface.label}</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 8,
              backgroundColor: '#f1f5f9',
            }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155' }}>{getGameTypeLabel(game)}</Text>
          </View>
        </View>

        <Text style={{ fontSize: 15, color: '#475569', marginBottom: 8 }}>
          📍 {game.fieldName}, {game.address}
        </Text>
        <Text style={{ fontSize: 15, color: '#475569', marginBottom: 20 }}>
          🗓 {game.date} · {game.time}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 8 }}>Players</Text>
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          {joined} / {cap} players joined
        </Text>

        <View style={{ height: 8, borderRadius: 4, backgroundColor: '#e2e8f0', overflow: 'hidden', marginBottom: 16 }}>
          <View
            style={{
              height: '100%',
              width: `${fillRatio * 100}%`,
              borderRadius: 4,
              backgroundColor: joined >= cap ? '#94a3b8' : '#22c55e',
            }}
          />
        </View>

        <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>Joined</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
          {game.playersJoined.map((playerId) => (
            <View
              key={playerId}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#e2e8f0',
                borderWidth: 2,
                borderColor: '#cbd5e1',
              }}
            />
          ))}
        </View>

        <GameDetailJoinSection
          game={game}
          userId={user?.uid}
          pending={pending}
          onJoin={onJoin}
          onLeave={onLeave}
        />

        {actionError ? (
          <Text style={{ color: '#b91c1c', marginTop: 12, textAlign: 'center' }}>{actionError}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
