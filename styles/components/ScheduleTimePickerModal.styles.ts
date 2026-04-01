/**
 * Centered sheet + dim backdrop for schedule time (iOS wheel / web quarter-hour list).
 */
import { Colors, palette } from '@/styles/theme';
import type { ColorSchemeName } from '@/types';

export function getScheduleTimePickerModalStyles(colorScheme: ColorSchemeName) {
  const c = Colors[colorScheme];

  return {
    scheduleModalRoot: {
      flex: 1,
      justifyContent: 'center' as const,
      paddingHorizontal: 24,
    },
    scheduleModalBackdrop: {
      position: 'absolute' as const,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.48)',
    },
    scheduleModalCard: {
      borderRadius: 12,
      backgroundColor: colorScheme === 'dark' ? c.surface : palette.white,
      overflow: 'hidden' as const,
      alignSelf: 'center' as const,
      width: '100%' as const,
      maxWidth: 340,
    },
    scheduleModalPickerPad: {
      paddingVertical: 4,
      alignItems: 'center' as const,
    },
    scheduleModalDone: {
      paddingVertical: 14,
      alignItems: 'center' as const,
      borderTopWidth: 1,
      borderTopColor: colorScheme === 'dark' ? c.border : '#e5e7eb',
      backgroundColor: colorScheme === 'dark' ? c.surface : palette.white,
    },
    scheduleModalDoneText: {
      fontSize: 17,
      fontWeight: '600' as const,
      color: colorScheme === 'dark' ? c.tint : palette.green600,
    },
    webTimeSlotList: {
      maxHeight: 280,
    },
    webTimeSlot: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === 'dark' ? c.border : '#f1f5f9',
    },
    webTimeSlotLabel: {
      fontSize: 16,
      color: colorScheme === 'dark' ? c.text : palette.gray900,
    },
    webTimeSlotLabelSelected: {
      fontWeight: '700' as const,
      color: colorScheme === 'dark' ? c.tint : palette.green600,
    },
  };
}
