/*
 * Join / leave / full / creator messaging for the game detail screen.
 */
import { styles } from '@/styles/components/GameDetailJoinSection.styles';
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
    return <Text style={styles.creatorNote}>You created this game</Text>;
  }

  if (isJoined) {
    return (
      <Pressable
        onPress={onLeave}
        disabled={pending}
        style={[styles.leaveButton, pending && styles.leaveButtonPending]}>
        {pending ? (
          <ActivityIndicator color="#dc2626" />
        ) : (
          <Text style={styles.leaveText}>Leave Game</Text>
        )}
      </Pressable>
    );
  }

  if (isFull) {
    return (
      <Pressable disabled style={styles.fullButton}>
        <Text style={styles.fullText}>Game Full</Text>
      </Pressable>
    );
  }

  const joinDisabled = pending || !userId;

  return (
    <Pressable
      onPress={onJoin}
      disabled={joinDisabled}
      style={[
        styles.joinButton,
        joinDisabled ? styles.joinButtonDisabled : styles.joinButtonEnabled,
      ]}>
      {pending ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.joinText}>Join Game</Text>
      )}
    </Pressable>
  );
}
