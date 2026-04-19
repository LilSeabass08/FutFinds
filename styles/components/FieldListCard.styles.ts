/**
 * Theme-aware list row card for one approved soccer field (Fields tab).
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getFieldListCardStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    card: {
      backgroundColor: c.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: c.border,
      padding: 16,
      marginVertical: 6,
    },
    topRow: {
      flexDirection: 'row' as const,
      alignItems: 'flex-start' as const,
      justifyContent: 'space-between' as const,
      gap: 12,
      marginBottom: 8,
    },
    name: {
      flex: 1,
      fontSize: 17,
      fontWeight: '700' as const,
      color: c.text,
    },
    distancePill: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
      backgroundColor: c.surfaceMuted,
    },
    distanceText: {
      fontSize: 13,
      fontWeight: '700' as const,
      color: c.tint,
    },
    address: {
      fontSize: 14,
      lineHeight: 20,
      color: c.icon,
    },
  };
}
