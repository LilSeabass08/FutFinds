/*
 * Pressable summary card for one game: venue, schedule, capacity, and surface/type badges.
 */
import { getGameTypeLabel } from '@/lib/gameDisplay';
import { styles } from '@/styles/components/GameCard.styles';
import { GAME_SURFACE_BADGE } from '@/styles/theme';
import type { Game } from '@/types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface GameCardProps {
  game: Game;
  onPress: () => void;
}

export function GameCard({ game, onPress }: GameCardProps) {
  const joined = game.playersJoined.length;
  const cap = game.playersMax;
  const isFull = joined >= cap;
  const fillRatio = cap > 0 ? Math.min(joined / cap, 1) : 0;

  const surface = GAME_SURFACE_BADGE[game.surface];
  const typeLabel = getGameTypeLabel(game);
  const accessibilityLabel = `${game.title}, ${surface.label}, ${typeLabel}, ${joined} of ${cap} players${
    isFull ? ', full' : ''
  }`;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}>
      <View style={styles.card}>
        <Text style={styles.title}>{game.title}</Text>

        <View style={styles.badgeRow}>
          <View style={[styles.surfacePill, { backgroundColor: surface.bg }]}>
            <Text style={[styles.surfacePillText, { color: surface.text }]}>{surface.label}</Text>
          </View>
          <View style={styles.typePill}>
            <Text style={styles.typePillText}>{getGameTypeLabel(game)}</Text>
          </View>
          {isFull ? (
            <View style={styles.fullPill}>
              <Text style={styles.fullPillText}>Full</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.meta}>
          📍 {game.fieldName} · {game.address}
        </Text>
        <Text style={styles.metaLast}>
          🗓 {game.date} · {game.time}
        </Text>

        {!isFull ? (
          <Text style={styles.playersLine}>
            {joined} / {cap} players
          </Text>
        ) : null}

        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              isFull ? styles.fillFull : styles.fillOpen,
              { width: `${fillRatio * 100}%` },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
