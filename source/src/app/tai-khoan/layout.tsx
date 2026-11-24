import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MemberSidebar from '@/components/layout/MemberSidebar';
import { getSpaSettings } from '@/lib/data';

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSpaSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-7 px-4 pt-9 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4 xl:col-span-3">
          <MemberSidebar />
        </div>
        <main className="lg:col-span-8 xl:col-span-9">{children}</main>
      </div>
      <Footer settings={settings} />
    </div>
  );
}
