import React from 'react';
import type { Metadata } from 'next';
import AdminBookingsPage from '@/components/pages/admin/AdminBookingsPage';

export const metadata: Metadata = {
  title: 'Duyệt lịch hẹn & Chốt hóa đơn',
};

export default function AdminBookingsRoutePage() {
  return <AdminBookingsPage />;
}
