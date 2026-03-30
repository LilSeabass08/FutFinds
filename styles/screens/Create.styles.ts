/**
 * Create Game screen layout, scroll, and submit control — theme-aware (matches Account tab canvas).
 */
import { Colors, palette } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getCreateScreenStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    safe: { flex: 1 as const, backgroundColor: c.background },
    flex: { flex: 1 as const, backgroundColor: c.background },
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
    },
    submitButton: {
      marginTop: 8,
      backgroundColor: palette.green600,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center' as const,
    },
    submitButtonBusy: {
      opacity: 0.85,
    },
    submitLabel: {
      color: palette.white,
      fontWeight: '700' as const,
      fontSize: 16,
    },
    submitError: {
      color: colorScheme === 'dark' ? '#fca5a5' : palette.red700,
      marginTop: 12,
      textAlign: 'center' as const,
    },
  };
}
