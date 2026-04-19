/**
 * Fields tab: approved venues sorted by distance — theme-aware (matches Home list canvas).
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getFieldsScreenStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    safe: { flex: 1 as const, backgroundColor: c.background },
    header: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 4,
    },
    title: {
      fontSize: 26,
      fontWeight: '800' as const,
      color: c.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: c.icon,
      marginBottom: 8,
    },
    approximateBanner: {
      marginHorizontal: 16,
      marginBottom: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
    },
    approximateText: {
      fontSize: 13,
      lineHeight: 18,
      color: c.icon,
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
    centerFill: {
      flex: 1 as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    activityIndicatorColor: c.tint,
  };
}
