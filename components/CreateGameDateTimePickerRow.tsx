/*
 * Reusable date or time picker row for Create Game (native iOS/Android; web date text + time sheet).
 */
import { getCreateGameDateTimePickerRowStyles } from '@/styles/components/CreateGameDateTimePickerRow.styles';
import { getScheduleTimePickerModalStyles } from '@/styles/components/ScheduleTimePickerModal.styles';
import type { CreateGameScreenFormValues } from '@/types';
import { useCreateGameDateTimePickerNativeChange } from '@/hooks/useCreateGameDateTimePickerNativeChange';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { ScheduleTimePickerModal } from '@/components/ScheduleTimePickerModal';
import {
  defaultScheduleTimeSeed,
  quarterHourSlotsForDay,
  SCHEDULE_TIME_QUARTER_STEP,
  snapScheduleTimeToQuarterHour,
} from '@/utils/scheduleTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isValid, parse } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export interface CreateGameDateTimePickerRowProps {
  control: Control<CreateGameScreenFormValues>;
  name: 'date' | 'time';
  label: string;
  mode: 'date' | 'time';
  icon: string;
  displayPattern: string;
  placeholder: string;
  webParsePattern: string;
  webHint: string;
  rules?: RegisterOptions<CreateGameScreenFormValues, 'date' | 'time'>;
}

function timesMatchCalendar(a: Date | null, b: Date): boolean {
  if (!a || !isValid(a)) {
    return false;
  }
  return a.getHours() === b.getHours() && a.getMinutes() === b.getMinutes();
}

export function CreateGameDateTimePickerRow({
  control,
  name,
  label,
  mode,
  icon,
  displayPattern,
  placeholder,
  webParsePattern,
  webHint,
  rules,
}: CreateGameDateTimePickerRowProps) {
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateGameDateTimePickerRowStyles(colorScheme), [colorScheme]);
  const scheduleSheetStyles = useMemo(
    () => getScheduleTimePickerModalStyles(colorScheme),
    [colorScheme]
  );
  const [showPicker, setShowPicker] = useState(false);
  const onNativeChange = useCreateGameDateTimePickerNativeChange(mode, setShowPicker);
  const webTimeSlots = useMemo(() => quarterHourSlotsForDay(new Date()), []);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const pickerValue =
            mode === 'time'
              ? snapScheduleTimeToQuarterHour(value ?? defaultScheduleTimeSeed())
              : value ?? new Date();

          if (Platform.OS === 'web') {
            if (mode === 'time') {
              return (
                <>
                  <Pressable
                    style={styles.inputTouchable}
                    onPress={() => setShowPicker(true)}
                    accessibilityRole="button">
                    <Text style={value ? styles.valueText : styles.placeholderText}>
                      {value && isValid(value) ? format(value, displayPattern) : placeholder}
                    </Text>
                    <Text style={styles.icon}>{icon}</Text>
                  </Pressable>
                  <ScheduleTimePickerModal
                    visible={showPicker}
                    onClose={() => setShowPicker(false)}
                    styles={scheduleSheetStyles}>
                    <ScrollView
                      style={scheduleSheetStyles.webTimeSlotList}
                      keyboardShouldPersistTaps="handled">
                      {webTimeSlots.map((slot) => {
                        const selected = timesMatchCalendar(value, slot);
                        return (
                          <Pressable
                            key={slot.getTime()}
                            style={scheduleSheetStyles.webTimeSlot}
                            onPress={() => {
                              onChange(slot);
                              setShowPicker(false);
                            }}>
                            <Text
                              style={
                                selected
                                  ? scheduleSheetStyles.webTimeSlotLabelSelected
                                  : scheduleSheetStyles.webTimeSlotLabel
                              }>
                              {format(slot, displayPattern)}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </ScheduleTimePickerModal>
                  {error ? <Text style={styles.fieldError}>{error.message}</Text> : null}
                </>
              );
            }

            const raw =
              value && isValid(value)
                ? format(value, mode === 'date' ? 'yyyy-MM-dd' : webParsePattern)
                : '';
            return (
              <>
                <Text style={styles.webHint}>{webHint}</Text>
                <TextInput
                  style={styles.webInput}
                  value={raw}
                  placeholder={placeholder}
                  placeholderTextColor={styles.placeholderTextColor}
                  onChangeText={(text) => {
                    if (!text.trim()) {
                      onChange(null);
                      return;
                    }
                    const ref = new Date();
                    const parsed = parse(text.trim(), 'yyyy-MM-dd', ref);
                    if (isValid(parsed)) {
                      onChange(parsed);
                    }
                  }}
                />
                {error ? <Text style={styles.fieldError}>{error.message}</Text> : null}
              </>
            );
          }

          const useIosTimeSheet = mode === 'time' && Platform.OS === 'ios';

          if (useIosTimeSheet) {
            return (
              <>
                <Pressable
                  style={styles.inputTouchable}
                  onPress={() => setShowPicker(true)}
                  accessibilityRole="button">
                  <Text style={value ? styles.valueText : styles.placeholderText}>
                    {value && isValid(value) ? format(value, displayPattern) : placeholder}
                  </Text>
                  <Text style={styles.icon}>{icon}</Text>
                </Pressable>
                <ScheduleTimePickerModal
                  visible={showPicker}
                  onClose={() => setShowPicker(false)}
                  styles={scheduleSheetStyles}>
                  <View style={scheduleSheetStyles.scheduleModalPickerPad}>
                    <DateTimePicker
                      value={pickerValue}
                      mode="time"
                      display="spinner"
                      minuteInterval={SCHEDULE_TIME_QUARTER_STEP}
                      themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
                      onChange={(event, date) => onNativeChange(onChange, value, event, date)}
                    />
                  </View>
                </ScheduleTimePickerModal>
                {error ? <Text style={styles.fieldError}>{error.message}</Text> : null}
              </>
            );
          }

          const pickerDisplay =
            mode === 'date'
              ? Platform.OS === 'ios'
                ? 'inline'
                : 'default'
              : 'spinner';

          return (
            <>
              <Pressable
                style={styles.inputTouchable}
                onPress={() => setShowPicker((open) => !open)}
                accessibilityRole="button">
                <Text style={value ? styles.valueText : styles.placeholderText}>
                  {value && isValid(value) ? format(value, displayPattern) : placeholder}
                </Text>
                <Text style={styles.icon}>{icon}</Text>
              </Pressable>
              {showPicker ? (
                <View style={styles.pickerWrap}>
                  <DateTimePicker
                    value={pickerValue}
                    mode={mode}
                    display={pickerDisplay}
                    minuteInterval={mode === 'time' ? SCHEDULE_TIME_QUARTER_STEP : undefined}
                    themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
                    onChange={(event, date) => onNativeChange(onChange, value, event, date)}
                  />
                </View>
              ) : null}
              {error ? <Text style={styles.fieldError}>{error.message}</Text> : null}
            </>
          );
        }}
      />
    </View>
  );
}
