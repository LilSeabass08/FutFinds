/*
 * Firebase Auth for Expo: native uses AsyncStorage persistence; web uses default browser persistence.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type Auth, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { Platform } from 'react-native';

import { getFirebaseApp } from './app';

let cachedAuth: Auth | null = null;

function createAuth(): Auth {
  const app = getFirebaseApp();

  if (Platform.OS === 'web') {
    return getAuth(app);
  }

  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error: unknown) {
    const code =
      error && typeof error === 'object' && 'code' in error
        ? String((error as { code?: string }).code)
        : '';
    if (code === 'auth/already-initialized') {
      return getAuth(app);
    }
    console.error('[FutFinds] Firebase Auth initialization failed:', error);
    throw error;
  }
}

/** Returns the shared Auth instance (creates it on first use). */
export function getFirebaseAuth(): Auth {
  if (!cachedAuth) {
    cachedAuth = createAuth();
  }
  return cachedAuth;
}
