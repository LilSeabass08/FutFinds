# FutFinds — Bug Fix Context

## Current Phase

Bug Fix — Game Detail Screen (app/game/[id].tsx)

## What's Been Built (Relevant Files)

- app/game/[id].tsx — Game detail screen
- firebase/games.ts — contains createGame, joinGame, leaveGame (need to add deleteGame)
- hooks/useAuth.ts — returns { user, loading }
- types/index.ts — Game interface

## Fixes To Implement

### Fix 1 — Delete Game (Creator Only)

The game creator currently sees "You created this game" label but has no way to delete the listing.

Expected behavior:

- If user.uid === game.createdBy, show a red "Delete Game" button below the "You created this game" label
- On press, show a confirmation Alert (React Native Alert) with:
  - Title: "Delete Game"
  - Message: "Are you sure you want to remove this listing? This cannot be undone."
  - Two buttons: "Cancel" (dismiss) and "Delete" (destructive, calls delete logic)
- On confirm:
  - Call deleteGame(gameId) from firebase/games.ts
  - Show a loading spinner on the button while deleting
  - On success, navigate back to app/(tabs)/index.tsx
  - On error, show an error message below the button
- Add deleteGame(gameId: string): Promise<void> to firebase/games.ts
  - Deletes the document from the "games" collection
  - Includes try/catch error handling

### Fix 2 — Back Arrow Header Label

In components/GameDetailJoinSection the back arrow in the header shows "(tabs)" as the back label next to the arrow.

Expected behavior:

- No text next to the back arrow — just the arrow icon alone
- Fix by adding a custom headerBackTitle option in the screen config

## Files To Touch

- app/game/[id].tsx — both fixes apply here
- firebase/games.ts — add deleteGame function
- components/GameDetailJoinSection.tsx

## Do Not Touch

- Any other screens
- Firestore security rules (delete is already allowed for creators)
- types/index.ts
- Any hooks

## Rules

- Always use try/catch in Firebase functions
- Use TypeScript throughout
- Use React Native Alert for the confirmation dialog — no third party library
- Follow all existing code patterns already in these files
