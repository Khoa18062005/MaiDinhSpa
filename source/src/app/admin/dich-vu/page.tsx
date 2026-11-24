import React from 'react';
import type { Metadata } from 'next';
import AdminServicesPage from '@/components/pages/admin/AdminServicesPage';

export const metadata: Metadata = {
  title: 'Quản lý Dịch vụ & Bảng giá',
};

export default function AdminServicesRoutePage() {
  return <AdminServicesPage />;
}
