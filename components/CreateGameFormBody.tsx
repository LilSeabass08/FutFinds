/*
 * Create Game form fields (Controllers); submit button stays on the screen.
 */
import {
  CreateGameMinigamePills,
  CreateGameSurfacePills,
  CreateGameTypeCards,
} from '@/components/CreateGameFormControls';
import {
  CreateGameDatePickerField,
  CreateGameTimePickerField,
} from '@/components/CreateGameDateAndTimePickers';
import { CreateGameTextRow } from '@/components/CreateGameTextRow';
import { getCreateGameFormBodyStyles } from '@/styles/components/CreateGameFormBody.styles';
import type { CreateGameScreenFormValues } from '@/types';
import { MINIGAME_OPTIONS } from '@/types';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import React, { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Text } from 'react-native';

interface CreateGameFormBodyProps {
  control: Control<CreateGameScreenFormValues>;
  gameType: CreateGameScreenFormValues['type'];
}

export function CreateGameFormBody({ control, gameType }: CreateGameFormBodyProps) {
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateGameFormBodyStyles(colorScheme), [colorScheme]);

  return (
    <>
      <Text style={styles.screenTitle}>Create game</Text>

      <CreateGameTextRow
        control={control}
        name="title"
        label="Game title"
        placeholder="Evening pickup"
        rules={{ required: 'Title is required' }}
      />

      <Text style={styles.fieldLabel}>Surface type</Text>
      <Controller
        control={control}
        name="surface"
        rules={{
          validate: (v) => (v ? true : 'Select a surface'),
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CreateGameSurfacePills value={value} onChange={onChange} error={error?.message} />
        )}
      />

      <CreateGameTextRow
        control={control}
        name="fieldName"
        label="Field name"
        placeholder="Riverside Park — Field 2"
        rules={{ required: 'Field name is required' }}
      />

      <CreateGameTextRow
        control={control}
        name="address"
        label="Address"
        placeholder="123 Main St, City"
        rules={{ required: 'Address is required' }}
      />

      <CreateGameDatePickerField control={control} />

      <CreateGameTimePickerField control={control} />

      <CreateGameTextRow
        control={control}
        name="playersMax"
        label="Max players"
        placeholder="10"
        rules={{
          required: 'Max players is required',
          validate: (v) => {
            const n = Number.parseInt(v, 10);
            if (!Number.isInteger(n)) {
              return 'Enter a whole number';
            }
            if (n < 2 || n > 22) {
              return 'Must be between 2 and 22';
            }
            return true;
          },
        }}
        textInputProps={{ keyboardType: 'number-pad' }}
      />

      <Text style={styles.fieldLabel}>Game type</Text>
      <Controller
        control={control}
        name="type"
        rules={{
          validate: (v) => (v ? true : 'Select a game type'),
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CreateGameTypeCards value={value} onChange={onChange} error={error?.message} />
        )}
      />

      {gameType === 'minigame' ? (
        <>
          <Text style={styles.fieldLabel}>Minigame type</Text>
          <Controller
            control={control}
            name="minigameType"
            rules={{
              validate: (value, form) => {
                if (form.type !== 'minigame') {
                  return true;
                }
                if (!value || !MINIGAME_OPTIONS.includes(value)) {
                  return 'Select a minigame type';
                }
                return true;
              },
            }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CreateGameMinigamePills value={value} onChange={onChange} error={error?.message} />
            )}
          />
        </>
      ) : null}
    </>
  );
}
