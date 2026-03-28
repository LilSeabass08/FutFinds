/*
 * Surface pills, game-type cards, and minigame option pills for the Create Game screen.
 */
import type { CreateGameScreenFormValues, Game } from '@/types';
import { MINIGAME_OPTIONS } from '@/types';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const SELECTED = {
  borderColor: '#22c55e',
  backgroundColor: 'rgba(34, 197, 94, 0.18)',
} as const;

const UNSELECTED = {
  borderColor: '#d1d5db',
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
} as const;

const SURFACE_OPTIONS: { value: Game['surface']; label: string }[] = [
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'futsal', label: 'Futsal' },
];

interface CreateGameSurfacePillsProps {
  value: CreateGameScreenFormValues['surface'];
  onChange: (v: Game['surface']) => void;
  error?: string;
}

export function CreateGameSurfacePills({ value, onChange, error }: CreateGameSurfacePillsProps) {
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {SURFACE_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 999,
                borderWidth: 2,
                ...(selected ? SELECTED : UNSELECTED),
              }}>
              <Text style={{ fontWeight: '600', color: '#111827' }}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={{ color: '#b91c1c', marginTop: 6, fontSize: 13 }}>{error}</Text> : null}
    </View>
  );
}

interface CreateGameTypeCardsProps {
  value: '' | Game['type'];
  onChange: (v: Game['type']) => void;
  error?: string;
}

export function CreateGameTypeCards({ value, onChange, error }: CreateGameTypeCardsProps) {
  const cards: { value: Game['type']; label: string }[] = [
    { value: 'scrimmage', label: 'Scrimmage' },
    { value: 'minigame', label: 'Minigame' },
  ];
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {cards.map((opt) => {
          const selected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={{
                flex: 1,
                minHeight: 88,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                borderWidth: 2,
                padding: 12,
                ...(selected ? SELECTED : UNSELECTED),
              }}>
              <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={{ color: '#b91c1c', marginTop: 6, fontSize: 13 }}>{error}</Text> : null}
    </View>
  );
}

interface CreateGameMinigamePillsProps {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export function CreateGameMinigamePills({ value, onChange, error }: CreateGameMinigamePillsProps) {
  return (
    <View style={{ marginBottom: 12 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {MINIGAME_OPTIONS.map((opt) => {
          const selected = value === opt;
          return (
            <Pressable
              key={opt}
              onPress={() => onChange(opt)}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 999,
                borderWidth: 2,
                ...(selected ? SELECTED : UNSELECTED),
              }}>
              <Text style={{ fontWeight: '600', color: '#111827' }}>{opt}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {error ? <Text style={{ color: '#b91c1c', marginTop: 6, fontSize: 13 }}>{error}</Text> : null}
    </View>
  );
}
