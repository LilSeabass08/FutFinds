/*
 * Horizontal scrollable surface filter pills for the games list (All | Outdoor | Indoor | Futsal).
 */
import {
  FILTER_PILL_ACTIVE,
  FILTER_PILL_INACTIVE,
  styles,
} from '@/styles/components/GameListSurfaceFilterRow.styles';
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

export function GameListSurfaceFilterRow({ active, onChange }: GameListSurfaceFilterRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      {OPTIONS.map((opt) => {
        const isActive = active === opt.value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.pill, isActive ? FILTER_PILL_ACTIVE : FILTER_PILL_INACTIVE]}>
            <Text
              style={[
                styles.pillLabel,
                isActive ? styles.pillLabelActive : styles.pillLabelInactive,
              ]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
