'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseReady] = useState(isFirebaseReady());

  useEffect(() => {
    // If Firebase is not ready, set loading to false and return
    if (!firebaseReady) {
      console.warn('⚠️ Firebase not configured. Auth features disabled.');
      setLoading(false);
      return;
    }

    try {
      const auth = getFirebaseAuth();
      const db = getFirebaseDb();

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          try {
            // Create or update user document in Firestore
            const userRef = doc(db, 'users', firebaseUser.uid);
            await setDoc(
              userRef,
              {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                lastLoginAt: serverTimestamp(),
              },
              { merge: true }
            );

            // Set createdAt only on first creation
            await setDoc(
              userRef,
              {
                createdAt: serverTimestamp(),
              },
              { merge: true, mergeFields: ['createdAt'] }
            );
          } catch (error) {
            console.error('Error updating user document:', error);
          }
        }

        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      setLoading(false);
    }
  }, [firebaseReady]);

  return (
    <AuthContext.Provider value={{ user, loading, firebaseReady }}>
      {children}
    </AuthContext.Provider>
  );
}