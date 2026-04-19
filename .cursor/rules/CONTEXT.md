# FutFinds — Project Context

## Current Phase

Phase 3 — Nearby Fields Tab (Curated List) — **complete**

## What's Been Built

- [x] Expo project scaffolded with Expo Router
- [x] Firebase Auth (Email + Password)
- [x] Firestore with security rules
- [x] Bottom tab navigation (List, Fields, Create, Account)
- [x] Auth guard with login/signup screens
- [x] types/index.ts — Game, AppUser, CreateGameFormData, SurfaceFilter, MINIGAME_OPTIONS, SoccerField, user location types
- [x] firebase/games.ts — createGame, getGamesListener, getGameById, joinGame, leaveGame
- [x] firebase/users.ts — createUserDocument, getUserById
- [x] firebase/auth.ts — signUp, signIn, signOut, onAuthChange
- [x] hooks/useAuth.ts, useGames.ts, useUser.ts, UserLocationContext (expo-location + fallback)
- [x] components/GameCard.tsx, FieldListCard.tsx, CreateGameVenueReadOnlySection.tsx
- [x] constants/fields.ts — APPROVED_FIELDS, APPROVED_FIELDS_REGION_CENTER
- [x] utils/distance.ts — Haversine miles + sort by distance
- [x] List View — filters, pull to refresh, real time updates
- [x] Fields tab — FlatList of approved venues sorted by distance (no map SDK on this screen)
- [x] Create Game — venue from Fields tab only (route params + read-only UI); real lat/lng on submit
- [x] Game Detail — join/leave with all 4 states
- [x] Account screen — stats, sign out
- [x] Date and time fields use proper pickers — stored as "YYYY-MM-DD" and "h:mm a"

## Phase 3: Step-by-Step Execution Plan

_Agent Instruction: Do NOT execute all of Phase 3 at once. Wait for the user to prompt you to begin each step sequentially._

**Step 3.1: Curated Fields Seed Data**

- Create a new file (e.g., `constants/fields.ts`).
- Export a static array of mock approved soccer fields. Each object should have an `id`, `name`, `address`, `lat`, and `lng`.

**Step 3.2: Location Permissions & Setup**

- Install `expo-location`.
- Implement a hook or utility in the app to request foreground location permissions on load.
- Capture the user's current `lat/lng`. Handle the "permission denied" state gracefully with a fallback UI or default location.

**Step 3.3: Distance Logic & Sorting**

- Implement a utility function (e.g., Haversine formula) to calculate the distance in miles between the user's current `lat/lng` and each field's `lat/lng` in the seed data.
- Sort the static list of fields so the closest ones appear first.

**Step 3.4: Fields Tab UI**

- Repurpose the former map tab as **`app/(tabs)/fields.tsx`** with **`styles/screens/Fields.styles.ts`** (the old `map.tsx` / `Map.styles.ts` are removed).
- _CRITICAL RULE:_ Do NOT use `react-native-maps` or any external map APIs on this screen. Display the sorted seed data as a scrollable `FlatList` of cards showing the field name, address, and calculated distance in miles.

**Step 3.5: Navigation & Pre-filling Create Form**

- Add an `onPress` event to the field cards in the Fields tab.
- Route the user to the Create tab (`/(tabs)/create`), passing the `fieldName`, `address`, `lat`, and `lng` via Expo Router params.
- Update `CreateGameScreen` to parse incoming route params and pre-fill the form state.
- Make the Location/Field Name inputs on the Create form read-only (or visual text blocks instead of inputs), since users must select from the approved list.
- Update the `createGame` payload to submit the passed `lat/lng` instead of the previous hardcoded `{ lat: 0, lng: 0 }`.

## Key Design Decision

The app relies strictly on a curated database of approved public fields. We are NOT allowing users to type custom addresses, and we are NOT using external Geocoding APIs. The former "Map" tab is the **Fields** tab: a simple list of approved locations sorted by distance.

## What's Coming Next (Phase 4)

- App icon and splash screen
- Polish pass: loading states, empty states, error handling audit
- EAS Build for App Store and Google Play submission

## Environment Variables Needed

- EXPO_PUBLIC_FIREBASE_API_KEY ✅
- EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ✅
- EXPO_PUBLIC_FIREBASE_PROJECT_ID ✅
- EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ✅
- EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ✅
- EXPO_PUBLIC_FIREBASE_APP_ID ✅
