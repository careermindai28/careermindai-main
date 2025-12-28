import { signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebaseClient';

export async function logoutUser() {
  const auth = getFirebaseAuth();
  await signOut(auth);

  // Hard redirect to fully reset client state
  window.location.href = '/sign-in';
}
