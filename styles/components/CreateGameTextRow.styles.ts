/**
 * Labeled text field rows on the Create Game screen — theme-aware labels on canvas.
 */
import { Colors, palette } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getCreateGameTextRowStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    row: {
      marginBottom: 14,
    },
    label: {
      fontWeight: '600' as const,
      marginBottom: 6,
      color: c.icon,
    },
    hint: {
      fontSize: 12,
      color: c.tabIconDefault,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? c.border : '#d1d5db',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: palette.gray900,
      backgroundColor: palette.white,
    },
    fieldError: {
      color: colorScheme === 'dark' ? '#fca5a5' : palette.red700,
      fontSize: 13,
      marginTop: 4,
    },
    placeholderTextColor: c.tabIconDefault,
  };
}
