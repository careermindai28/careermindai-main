import { signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebaseClient';

export async function logoutUser() {
  const auth = getFirebaseAuth();

  try {
    await signOut(auth);
  } finally {
    // Hard redirect resets all client state + avoids stale "logged-in" UI
    window.location.href = '/landing-page';
  }
}
