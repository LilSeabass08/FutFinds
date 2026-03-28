/*
 * Create Game: react-hook-form screen; persists via createGame when signed in.
 */
import { CreateGameFormBody } from '@/components/CreateGameFormBody';
import { createGame } from '@/firebase';
import { useAuth } from '@/hooks/AuthContext';
import type { CreateGameFormData, CreateGameScreenFormValues } from '@/types';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const defaultValues: CreateGameScreenFormValues = {
  title: '',
  surface: '',
  fieldName: '',
  address: '',
  date: '',
  time: '',
  playersMax: '',
  type: '',
  minigameType: '',
};

function getCreateGameErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = String((error as { code?: string }).code);
    if (code.includes('permission-denied')) {
      return 'You do not have permission to post a game.';
    }
  }
  return 'Could not post the game. Please try again.';
}

export default function CreateScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, reset, watch, setValue, formState } = useForm<CreateGameScreenFormValues>({
    defaultValues,
    mode: 'onSubmit',
  });

  const gameType = watch('type');

  useEffect(() => {
    if (gameType === 'scrimmage') {
      setValue('minigameType', '');
    }
  }, [gameType, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    if (!user?.uid) {
      setSubmitError('You must be signed in to post a game.');
      return;
    }

    const playersMax = Number.parseInt(data.playersMax, 10);
    if (!Number.isFinite(playersMax)) {
      setSubmitError('Max players must be a valid number.');
      return;
    }

    if (data.surface === '' || data.type === '') {
      return;
    }

    const payload: CreateGameFormData = {
      title: data.title.trim(),
      surface: data.surface,
      fieldName: data.fieldName.trim(),
      address: data.address.trim(),
      date: data.date.trim(),
      time: data.time.trim(),
      playersMax,
      type: data.type,
      minigameType: data.type === 'minigame' ? data.minigameType : null,
      // TODO Phase 3: geocode address and set real coordinates
      location: { lat: 0, lng: 0 },
    };

    try {
      await createGame(payload, user.uid);
      reset(defaultValues);
      router.replace('/(tabs)');
    } catch (e) {
      setSubmitError(getCreateGameErrorMessage(e));
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled">
          <CreateGameFormBody control={control} gameType={gameType} />

          <Pressable
            style={{
              marginTop: 8,
              backgroundColor: '#16a34a',
              paddingVertical: 14,
              borderRadius: 10,
              alignItems: 'center',
              opacity: formState.isSubmitting ? 0.85 : 1,
            }}
            onPress={onSubmit}
            disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Post Game</Text>
            )}
          </Pressable>

          {submitError ? (
            <Text style={{ color: '#b91c1c', marginTop: 12, textAlign: 'center' }}>{submitError}</Text>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
