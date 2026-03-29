/*
 * Pressable summary card for one game: venue, schedule, capacity, and surface/type badges.
 */
import { getGameTypeLabel, GAME_SURFACE_BADGE } from '@/constants/gameDisplay';
import type { Game } from '@/types';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

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
    isFull ? ", full" : ""
  }`;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 14,
          padding: 16,
          marginVertical: 6,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
            },
            android: { elevation: 3 },
            default: {},
          }),
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: 10,
          }}
        >
          {game.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor: surface.bg,
            }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "700", color: surface.text }}
            >
              {surface.label}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 8,
              backgroundColor: "#f1f5f9",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#334155" }}>
              {getGameTypeLabel(game)}
            </Text>
          </View>
          {isFull ? (
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: "#fee2e2",
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "700", color: "#b91c1c" }}
              >
                Full
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={{ fontSize: 14, color: "#475569", marginBottom: 4 }}>
          📍 {game.fieldName} · {game.address}
        </Text>
        <Text style={{ fontSize: 14, color: "#475569", marginBottom: 12 }}>
          🗓 {game.date} · {game.time}
        </Text>

        {!isFull ? (
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#0f172a",
              marginBottom: 8,
            }}
          >
            {joined} / {cap} players
          </Text>
        ) : null}

        <View
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#e2e8f0",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: "100%",
              width: `${fillRatio * 100}%`,
              borderRadius: 3,
              backgroundColor: isFull ? "#94a3b8" : "#22c55e",
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
