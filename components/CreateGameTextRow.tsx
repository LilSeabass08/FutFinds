/*
 * Single labeled text field row for Create Game (react-hook-form Controller wrapper).
 */
import type { CreateGameScreenFormValues } from '@/types';
import React from 'react';
import { Control, Controller, FieldPath, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

const inputStyle = {
  borderWidth: 1,
  borderColor: '#d1d5db',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 10,
  fontSize: 16,
  color: '#111827',
  backgroundColor: '#fff',
} as const;

const labelStyle = { fontWeight: '600' as const, marginBottom: 6, color: '#374151' };
const hintStyle = { fontSize: 12, color: '#6b7280', marginBottom: 6 };
const fieldErrorStyle = { color: '#b91c1c', fontSize: 13, marginTop: 4 };

interface CreateGameTextRowProps {
  control: Control<CreateGameScreenFormValues>;
  name: FieldPath<CreateGameScreenFormValues>;
  label: string;
  hint?: string;
  placeholder: string;
  rules?: RegisterOptions<CreateGameScreenFormValues, FieldPath<CreateGameScreenFormValues>>;
  textInputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur' | 'style'>;
}

export function CreateGameTextRow({
  control,
  name,
  label,
  hint,
  placeholder,
  rules,
  textInputProps,
}: CreateGameTextRowProps) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={labelStyle}>{label}</Text>
      {hint ? <Text style={hintStyle}>{hint}</Text> : null}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              {...textInputProps}
            />
            {error ? <Text style={fieldErrorStyle}>{error.message}</Text> : null}
          </>
        )}
      />
    </View>
  );
}
