/*
 * Composed styles for the Account tab screen.
 * Uses palette from theme.ts.
 */
import { Colors } from '@/constants/theme';
import type { ColorSchemeName } from '@/types';

export function getAccountScreenStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  return {
    activityIndicatorColor: isDark ? Colors.dark.background : '#ffffff',
    safe: { flex: 1 as const, backgroundColor: c.background },
    container: { flex: 1 as const, padding: 24 },
    title: { fontSize: 24, fontWeight: '700' as const, marginBottom: 8, color: c.text },
    email: { fontSize: 16, color: c.icon, marginBottom: 24 },
    error: { color: isDark ? '#fca5a5' : '#b91c1c', marginBottom: 12 },
    button: {
      backgroundColor: c.tint,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center' as const,
    },
    buttonDisabled: { opacity: 0.6 },
    buttonText: {
      color: isDark ? Colors.dark.background : '#ffffff',
      fontSize: 16,
      fontWeight: '600' as const,
    },
  };
}
