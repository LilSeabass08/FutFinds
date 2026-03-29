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

Step 5:
@CONTEXT.md

Create a reusable component at components/GameCard.tsx. It receives a Game object as a prop and displays:

- Game title (bold, large)
- Surface type badge (pill shape, color coded: green for outdoor, blue for indoor, orange for futsal)
- Game type label ("Scrimmage" or the minigameType name if it's a minigame)
- Field name and address (with a 📍 pin emoji)
- Date and time (with a 🗓 emoji)
- Players count: "X / Y players" where X is playersJoined.length and Y is playersMax
- A subtle progress bar showing how full the game is (playersJoined / playersMax)
- If the game is full, show a "Full" badge instead of the count

The card should:

- Have a white background, rounded corners, and a subtle shadow
- Be touchable (use TouchableOpacity) and accept an onPress prop
- Be fully typed with TypeScript

Follow all rules in .cursorrules.

Step 6:
@CONTEXT.md

Build the List View screen at app/(tabs)/index.tsx. Requirements:

HEADER AREA:

- App name "FutFinds" as the screen title
- A horizontal scrollable row of filter pills below the title:
  All | Outdoor | Indoor | Futsal
- Active filter pill should be highlighted in green

GAME LIST:

- Use the useGames hook, passing in the active surface filter
- Render a FlatList of GameCard components
- Each GameCard onPress navigates to app/game/[id].tsx passing the game id
- Show a loading spinner (ActivityIndicator) while loading is true
- Show "No games found" centered on screen if the list is empty
- Show an error message if error is not null
- Add a pull-to-refresh using the FlatList refreshing and onRefresh props

Follow all rules in .cursorrules.

Step 7:
@CONTEXT.md

Build the Game Detail screen at app/game/[id].tsx. Requirements:

DATA LOADING:

- Read the game ID from the route using useLocalSearchParams from expo-router
- Call getGameById from firebase/games.ts on mount
- Show a loading spinner while fetching
- Show an error state if game is not found

DISPLAY:

- Game title (large, bold header)
- Surface badge (same style as GameCard)
- Game type / minigame type
- Full address with 📍
- Date and time with 🗓
- Players section:
  - "X / Y players joined"
  - A progress bar
  - List of joined player count as avatar placeholder circles (no names needed yet)

JOIN / LEAVE BUTTON:

- If the current user is NOT in playersJoined: show a green "Join Game" button
  - On press: call joinGame from firebase/games.ts
  - Disable and show spinner while loading
- If the current user IS in playersJoined: show a red outlined "Leave Game" button
  - On press: call leaveGame from firebase/games.ts
- If the game is full and user has not joined: show a disabled grey "Game Full" button
- If the current user is the creator (createdBy === user.uid): hide the join/leave button entirely and show a small "You created this game" label instead

Use useAuth to get current user. Follow all rules in .cursorrules.
