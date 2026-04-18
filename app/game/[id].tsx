/*
 * Game detail: load by route id, show info, join/leave with Firestore helpers.
 */
import { GameDetailJoinSection } from '@/components/GameDetailJoinSection';
import { deleteGame, getGameById, joinGame, leaveGame } from '@/firebase';
import { useAuth } from '@/hooks/AuthContext';
import { getGameTypeLabel } from '@/lib/gameDisplay';
import { styles } from '@/styles/screens/GameDetail.styles';
import { Colors, GAME_SURFACE_BADGE } from '@/styles/theme';
import type { Game } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
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
  const router = useRouter();
  const { id: rawId } = useLocalSearchParams<{ id: string | string[] }>();
  const gameId = getRouteGameId(rawId);
  const { user } = useAuth();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
    navigation.setOptions({
      headerBackButtonDisplayMode: 'minimal',
      ...(game?.title ? { title: game.title } : {}),
    });
  }, [game?.title, navigation]);

  const onConfirmDeleteGame = useCallback(async () => {
    if (!gameId) {
      return;
    }
    setDeleteError(null);
    setDeletePending(true);
    try {
      await deleteGame(gameId);
      router.replace('/(tabs)');
    } catch {
      setDeleteError('Could not delete this game. Try again.');
    } finally {
      setDeletePending(false);
    }
  }, [gameId, router]);

  const onPressDeleteGame = useCallback(() => {
    Alert.alert(
      'Delete Game',
      'Are you sure you want to remove this listing? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            void onConfirmDeleteGame();
          },
        },
      ],
    );
  }, [onConfirmDeleteGame]);

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
      <View style={styles.loadingRoot}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  if (loadError || !game) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.errorCenter}>
          <Text style={styles.errorText}>{loadError ?? 'Game not found.'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const surface = GAME_SURFACE_BADGE[game.surface];
  const joined = game.playersJoined.length;
  const cap = game.playersMax;
  const fillRatio = cap > 0 ? Math.min(joined / cap, 1) : 0;
  const isFull = joined >= cap;
  const isCreator = Boolean(user?.uid && user.uid === game.createdBy);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.gameTitle}>{game.title}</Text>

        <View style={styles.badgeRow}>
          <View style={[styles.surfacePill, { backgroundColor: surface.bg }]}>
            <Text style={[styles.surfacePillText, { color: surface.text }]}>{surface.label}</Text>
          </View>
          <View style={styles.typePill}>
            <Text style={styles.typePillText}>{getGameTypeLabel(game)}</Text>
          </View>
        </View>

        <Text style={styles.meta}>
          📍 {game.fieldName}, {game.address}
        </Text>
        <Text style={styles.metaSpaced}>
          🗓 {game.date} · {game.time}
        </Text>

        <Text style={styles.sectionTitle}>Players</Text>
        <Text style={styles.playersSummary}>
          {joined} / {cap} players joined
        </Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              isFull ? styles.progressFillFull : styles.progressFillOpen,
              { width: `${fillRatio * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.joinedHeading}>Joined</Text>
        <View style={styles.joinedRow}>
          {game.playersJoined.map((playerId) => (
            <View key={playerId} style={styles.playerAvatar} />
          ))}
        </View>

        <GameDetailJoinSection
          game={game}
          userId={user?.uid}
          pending={pending}
          onJoin={onJoin}
          onLeave={onLeave}
        />

        {isCreator ? (
          <>
            <Pressable
              onPress={onPressDeleteGame}
              disabled={deletePending}
              style={[
                styles.deleteGameButton,
                deletePending && styles.deleteGameButtonPending,
              ]}>
              {deletePending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.deleteGameButtonText}>Delete Game</Text>
              )}
            </Pressable>
            {deleteError ? <Text style={styles.deleteError}>{deleteError}</Text> : null}
          </>
        ) : null}

        {actionError ? <Text style={styles.actionError}>{actionError}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
}
