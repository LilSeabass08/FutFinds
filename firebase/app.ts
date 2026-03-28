/*
 * Initializes the Firebase app singleton used by Auth and Firestore.
 */
import { type FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';

import { getFirebaseConfig } from './config';

let cachedApp: FirebaseApp | null = null;

/** Returns the shared FirebaseApp instance (creates it on first use). */
export function getFirebaseApp(): FirebaseApp {
  if (cachedApp) {
    return cachedApp;
  }

  try {
    const config = getFirebaseConfig();
    cachedApp = getApps().length === 0 ? initializeApp(config) : getApp();
    return cachedApp;
  } catch (error) {
    console.error('[FutFinds] Firebase app initialization failed:', error);
    throw error;
  }
}
