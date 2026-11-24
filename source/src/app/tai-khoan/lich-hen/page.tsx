import React from 'react';
import type { Metadata } from 'next';
import MemberBookingsPage from '@/components/pages/member/MemberBookingsPage';

export const metadata: Metadata = {
  title: 'Lịch hẹn của tôi',
};

export default function MemberBookingsRoutePage() {
  return <MemberBookingsPage />;
}
