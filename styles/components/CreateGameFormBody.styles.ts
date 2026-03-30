/**
 * Typography and labels for the Create Game form body — theme-aware (readable on tab canvas).
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getCreateGameFormBodyStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    screenTitle: {
      fontSize: 22,
      fontWeight: '700' as const,
      marginBottom: 16,
      color: c.tint,
    },
    fieldLabel: {
      fontWeight: '600' as const,
      marginBottom: 6,
      color: c.tint,
    },
  };
}
