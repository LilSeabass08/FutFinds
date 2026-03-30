/*
 * All TypeScript interfaces live here (auth, Firebase config, games, users, Phase 2 forms).
 */
import type { Timestamp } from "firebase/firestore";

/** Firebase web app config (from Firebase Console). */
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/** Values for email/password login and signup forms. */
export interface EmailPasswordFormValues {
  email: string;
  password: string;
}

/** Light/dark appearance for theme-aware style helpers. */
export type ColorSchemeName = "light" | "dark";

/** Theme mode override: user-selected or system default. */
export type ThemeMode = "system" | "light" | "dark";

/** Firestore `games/{gameId}` document shape (id is the document id, not stored in the doc). */
export interface Game {
  id: string;
  title: string;
  type: "scrimmage" | "minigame";
  minigameType: string | null;
  surface: "outdoor" | "indoor" | "futsal";
  fieldName: string;
  address: string;
  location: { lat: number; lng: number };
  date: string;
  time: string;
  playersMax: number;
  playersJoined: string[];
  createdBy: string;
  createdAt: Timestamp;
}

/** Firestore `users/{uid}` document shape. */
export interface AppUser {
  uid: string;
  displayName: string;
  avatar: string | null;
  location: string;
  gamesCreated: number;
  gamesJoined: number;
}

/** Payload collected on Create Game before persisting (server assigns id, createdBy, createdAt, playersJoined). */
export type CreateGameFormData = Omit<
  Game,
  "id" | "createdBy" | "createdAt" | "playersJoined"
>;

/** Create Game tab form state (location is set on submit until Phase 3 geocoding). */
export interface CreateGameScreenFormValues {
  title: string;
  surface: "" | Game["surface"];
  fieldName: string;
  address: string;
  date: string;
  time: string;
  playersMax: string;
  type: "" | Game["type"];
  minigameType: string;
}

/** Filter for game list / map views by surface. */
export interface SurfaceFilter {
  type: "all" | "outdoor" | "indoor" | "futsal";
}

export const MINIGAME_OPTIONS: string[] = [
  "World Cup",
  "Wembley",
  "3hit kill",
  "Rondos",
  "Shootout",
];
