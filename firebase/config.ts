/*
 * Builds Firebase web config from EXPO_PUBLIC_* environment variables.
 * Throws at runtime if any required key is missing (so misconfiguration fails fast).
 */
import type { FirebaseConfig } from '@/types';

function readRequiredEnv(name: keyof NodeJS.ProcessEnv): string {
  const raw = process.env[name];
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) {
    throw new Error(
      `[FutFinds] Missing or empty ${String(name)}. Copy .env.example to .env and add your Firebase web app values.`,
    );
  }
  return value;
}

/** Returns validated Firebase config for initializeApp. */
export function getFirebaseConfig(): FirebaseConfig {
  return {
    apiKey: readRequiredEnv('EXPO_PUBLIC_FIREBASE_API_KEY'),
    authDomain: readRequiredEnv('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    projectId: readRequiredEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket: readRequiredEnv('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: readRequiredEnv('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId: readRequiredEnv('EXPO_PUBLIC_FIREBASE_APP_ID'),
  };
}
