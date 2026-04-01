/*
 * Create Game schedule inputs: dedicated Date and Time picker fields wired to react-hook-form.
 */
import { CreateGameDateTimePickerRow } from '@/components/CreateGameDateTimePickerRow';
import type { CreateGameScreenFormValues } from '@/types';
import { isValid } from 'date-fns';
import React from 'react';
import { Control } from 'react-hook-form';

interface CreateGameDatePickerFieldProps {
  control: Control<CreateGameScreenFormValues>;
}

export function CreateGameDatePickerField({ control }: CreateGameDatePickerFieldProps) {
  return (
    <CreateGameDateTimePickerRow
      control={control}
      name="date"
      label="Date"
      mode="date"
      icon="📅"
      displayPattern="MMM dd yyyy"
      placeholder="Select date"
      webParsePattern="yyyy-MM-dd"
      webHint="Format: YYYY-MM-DD"
      rules={{
        validate: (v) => (v != null && isValid(v) ? true : 'Date is required'),
      }}
    />
  );
}

interface CreateGameTimePickerFieldProps {
  control: Control<CreateGameScreenFormValues>;
}

export function CreateGameTimePickerField({ control }: CreateGameTimePickerFieldProps) {
  return (
    <CreateGameDateTimePickerRow
      control={control}
      name="time"
      label="Time"
      mode="time"
      icon="🕐"
      displayPattern="h:mm a"
      placeholder="Select time"
      webParsePattern="h:mm a"
      webHint="e.g. 6:00 PM"
      rules={{
        validate: (v) => (v != null && isValid(v) ? true : 'Time is required'),
      }}
    />
  );
}
