/*
 * All TypeScript interfaces live here
 */

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
export type ColorSchemeName = 'light' | 'dark';
