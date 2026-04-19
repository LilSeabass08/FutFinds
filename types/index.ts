/*
 * All TypeScript interfaces live here (auth, Firebase config, games, users, forms, approved fields).
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

/**
 * Create Game tab form state. `fieldName` and `address` are read-only on screen and filled from the
 * Fields tab via route params; GPS coordinates are held in screen state until submit.
 */
export interface CreateGameScreenFormValues {
  title: string;
  surface: "" | Game["surface"];
  fieldName: string;
  address: string;
  date: Date | null;
  time: Date | null;
  playersMax: string;
  type: "" | Game["type"];
  minigameType: string;
}

/** Filter for game list / map views by surface. */
export interface SurfaceFilter {
  type: "all" | "outdoor" | "indoor" | "futsal";
}

/** Approved public field from the curated seed list (Phase 3 Fields tab). */
export interface SoccerField {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

/** User or fallback map point for distance sorting (Phase 3). */
export interface UserLocationCoords {
  lat: number;
  lng: number;
}

/** Foreground location permission outcome after the initial request. */
export type UserLocationPermissionStatus =
  | "pending"
  | "granted"
  | "denied"
  | "unavailable";

/** Shared app location used to sort approved fields by distance. */
export interface UserLocationContextValue {
  coords: UserLocationCoords;
  permission: UserLocationPermissionStatus;
  /** True when `coords` are a fixed fallback (denied GPS or position error). */
  isApproximate: boolean;
  ready: boolean;
  refresh: () => Promise<void>;
}

export const MINIGAME_OPTIONS: string[] = [
  "World Cup",
  "Wembley",
  "3hit kill",
  "Rondos",
  "Shootout",
];
