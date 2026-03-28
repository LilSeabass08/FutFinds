/*
 * Email/password sign-in helpers. Screens call these instead of Firebase Auth APIs directly.
 */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { getFirebaseAuth } from './auth';

export async function signInWithEmailPassword(email: string, password: string): Promise<void> {
  try {
    await signInWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
  } catch (error) {
    console.error('[FutFinds] signInWithEmailPassword failed:', error);
    throw error;
  }
}

export async function createUserWithEmailPassword(email: string, password: string): Promise<void> {
  try {
    await createUserWithEmailAndPassword(getFirebaseAuth(), email.trim(), password);
  } catch (error) {
    console.error('[FutFinds] createUserWithEmailPassword failed:', error);
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(getFirebaseAuth());
  } catch (error) {
    console.error('[FutFinds] signOutUser failed:', error);
    throw error;
  }
}
