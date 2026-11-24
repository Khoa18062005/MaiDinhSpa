import React from 'react';
import type { Metadata } from 'next';
import AdminCustomersPage from '@/components/pages/admin/AdminCustomersPage';

export const metadata: Metadata = {
  title: 'Hồ sơ Khách hàng & Tích điểm',
};

export default function AdminCustomersRoutePage() {
  return <AdminCustomersPage />;
}
