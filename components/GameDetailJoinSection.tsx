/*
 * Join / leave / full / creator messaging for the game detail screen.
 */
import type { Game } from '@/types';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

export interface GameDetailJoinSectionProps {
  game: Game;
  userId: string | undefined;
  pending: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

export function GameDetailJoinSection({
  game,
  userId,
  pending,
  onJoin,
  onLeave,
}: GameDetailJoinSectionProps) {
  const isCreator = Boolean(userId && userId === game.createdBy);
  const isJoined = Boolean(userId && game.playersJoined.includes(userId));
  const isFull = game.playersJoined.length >= game.playersMax;

  if (isCreator) {
    return (
      <Text style={{ fontSize: 14, color: '#64748b', fontStyle: 'italic', marginTop: 8 }}>
        You created this game
      </Text>
    );
  }

  if (isJoined) {
    return (
      <Pressable
        onPress={onLeave}
        disabled={pending}
        style={{
          marginTop: 12,
          paddingVertical: 14,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#dc2626',
          backgroundColor: '#fff',
          alignItems: 'center',
          opacity: pending ? 0.7 : 1,
        }}>
        {pending ? (
          <ActivityIndicator color="#dc2626" />
        ) : (
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#dc2626' }}>Leave Game</Text>
        )}
      </Pressable>
    );
  }

  if (isFull) {
    return (
      <Pressable
        disabled
        style={{
          marginTop: 12,
          paddingVertical: 14,
          borderRadius: 10,
          backgroundColor: '#e5e7eb',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#9ca3af' }}>Game Full</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onJoin}
      disabled={pending || !userId}
      style={{
        marginTop: 12,
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: pending || !userId ? '#86efac' : '#16a34a',
        alignItems: 'center',
        opacity: pending || !userId ? 0.85 : 1,
      }}>
      {pending ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Join Game</Text>
      )}
    </Pressable>
  );
}
