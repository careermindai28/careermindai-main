import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firestoreDb: Firestore | null = null;

function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
}

function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;

  const config = getFirebaseConfig();

  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    console.error('Firebase config is missing required values');
    throw new Error('Firebase is not configured correctly');
  }

  const apps = getApps();
  if (!apps.length) {
    firebaseApp = initializeApp(config);
  } else {
    firebaseApp = getApp();
  }

  return firebaseApp!;
}

export function getFirebaseAuth(): Auth {
  if (!firebaseAuth) {
    const app = getFirebaseApp();
    firebaseAuth = getAuth(app);
  }
  return firebaseAuth!;
}

export function getFirebaseDb(): Firestore {
  if (!firestoreDb) {
    const app = getFirebaseApp();
    firestoreDb = getFirestore(app);
  }
  return firestoreDb!;
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// For convenience, also export top-level singletons used in existing components
export const auth = getFirebaseAuth();
export const db = getFirebaseDb();

/**
 * Check if Firebase is properly initialized with required environment variables
 * @returns boolean indicating if Firebase is ready to use
 */
export function isFirebaseReady(): boolean {
  try {
    const config = getFirebaseConfig();
    
    // Basic config presence check
    if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
      console.error('Firebase config is incomplete. Check NEXT_PUBLIC_FIREBASE_* environment variables.');
      return false;
    }

    // Ensure the Firebase app is initialized
    if (!firebaseApp) {
      const apps = getApps();
      if (!apps.length) {
        firebaseApp = initializeApp(config);
      } else {
        firebaseApp = getApp();
      }
    }

    return true;
  } catch (error) {
    console.error('Error during Firebase readiness check:', error);
    return false;
  }
}

/**
 * Get the Google authentication provider instance
 * @returns GoogleAuthProvider instance
 */
export function getGoogleProvider(): GoogleAuthProvider {
  return googleProvider;
}