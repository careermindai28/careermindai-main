// src/lib/firebaseAdmin.ts
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing Firebase Admin env vars. Set ${name}.`);
  return v;
}

export function getAdminApp(): App {
  if (getApps().length) return getApps()[0]!;

  const projectId = requireEnv("FIREBASE_PROJECT_ID");
  const clientEmail = requireEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getAdminAuth(): Auth {
  const app = getAdminApp();
  return getAuth(app);
}

export function getAdminDb(): Firestore {
  const app = getAdminApp();
  return getFirestore(app);
}
