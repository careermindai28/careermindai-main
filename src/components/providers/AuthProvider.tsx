'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { isFirebaseReady, getFirebaseAuth, getFirebaseDb } from '@/lib/firebaseClient';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  firebaseReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  firebaseReady: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // evaluate once
  const firebaseReady = useMemo(() => isFirebaseReady(), []);

  useEffect(() => {
    if (!firebaseReady) {
      console.warn('⚠️ Firebase not configured. Auth features disabled.');
      setLoading(false);
      return;
    }

    let unsub: (() => void) | null = null;

    (async () => {
      try {
        const auth = getFirebaseAuth();
        const db = getFirebaseDb();

        // ✅ Critical: keep session on navigation/reload
        await setPersistence(auth, browserLocalPersistence);

        unsub = onAuthStateChanged(auth, async (firebaseUser) => {
          setUser(firebaseUser);

          if (firebaseUser) {
            try {
              const userRef = doc(db, 'users', firebaseUser.uid);
              const snap = await getDoc(userRef);

              if (!snap.exists()) {
                await setDoc(
                  userRef,
                  {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email ?? null,
                    displayName: firebaseUser.displayName ?? null,
                    photoURL: firebaseUser.photoURL ?? null,
                    createdAt: serverTimestamp(),
                    lastLoginAt: serverTimestamp(),
                  },
                  { merge: true }
                );
              } else {
                await setDoc(
                  userRef,
                  {
                    email: firebaseUser.email ?? null,
                    displayName: firebaseUser.displayName ?? null,
                    photoURL: firebaseUser.photoURL ?? null,
                    lastLoginAt: serverTimestamp(),
                  },
                  { merge: true }
                );
              }
            } catch (err) {
              console.error('Error updating user doc:', err);
            }
          }

          setLoading(false);
        });
      } catch (err) {
        console.error('Error setting up auth listener:', err);
        setLoading(false);
      }
    })();

    return () => {
      if (unsub) unsub();
    };
  }, [firebaseReady]);

  return (
    <AuthContext.Provider value={{ user, loading, firebaseReady }}>
      {children}
    </AuthContext.Provider>
  );
}
