import "./globals.css";
import React from 'react';
import '../styles/index.css';
import ClientRoot from '@/components/providers/ClientRoot';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'CareerMindAI – AI Resumes, Cover Letters & Interview Prep',
  description:
    'CareerMindAI uses the ResumeMind Score™ engine to audit your resume, generate ATS-optimized resumes and cover letters, and prepare you for interviews – tailored for Indian and global job markets.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>
          {children}
        </ClientRoot>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fcareermind6641back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.10" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.1" /></body>
    </html>
  );
}