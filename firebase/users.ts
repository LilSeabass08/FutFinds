/*
 * Firestore helpers for the `users` collection: fetch profile by uid.
 */
import type { DocumentData } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

import type { AppUser } from '@/types';

import { getFirestoreDb } from './firestore';

function mapDocToAppUser(uid: string, data: DocumentData | undefined): AppUser | null {
  if (!data) {
    return null;
  }

  const displayName = typeof data.displayName === 'string' ? data.displayName : '';
  const location = typeof data.location === 'string' ? data.location : '';
  const gamesCreated = typeof data.gamesCreated === 'number' ? data.gamesCreated : 0;
  const gamesJoined = typeof data.gamesJoined === 'number' ? data.gamesJoined : 0;

  const rawAvatar = data.avatar;
  const avatar =
    rawAvatar === null ? null : typeof rawAvatar === 'string' ? rawAvatar : null;

  return {
    uid,
    displayName,
    avatar,
    location,
    gamesCreated,
    gamesJoined,
  };
}

export async function getUserById(userId: string): Promise<AppUser | null> {
  try {
    const db = getFirestoreDb();
    const snap = await getDoc(doc(db, 'users', userId));
    if (!snap.exists()) {
      return null;
    }
    return mapDocToAppUser(snap.id, snap.data());
  } catch (error) {
    console.error('[FutFinds] getUserById failed:', error);
    throw error;
  }
}
