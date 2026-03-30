/*
 * Surface pills, game-type cards, and minigame option pills for the Create Game screen.
 */
import { getCreateGameFormControlsStyles } from '@/styles/components/CreateGameFormControls.styles';
import type { CreateGameScreenFormValues, Game } from '@/types';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { MINIGAME_OPTIONS } from '@/types';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

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
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateGameFormControlsStyles(colorScheme), [colorScheme]);

  return (
    <View style={styles.block}>
      <View style={styles.rowWrap}>
        {SURFACE_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[styles.surfacePill, selected ? styles.selectedStyle : styles.unselectedStyle]}>
              <Text style={styles.surfacePillLabel}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

interface CreateGameTypeCardsProps {
  value: '' | Game['type'];
  onChange: (v: Game['type']) => void;
  error?: string;
}

export function CreateGameTypeCards({ value, onChange, error }: CreateGameTypeCardsProps) {
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateGameFormControlsStyles(colorScheme), [colorScheme]);

  const cards: { value: Game['type']; label: string }[] = [
    { value: 'scrimmage', label: 'Scrimmage' },
    { value: 'minigame', label: 'Minigame' },
  ];
  return (
    <View style={styles.block}>
      <View style={styles.row}>
        {cards.map((opt) => {
          const selected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[styles.typeCard, selected ? styles.selectedStyle : styles.unselectedStyle]}>
              <Text style={styles.typeCardLabel}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

interface CreateGameMinigamePillsProps {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export function CreateGameMinigamePills({ value, onChange, error }: CreateGameMinigamePillsProps) {
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateGameFormControlsStyles(colorScheme), [colorScheme]);

  return (
    <View style={styles.block}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.minigameScroll}>
        {MINIGAME_OPTIONS.map((opt) => {
          const selected = value === opt;
          return (
            <Pressable
              key={opt}
              onPress={() => onChange(opt)}
              style={[styles.minigamePill, selected ? styles.selectedStyle : styles.unselectedStyle]}>
              <Text style={styles.minigamePillLabel}>{opt}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}
