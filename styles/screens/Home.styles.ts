/**
 * Games list (tab home) screen layout and typography — theme-aware (matches Account tab canvas).
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getHomeScreenStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    safe: { flex: 1 as const, backgroundColor: c.background },
    header: {
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    title: {
      fontSize: 26,
      fontWeight: '800' as const,
      color: c.text,
      marginBottom: 4,
    },
    errorBanner: {
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    errorText: {
      color: colorScheme === 'dark' ? '#fca5a5' : '#b91c1c',
      textAlign: 'center' as const,
    },
    centerFill: {
      flex: 1 as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    list: {
      flex: 1 as const,
      backgroundColor: c.background,
    },
    listContent: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingBottom: 24,
    },
    listContentEmpty: {
      justifyContent: 'center' as const,
    },
    emptyState: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingVertical: 48,
    },
    emptyText: {
      fontSize: 16,
      color: c.icon,
    },
  };
}
