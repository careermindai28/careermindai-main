'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { isFirebaseReady, getFirebaseAuth } from '@/lib/firebaseClient';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (!isFirebaseReady()) {
      console.error('Firebase not ready for logout');
      return;
    }

    try {
      setLoading(true);
      const auth = getFirebaseAuth();
      await signOut(auth);
      router?.push('/landing-page');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}