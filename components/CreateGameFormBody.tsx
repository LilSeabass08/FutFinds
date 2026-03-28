/*
 * Create Game form fields (Controllers); submit button stays on the screen.
 */
import {
  CreateGameMinigamePills,
  CreateGameSurfacePills,
  CreateGameTypeCards,
} from '@/components/CreateGameFormControls';
import { CreateGameTextRow } from '@/components/CreateGameTextRow';
import type { CreateGameScreenFormValues } from '@/types';
import { MINIGAME_OPTIONS } from '@/types';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Text } from 'react-native';

const labelStyle = { fontWeight: '600' as const, marginBottom: 6, color: '#374151' };

interface CreateGameFormBodyProps {
  control: Control<CreateGameScreenFormValues>;
  gameType: CreateGameScreenFormValues['type'];
}

export function CreateGameFormBody({ control, gameType }: CreateGameFormBodyProps) {
  return (
    <>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#111827' }}>
        Create game
      </Text>

      <CreateGameTextRow
        control={control}
        name="title"
        label="Game title"
        placeholder="Evening pickup"
        rules={{ required: 'Title is required' }}
      />

      <Text style={labelStyle}>Surface type</Text>
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

      <CreateGameTextRow
        control={control}
        name="date"
        label="Date"
        hint="Format: YYYY-MM-DD"
        placeholder="2026-03-28"
        rules={{ required: 'Date is required' }}
        textInputProps={{ autoCapitalize: 'none' }}
      />

      <CreateGameTextRow
        control={control}
        name="time"
        label="Time"
        hint="e.g. 6:00 PM"
        placeholder="6:00 PM"
        rules={{ required: 'Time is required' }}
      />

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

      <Text style={labelStyle}>Game type</Text>
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
          <Text style={labelStyle}>Minigame type</Text>
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
