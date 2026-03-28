/*
 * Firestore client for FutFinds. Screens should use helpers that call this, not import Firestore directly.
 */
import { type Firestore, getFirestore } from 'firebase/firestore';

import { getFirebaseApp } from './app';

let cachedDb: Firestore | null = null;

/** Returns the shared Firestore instance (creates it on first use). */
export function getFirestoreDb(): Firestore {
  if (!cachedDb) {
    try {
      cachedDb = getFirestore(getFirebaseApp());
    } catch (error) {
      console.error('[FutFinds] Firestore initialization failed:', error);
      throw error;
    }
  }
  return cachedDb;
}
