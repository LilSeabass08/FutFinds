/*
 * Maps @react-native-community/datetimepicker onChange into Create Game form dates (15-min time steps).
 */
import { defaultScheduleTimeSeed, snapScheduleTimeToQuarterHour } from '@/utils/scheduleTime';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Platform } from 'react-native';

export function useCreateGameDateTimePickerNativeChange(
  mode: 'date' | 'time',
  setShowPicker: Dispatch<SetStateAction<boolean>>
) {
  return useCallback(
    (
      onFormChange: (d: Date) => void,
      current: Date | null,
      event: DateTimePickerEvent,
      selected?: Date
    ) => {
      if (Platform.OS === 'android') {
        setShowPicker(false);
      }
      if (event.type === 'dismissed') {
        return;
      }
      let effective = selected;
      if (
        (!effective || Number.isNaN(effective.getTime())) &&
        typeof event.nativeEvent?.timestamp === 'number'
      ) {
        effective = new Date(event.nativeEvent.timestamp);
      }
      if (!effective || Number.isNaN(effective.getTime())) {
        return;
      }
      const snapped = mode === 'time' ? snapScheduleTimeToQuarterHour(effective) : effective;
      if (mode === 'time' && current) {
        const next = new Date(current);
        next.setHours(snapped.getHours(), snapped.getMinutes(), 0, 0);
        onFormChange(next);
        return;
      }
      if (mode === 'time') {
        const next = snapScheduleTimeToQuarterHour(defaultScheduleTimeSeed());
        next.setHours(snapped.getHours(), snapped.getMinutes(), 0, 0);
        onFormChange(next);
        return;
      }
      onFormChange(effective);
    },
    [mode, setShowPicker]
  );
}
