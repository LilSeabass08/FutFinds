/**
 * Map tab placeholder screen — theme-aware (matches Account tab canvas).
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getMapScreenStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    root: {
      flex: 1 as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      backgroundColor: c.background,
    },
    placeholderText: {
      fontSize: 16,
      color: c.text,
    },
  };
}
