'use client';

import React from 'react';
import { AuthProvider } from './AuthProvider';

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}