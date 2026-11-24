import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/layout/FloatingContact';
import { getSpaSettings } from '@/lib/data';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSpaSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-9">{children}</main>
      <FloatingContact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}
