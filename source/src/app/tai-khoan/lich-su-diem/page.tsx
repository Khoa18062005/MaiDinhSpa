import React from 'react';
import type { Metadata } from 'next';
import PointHistoryPage from '@/components/pages/member/PointHistoryPage';

export const metadata: Metadata = {
  title: 'Sổ cái lịch sử điểm thưởng',
};

export default function PointHistoryRoutePage() {
  return <PointHistoryPage />;
}
