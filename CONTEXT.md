@CONTEXT.md

Phase 2 Step 2:

Create firebase/games.ts with the following Firestore helper functions. All functions must use try/catch error handling and be fully typed using interfaces from types/index.ts.

1. createGame(data: CreateGameFormData, userId: string): Promise<string>
   - Adds a new document to the "games" collection
   - Automatically sets: createdBy, createdAt, playersJoined: []
   - Returns the new document ID

2. getGamesListener(callback: (games: Game[]) => void): Unsubscribe
   - Sets up a real-time onSnapshot listener on the "games" collection
   - Orders by createdAt descending
   - Maps each doc to a Game object including the doc id
   - Returns the unsubscribe function

3. getGameById(gameId: string): Promise<Game | null>
   - Fetches a single game document by ID
   - Returns null if not found

4. joinGame(gameId: string, userId: string): Promise<void>
   - Uses arrayUnion to add userId to playersJoined array
   - Should not add duplicate entries

5. leaveGame(gameId: string, userId: string): Promise<void>
   - Uses arrayRemove to remove userId from playersJoined array

Follow all rules in .cursorrules.

Step 3:
@CONTEXT.md

Create a custom hook at hooks/useGames.ts that:

- Calls getGamesListener from firebase/games.ts on mount
- Stores games in local state
- Stores a loading boolean (true until first snapshot arrives)
- Stores an error string | null
- Cleans up the listener on unmount using the returned unsubscribe function
- Accepts an optional SurfaceFilter parameter
  - If filter is not "all", filters the games array to only return matching surface type
- Returns: { games, loading, error }

Use TypeScript throughout. Follow all rules in .cursorrules.

Step 4:
@CONTEXT.md

Build the Create Game screen at app/(tabs)/create.tsx. This is a form screen using react-hook-form. Here are the full requirements:

FIELDS (in this order):

1. Game Title — text input, required
2. Surface Type — horizontal pill selector with 3 options: Outdoor | Indoor | Futsal. Required.
3. Field Name — text input, required (name of the venue/park)
4. Address — text input, required
5. Date — text input for now (format hint: YYYY-MM-DD), required
6. Time — text input for now (format hint: e.g. 6:00 PM), required
7. Max Players — numeric input, required, min 2 max 22
8. Game Type — two large selectable cards side by side:
   - "Scrimmage" (left card)
   - "Minigame" (right card)
   - Required
9. Minigame Type — only visible when "Minigame" is selected above
   - Renders a scrollable horizontal list of pill buttons
   - Options come from the MINIGAME_OPTIONS constant in types/index.ts
   - Required if game type is "Minigame"

SUBMIT BUTTON:

- Label: "Post Game"
- Shows a loading spinner while submitting
- On success: reset the form and navigate to app/(tabs)/index.tsx
- On error: show an error message below the button

LOGIC:

- Use useAuth hook to get the current user
- On valid submit, call createGame from firebase/games.ts
- location field: hardcode { lat: 0, lng: 0 } for now with a TODO comment — we'll add geocoding in Phase 3

STYLE:

- Wrap in a ScrollView so it works on small screens
- Use clean inline styles, no external UI library
- Selected pills/cards should have a highlighted green border and background tint
