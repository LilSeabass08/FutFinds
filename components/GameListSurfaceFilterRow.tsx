/*
 * Horizontal scrollable surface filter pills for the games list (All | Outdoor | Indoor | Futsal).
 */
import type { SurfaceFilter } from '@/types';
import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';

export interface GameListSurfaceFilterRowProps {
  active: SurfaceFilter['type'];
  onChange: (next: SurfaceFilter['type']) => void;
}

const OPTIONS: { value: SurfaceFilter['type']; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'indoor', label: 'Indoor' },
  { value: 'futsal', label: 'Futsal' },
];

const ACTIVE = {
  borderColor: '#16a34a',
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
} as const;

const INACTIVE = {
  borderColor: '#d1d5db',
  backgroundColor: '#ffffff',
} as const;

export function GameListSurfaceFilterRow({ active, onChange }: GameListSurfaceFilterRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 4, paddingBottom: 12 }}>
      {OPTIONS.map((opt) => {
        const isActive = active === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 999,
              borderWidth: 2,
              ...(isActive ? ACTIVE : INACTIVE),
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: isActive ? '#15803d' : '#374151',
              }}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
