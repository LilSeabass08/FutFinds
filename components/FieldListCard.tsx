/*
 * Summary row for one approved field: name, address, distance — tappable to pre-fill Create Game.
 */
import { getFieldListCardStyles } from '@/styles/components/FieldListCard.styles';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import type { SoccerField } from '@/types';
import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

export interface FieldListCardProps {
  field: SoccerField;
  distanceMiles: number;
  onPress: () => void;
}

function formatDistanceMiles(miles: number): string {
  if (miles < 10) {
    return `${miles.toFixed(1)} mi`;
  }
  return `${Math.round(miles)} mi`;
}

export function FieldListCard({ field, distanceMiles, onPress }: FieldListCardProps) {
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getFieldListCardStyles(colorScheme), [colorScheme]);

  const label = `${field.name}, ${formatDistanceMiles(distanceMiles)} away, ${field.address}`;

  return (
    <Pressable
      onPress={onPress}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`${label}. Opens Create game with this venue.`}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{field.name}</Text>
        <View style={styles.distancePill}>
          <Text style={styles.distanceText}>{formatDistanceMiles(distanceMiles)}</Text>
        </View>
      </View>
      <Text style={styles.address}>{field.address}</Text>
    </Pressable>
  );
}
