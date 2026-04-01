/**
 * Touchable date/time picker row on Create Game — matches CreateGameTextRow input chrome (theme-aware).
 */
import { Colors, palette } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getCreateGameDateTimePickerRowStyles(colorScheme: ColorSchemeName) {
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
    webHint: {
      fontSize: 12,
      color: c.tabIconDefault,
      marginBottom: 6,
    },
    inputTouchable: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? c.border : '#d1d5db',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: palette.white,
    },
    valueText: {
      flex: 1,
      fontSize: 16,
      color: palette.gray900,
    },
    placeholderText: {
      flex: 1,
      fontSize: 16,
      color: c.tabIconDefault,
    },
    icon: {
      fontSize: 18,
      marginLeft: 8,
    },
    pickerWrap: {
      marginTop: 8,
      overflow: 'hidden' as const,
    },
    fieldError: {
      color: colorScheme === 'dark' ? '#fca5a5' : palette.red700,
      fontSize: 13,
      marginTop: 4,
    },
    webInput: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? c.border : '#d1d5db',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: palette.gray900,
      backgroundColor: palette.white,
    },
    placeholderTextColor: c.tabIconDefault,
  };
}
