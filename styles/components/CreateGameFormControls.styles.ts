/**
 * Pills and cards for Create Game form controls (surface, type, minigame).
 * Focus: stronger outlines + accent-colored titles on the tab canvas.
 */
import { Colors, palette } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getCreateGameFormControlsStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  // A little accent fill so selected pills/cards "lift" off the green canvas.
  const selectedFill =
    colorScheme === 'dark' ? 'rgba(74, 222, 128, 0.16)' : 'rgba(21, 128, 61, 0.14)';
  // A subtle accent fill for unselected items, so their outline reads.
  const unselectedFill = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(21, 128, 61, 0.06)';

  return {
    block: {
      marginBottom: 12,
    },
    rowWrap: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: 8,
    },
    row: {
      flexDirection: 'row' as const,
      gap: 10,
    },
    surfacePill: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 999,
      borderWidth: 2,
    },
    typeCard: {
      flex: 1,
      minHeight: 88,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      borderRadius: 12,
      borderWidth: 2,
      padding: 12,
    },
    minigamePill: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 999,
      borderWidth: 2,
    },

    // Shared selected/unselected styling used by pills + cards.
    selectedStyle: {
      borderColor: c.tint,
      backgroundColor: selectedFill,
    },
    unselectedStyle: {
      borderColor: c.border,
      backgroundColor: unselectedFill,
    },

    surfacePillLabel: {
      fontWeight: '600' as const,
      color: c.tint,
    },
    typeCardLabel: {
      fontSize: 17,
      fontWeight: '700' as const,
      color: c.tint,
    },
    minigamePillLabel: {
      fontWeight: '600' as const,
      color: c.tint,
    },

    minigameScroll: {
      gap: 8,
    },
    fieldError: {
      color: colorScheme === 'dark' ? '#fca5a5' : palette.red700,
      marginTop: 6,
      fontSize: 13,
    },
  };
}
