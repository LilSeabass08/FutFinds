/*
 * Firestore helpers for the `games` collection: create, subscribe, fetch, join, leave.
 */
import type { DocumentData, Unsubscribe } from 'firebase/firestore';
import {
  Timestamp,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import type { CreateGameFormData, Game } from '@/types';

import { getFirestoreDb } from './firestore';

function mapDocToGame(id: string, data: DocumentData | undefined): Game | null {
  if (!data) {
    return null;
  }

  const title = data.title;
  const type = data.type;
  const surface = data.surface;
  if (typeof title !== 'string') {
    return null;
  }
  if (type !== 'scrimmage' && type !== 'minigame') {
    return null;
  }
  if (surface !== 'outdoor' && surface !== 'indoor' && surface !== 'futsal') {
    return null;
  }

  const loc = data.location;
  if (!loc || typeof loc !== 'object') {
    return null;
  }
  const lat = (loc as { lat?: unknown }).lat;
  const lng = (loc as { lng?: unknown }).lng;
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return null;
  }

  if (typeof data.fieldName !== 'string' || typeof data.address !== 'string') {
    return null;
  }
  if (typeof data.date !== 'string' || typeof data.time !== 'string') {
    return null;
  }
  if (typeof data.playersMax !== 'number') {
    return null;
  }
  if (typeof data.createdBy !== 'string') {
    return null;
  }
  if (!(data.createdAt instanceof Timestamp)) {
    return null;
  }

  const rawJoined = data.playersJoined;
  const playersJoined = Array.isArray(rawJoined)
    ? rawJoined.filter((u): u is string => typeof u === 'string')
    : [];

  const minigameType =
    data.minigameType == null
      ? null
      : typeof data.minigameType === 'string'
        ? data.minigameType
        : null;

  return {
    id,
    title,
    type,
    minigameType,
    surface,
    fieldName: data.fieldName,
    address: data.address,
    location: { lat, lng },
    date: data.date,
    time: data.time,
    playersMax: data.playersMax,
    playersJoined,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
  };
}

export async function createGame(data: CreateGameFormData, userId: string): Promise<string> {
  try {
    const db = getFirestoreDb();
    const docRef = await addDoc(collection(db, 'games'), {
      ...data,
      createdBy: userId,
      createdAt: serverTimestamp(),
      playersJoined: [],
    });
    return docRef.id;
  } catch (error) {
    console.error('[FutFinds] createGame failed:', error);
    throw error;
  }
}

export function getGamesListener(
  onGames: (games: Game[]) => void,
  onError?: (error: unknown) => void,
): Unsubscribe {
  try {
    const db = getFirestoreDb();
    const gamesQuery = query(collection(db, 'games'), orderBy('createdAt', 'desc'));

    return onSnapshot(
      gamesQuery,
      (snapshot) => {
        try {
          const games: Game[] = [];
          snapshot.forEach((docSnap) => {
            const game = mapDocToGame(docSnap.id, docSnap.data());
            if (game) {
              games.push(game);
            }
          });
          onGames(games);
        } catch (error) {
          console.error('[FutFinds] getGamesListener mapping failed:', error);
          if (onError) {
            onError(error);
          } else {
            onGames([]);
          }
        }
      },
      (error) => {
        console.error('[FutFinds] getGamesListener snapshot error:', error);
        if (onError) {
          onError(error);
        } else {
          onGames([]);
        }
      },
    );
  } catch (error) {
    console.error('[FutFinds] getGamesListener setup failed:', error);
    throw error;
  }
}

export async function getGameById(gameId: string): Promise<Game | null> {
  try {
    const db = getFirestoreDb();
    const snap = await getDoc(doc(db, 'games', gameId));
    if (!snap.exists()) {
      return null;
    }
    return mapDocToGame(snap.id, snap.data());
  } catch (error) {
    console.error('[FutFinds] getGameById failed:', error);
    throw error;
  }
}

export async function joinGame(gameId: string, userId: string): Promise<void> {
  try {
    const db = getFirestoreDb();
    await updateDoc(doc(db, 'games', gameId), {
      playersJoined: arrayUnion(userId),
    });
  } catch (error) {
    console.error('[FutFinds] joinGame failed:', error);
    throw error;
  }
}

export async function leaveGame(gameId: string, userId: string): Promise<void> {
  try {
    const db = getFirestoreDb();
    await updateDoc(doc(db, 'games', gameId), {
      playersJoined: arrayRemove(userId),
    });
  } catch (error) {
    console.error('[FutFinds] leaveGame failed:', error);
    throw error;
  }
}

export async function deleteGame(gameId: string): Promise<void> {
  try {
    const db = getFirestoreDb();
    await deleteDoc(doc(db, 'games', gameId));
  } catch (error) {
    console.error('[FutFinds] deleteGame failed:', error);
    throw error;
  }
}
