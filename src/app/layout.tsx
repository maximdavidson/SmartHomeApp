'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/shared/store/themeStore';
import { Footer } from '@/shared/ui/Footer';
import { Header } from '@/shared/ui/Header';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.style.backgroundColor = 'var(--background-color-dark)';
      document.body.style.color = 'var(--text-color-dark)';
    } else {
      document.body.style.backgroundColor = 'var(--background-color-light)';
      document.body.style.color = 'var(--text-color-light)';
    }
  }, [theme]);

  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
