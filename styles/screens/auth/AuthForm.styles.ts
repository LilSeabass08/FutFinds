/**
 * Theme-aware styles for login and signup screens (shared with useAuthFormAppearance).
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';
import { Platform } from 'react-native';

export function getAuthFormStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];
  const isDark = colorScheme === 'dark';

  return {
    activityIndicatorColor: isDark ? Colors.dark.background : '#ffffff',
    screen: { flex: 1 as const, backgroundColor: c.background },
    flex: { flex: 1 as const },
    scrollContent: {
      padding: 24,
      paddingBottom: 48,
      flexGrow: 1,
      backgroundColor: c.background,
    },
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
      marginBottom: 8,
      color: c.text,
    },
    subtitle: { fontSize: 16, marginBottom: 24, color: c.icon },
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      marginBottom: 6,
      marginTop: 12,
      color: c.text,
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      fontSize: 16,
      color: c.text,
      backgroundColor: c.surface,
      borderColor: c.border,
    },
    placeholderColor: c.icon,
    fieldError: {
      color: isDark ? '#fca5a5' : '#b91c1c',
      fontSize: 13,
      marginTop: 4,
    },
    errorBanner: {
      color: isDark ? '#fecaca' : '#991b1b',
      marginBottom: 12,
      padding: 12,
      backgroundColor: isDark ? '#450a0a' : '#fee2e2',
      borderRadius: 8,
    },
    button: {
      backgroundColor: c.tint,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center' as const,
      marginTop: 24,
    },
    buttonDisabled: { opacity: 0.6 },
    buttonText: {
      color: isDark ? Colors.dark.background : '#ffffff',
      fontSize: 16,
      fontWeight: '600' as const,
    },
    linkWrap: { marginTop: 20, alignItems: 'center' as const },
    link: { fontSize: 15, color: c.accent, fontWeight: '600' as const },
  };
}
