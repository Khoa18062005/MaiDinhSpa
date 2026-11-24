import React from 'react';
import type { Metadata } from 'next';
import BookingLookupPage from '@/components/pages/public/BookingLookupPage';

export const metadata: Metadata = {
  title: 'Tra cứu trạng thái lịch hẹn',
};

export default async function BookingLookupRoutePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; phone?: string }>;
}) {
  const { code, phone } = await searchParams;
  return <BookingLookupPage initialCode={code} initialPhone={phone} />;
}
