/*
 * Create Game: react-hook-form screen; persists via createGame when signed in.
 */
import { CreateGameFormBody } from '@/components/CreateGameFormBody';
import { createGame } from '@/firebase';
import { useAuth } from '@/hooks/AuthContext';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { getCreateScreenStyles } from '@/styles/screens/Create.styles';
import type { CreateGameFormData, CreateGameScreenFormValues } from '@/types';
import { format, isValid } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
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
  date: null,
  time: null,
  playersMax: '',
  type: '',
  minigameType: '',
};

function parseRouteParam(param: string | string[] | undefined): string | undefined {
  if (param == null) {
    return undefined;
  }
  const raw = Array.isArray(param) ? param[0] : param;
  if (raw === '') {
    return undefined;
  }
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

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
  const params = useLocalSearchParams<{
    fieldName?: string;
    address?: string;
    lat?: string;
    lng?: string;
  }>();
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateScreenStyles(colorScheme), [colorScheme]);

  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

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

  useEffect(() => {
    const fieldName = parseRouteParam(params.fieldName);
    const address = parseRouteParam(params.address);
    const latStr = parseRouteParam(params.lat);
    const lngStr = parseRouteParam(params.lng);
    if (!fieldName || !address || !latStr || !lngStr) {
      return;
    }
    const lat = Number.parseFloat(latStr);
    const lng = Number.parseFloat(lngStr);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return;
    }
    setValue('fieldName', fieldName);
    setValue('address', address);
    setSelectedLocation({ lat, lng });
  }, [params.fieldName, params.address, params.lat, params.lng, setValue]);

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

    if (!selectedLocation) {
      setSubmitError('Choose an approved field from the Fields tab.');
      return;
    }

    if (
      data.date == null ||
      data.time == null ||
      !isValid(data.date) ||
      !isValid(data.time)
    ) {
      setSubmitError('Please choose a valid date and time.');
      return;
    }

    const payload: CreateGameFormData = {
      title: data.title.trim(),
      surface: data.surface,
      fieldName: data.fieldName.trim(),
      address: data.address.trim(),
      date: format(data.date, 'yyyy-MM-dd'),
      time: format(data.time, 'h:mm a'),
      playersMax,
      type: data.type,
      minigameType: data.type === 'minigame' ? data.minigameType : null,
      location: { lat: selectedLocation.lat, lng: selectedLocation.lng },
    };

    try {
      await createGame(payload, user.uid);
      reset(defaultValues);
      setSelectedLocation(null);
      router.replace('/(tabs)');
    } catch (e) {
      setSubmitError(getCreateGameErrorMessage(e));
    }
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <CreateGameFormBody control={control} gameType={gameType} />

          <Pressable
            style={[styles.submitButton, formState.isSubmitting && styles.submitButtonBusy]}
            onPress={onSubmit}
            disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitLabel}>Post Game</Text>
            )}
          </Pressable>

          {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
