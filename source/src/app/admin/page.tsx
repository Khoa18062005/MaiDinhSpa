import React from 'react';
import type { Metadata } from 'next';
import AdminDashboardPage from '@/components/pages/admin/AdminDashboardPage';

export const metadata: Metadata = {
  title: 'Tổng quan Quản trị Chủ Spa',
};

export default function AdminDashboardRoutePage() {
  return <AdminDashboardPage />;
}
