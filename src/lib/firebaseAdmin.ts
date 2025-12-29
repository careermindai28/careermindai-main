import "server-only";
import admin from "firebase-admin";

function pickEnv(nameA: string, nameB: string) {
  const a = process.env[nameA];
  if (a && a.trim().length) return a;
  const b = process.env[nameB];
  if (b && b.trim().length) return b;
  return undefined;
}

function getPrivateKey(): string | undefined {
  const key =
    pickEnv("FIREBASE_ADMIN_PRIVATE_KEY", "FIREBASE_PRIVATE_KEY") ||
    undefined;
  if (!key) return undefined;
  // Vercel often stores newlines as \n
  return key.replace(/\\n/g, "\n");
}

export function getAdminApp() {
  if (admin.apps.length) return admin.app();

  // ✅ Support BOTH new + legacy env var names (so we don't break anything)
  const projectId =
    pickEnv("FIREBASE_ADMIN_PROJECT_ID", "FIREBASE_PROJECT_ID") || undefined;

  const clientEmail =
    pickEnv("FIREBASE_ADMIN_CLIENT_EMAIL", "FIREBASE_CLIENT_EMAIL") || undefined;

  const privateKey = getPrivateKey();

  // Optional but recommended if you use Storage
  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin env vars. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY (preferred). " +
        "Legacy also supported: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY."
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    ...(storageBucket ? { storageBucket } : {}),
  });

  return admin.app();
}

export function getFirestore() {
  getAdminApp();
  return admin.firestore();
}

export function getStorageBucket() {
  getAdminApp();
  return admin.storage().bucket();
}
