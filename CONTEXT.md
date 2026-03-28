@CONTEXT.md

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
