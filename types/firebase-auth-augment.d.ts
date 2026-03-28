/*
 * Firebase Auth's React Native bundle exports getReactNativePersistence at runtime (Metro),
 * but the published firebase/auth typings omit it. This keeps TypeScript in sync.
 */
import 'firebase/auth';

declare module 'firebase/auth' {
  export function getReactNativePersistence(
    storage: import('firebase/auth').ReactNativeAsyncStorage,
  ): import('firebase/auth').Persistence;
}
