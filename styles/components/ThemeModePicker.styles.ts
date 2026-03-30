/**
 * Styles for the Account tab theme mode picker dropdown.
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getThemeModePickerStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    container: {
      marginTop: 16,
      marginBottom: 8,
    },
    row: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.border,
      // Match the Account "stats" card surface background.
      backgroundColor: c.surface,
    },
    label: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: c.icon,
    },
    valuePressable: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 8,
    },
    valueText: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: c.tint,
    },
    chevron: {
      color: c.icon,
      fontSize: 18,
      fontWeight: '600' as const,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      justifyContent: 'center' as const,
      paddingHorizontal: 18,
    },
    modalCard: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.surface,
      padding: 16,
    },
    modalCardPosition: {
      marginTop: 120,
      marginBottom: 32,
      alignSelf: 'stretch' as const,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: '700' as const,
      color: c.text,
      marginBottom: 12,
    },
    optionRow: {
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 12,
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      marginBottom: 6,
    },
    optionRowSelected: {
      backgroundColor: c.surfaceMuted,
    },
    optionText: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: c.text,
    },
    check: {
      fontSize: 16,
      fontWeight: '700' as const,
      color: c.tint,
    },
    checkEmpty: {
      fontSize: 16,
      fontWeight: '700' as const,
      color: c.tabIconDefault,
    },
  };
}

