import React from 'react';
import type { Metadata } from 'next';
import MemberDashboardPage from '@/components/pages/member/MemberDashboardPage';

export const metadata: Metadata = {
  title: 'Thẻ Thành viên & Ưu đãi Hạng',
};

export default function MemberDashboardRoutePage() {
  return <MemberDashboardPage />;
}
