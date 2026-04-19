/**
 * Read-only venue block on Create Game (field name + address from Fields tab).
 */
import { Colors } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getCreateGameVenueReadOnlySectionStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    fieldLabel: {
      fontWeight: '600' as const,
      marginBottom: 6,
      color: c.tint,
    },
    labelSpaced: {
      fontWeight: '600' as const,
      marginTop: 14,
      marginBottom: 6,
      color: c.tint,
    },
    valueBox: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.surface,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
    valueText: {
      fontSize: 16,
      color: c.text,
      fontWeight: '600' as const,
    },
    valueMuted: {
      fontSize: 15,
      lineHeight: 22,
      color: c.icon,
    },
    placeholder: {
      fontSize: 15,
      color: c.icon,
      fontStyle: 'italic' as const,
    },
    hint: {
      marginTop: 10,
      fontSize: 13,
      lineHeight: 18,
      color: c.icon,
    },
    linkPressable: {
      marginTop: 8,
      alignSelf: 'flex-start' as const,
      paddingVertical: 4,
    },
    linkText: {
      fontSize: 14,
      fontWeight: '700' as const,
      color: c.tint,
      textDecorationLine: 'underline' as const,
    },
    errorText: {
      marginTop: 8,
      fontSize: 13,
      color: colorScheme === 'dark' ? '#fca5a5' : '#b91c1c',
    },
  };
}
