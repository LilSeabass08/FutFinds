/*
 * Public entry for Firebase: app, Auth, Firestore, and config helpers.
 */
export { getFirebaseApp } from './app';
export { getFirebaseAuth } from './auth';
export { getFirebaseConfig } from './config';
export {
  createUserWithEmailPassword,
  signInWithEmailPassword,
  signOutUser,
} from './emailPasswordAuth';
export { getFirestoreDb } from './firestore';
export {
  createGame,
  getGameById,
  getGamesListener,
  joinGame,
  leaveGame,
} from './games';
