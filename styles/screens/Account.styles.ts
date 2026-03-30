/**
 * Theme-aware styles for the Account tab screen.
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getAccountScreenStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  return {
    activityIndicatorColor: isDark ? Colors.dark.background : '#ffffff',
    safe: { flex: 1 as const, backgroundColor: c.background },
    container: { flex: 1 as const, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
    headerBlock: { alignItems: 'center' as const, marginBottom: 8 },
    displayName: {
      fontSize: 26,
      fontWeight: '700' as const,
      textAlign: 'center' as const,
      color: c.text,
      marginBottom: 16,
    },
    avatarCircle: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: c.surfaceMuted,
      borderWidth: 2,
      borderColor: c.border,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    avatarInitial: { fontSize: 36, fontWeight: '700' as const, color: c.tint },
    avatarActivityIndicatorColor: c.tint,
    statsBlock: {
      marginTop: 28,
      borderRadius: 12,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      overflow: 'hidden' as const,
    },
    statRow: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    statRowDivider: { borderTopWidth: 1, borderTopColor: c.border },
    statLabel: { fontSize: 16, color: c.text },
    statValue: { fontSize: 16, fontWeight: '600' as const, color: c.tint },
    spacer: { flex: 1 as const, minHeight: 24 },
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
