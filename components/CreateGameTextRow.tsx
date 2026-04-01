/*
 * Single labeled text field row for Create Game (react-hook-form Controller wrapper).
 */
import { getCreateGameTextRowStyles } from '@/styles/components/CreateGameTextRow.styles';
import type { CreateGameScreenFormValues } from '@/types';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import React, { useMemo } from 'react';
import { Control, Controller, FieldPath, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

/** Text inputs only — date/time use pickers and store `Date | null`. */
type CreateGameTextFieldPath = Exclude<FieldPath<CreateGameScreenFormValues>, 'date' | 'time'>;

interface CreateGameTextRowProps {
  control: Control<CreateGameScreenFormValues>;
  name: CreateGameTextFieldPath;
  label: string;
  hint?: string;
  placeholder: string;
  rules?: RegisterOptions<CreateGameScreenFormValues, CreateGameTextFieldPath>;
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
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateGameTextRowStyles(colorScheme), [colorScheme]);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={styles.placeholderTextColor}
              {...textInputProps}
            />
            {error ? <Text style={styles.fieldError}>{error.message}</Text> : null}
          </>
        )}
      />
    </View>
  );
}
