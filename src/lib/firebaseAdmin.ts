import "server-only";
import admin from "firebase-admin";

function getPrivateKey(): string | undefined {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;
  // Vercel env vars often store newlines as \n
  return key.replace(/\\n/g, "\n");
}

export function getAdminApp() {
  if (admin.apps.length) return admin.app();

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin env vars. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY."
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  return admin.app();
}

export function getFirestore() {
  getAdminApp();
  return admin.firestore();
}

export function getStorageBucket() {
  getAdminApp();
  // storageBucket is optional; if missing, bucket() will still attempt default bucket name from project.
  return admin.storage().bucket();
}
