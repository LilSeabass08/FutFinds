/*
 * Login screen: email/password sign-in via Firebase helpers.
 */
import { signInWithEmailPassword } from '@/firebase';
import { useAuthFormAppearance } from '@/hooks/useAuthFormAppearance';
import type { EmailPasswordFormValues } from '@/types';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getAuthErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = String((error as { code?: string }).code);
    switch (code) {
      case 'auth/invalid-email':
        return 'That email address looks invalid.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email or password is incorrect.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later.';
      default:
        return 'Could not sign in. Please try again.';
    }
  }
  return 'Something went wrong. Please try again.';
}

export default function LoginScreen() {
  const appearance = useAuthFormAppearance();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EmailPasswordFormValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    try {
      await signInWithEmailPassword(data.email, data.password);
    } catch (e) {
      setSubmitError(getAuthErrorMessage(e));
    }
  });

  return (
    <SafeAreaView style={appearance.screen} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={appearance.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={appearance.scrollContent}
          keyboardShouldPersistTaps="handled">
          <Text style={appearance.title}>Welcome back</Text>
          <Text style={appearance.subtitle}>Sign in to find and host games.</Text>

          {submitError ? <Text style={appearance.errorBanner}>{submitError}</Text> : null}

          <Text style={appearance.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={appearance.input}
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="you@example.com"
                  placeholderTextColor={appearance.placeholderColor}
                />
                {error ? <Text style={appearance.fieldError}>{error.message}</Text> : null}
              </>
            )}
          />

          <Text style={appearance.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={appearance.input}
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="••••••••"
                  placeholderTextColor={appearance.placeholderColor}
                />
                {error ? <Text style={appearance.fieldError}>{error.message}</Text> : null}
              </>
            )}
          />

          <Pressable
            style={[appearance.button, isSubmitting && appearance.buttonDisabled]}
            onPress={onSubmit}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color={appearance.activityIndicatorColor} />
            ) : (
              <Text style={appearance.buttonText}>Sign in</Text>
            )}
          </Pressable>

          <Link href="/auth/signup" asChild>
            <Pressable style={appearance.linkWrap}>
              <Text style={appearance.link}>Need an account? Sign up</Text>
            </Pressable>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
