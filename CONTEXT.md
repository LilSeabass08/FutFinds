# FutFinds — Project Context

## Current Phase

Phase 1 — Foundation (Project setup, Firebase connection, Auth, Navigation shell)

## What's Been Built

- [ ] Expo project scaffolded
- [ ] Firebase project created
- [ ] Firebase Auth enabled (Email + Google)
- [ ] Firestore database created
- [ ] Bottom tab navigation shell
- [ ] Login/Signup screens

## What We're Building Now

- Expo Router tab layout with 4 tabs: List, Map, Create, Account
- Firebase config file connected to the app
- Auth flow: if not logged in → show login screen, if logged in → show tabs

## Key Decisions Made

- Using Expo Router (not React Navigation)
- Firebase handles all backend logic for MVP (no Python backend yet)
- TypeScript strict mode throughout
- Firestore collections: `games`, `users`

## What's Coming Next (Phase 2)

- Create Game form
- Game list feed from Firestore
- Join game functionality
- Surface filters (outdoor/indoor/futsal)

## Known Issues / Blockers

- None yet

## Environment Variables Needed

- EXPO_PUBLIC_FIREBASE_API_KEY
- EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
- EXPO_PUBLIC_FIREBASE_PROJECT_ID
- EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
- EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- EXPO_PUBLIC_FIREBASE_APP_ID
- EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

```

---

### How to Use These in Cursor

1. **`.cursorrules`** is automatic — Cursor reads it on every prompt in your project
2. **`CONTEXT.md`** — reference it manually by typing `@CONTEXT.md` at the start of important prompts
3. **Suggested prompt pattern to use every session:**
```

@CONTEXT.md I'm working on Phase 1. Help me [specific task].
Follow the rules in .cursorrules.
