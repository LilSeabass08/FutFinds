/*
 * This file defines the root navigation stack for the FutFinds app.
 * It sets the app theme, registers top-level routes, and redirects by auth state.
 */
import { ThemeProvider } from '@react-navigation/native';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationTheme } from '@/styles/theme';
import { AuthProvider, useAuth } from '@/hooks/AuthContext';
import { ThemeModeProvider, useThemeMode } from '@/hooks/ThemeModeContext';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const { user, initializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!initializing) {
      SplashScreen.hideAsync();
    }
  }, [initializing]);

  useEffect(() => {
    if (!navigationState?.key || initializing) {
      return;
    }

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, initializing, segments, navigationState?.key, router]);

  if (!navigationState?.key || initializing) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="game/[id]" options={{ headerShown: true, title: 'Game' }} />
    </Stack>
  );
}

function RootLayoutTheme() {
  const { colorScheme } = useThemeMode();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? NavigationTheme.dark : NavigationTheme.light}>
      <RootLayoutNav />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <RootLayoutTheme />
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeModeProvider>
  );
}
