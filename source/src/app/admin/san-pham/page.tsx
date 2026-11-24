import React from 'react';
import type { Metadata } from 'next';
import AdminProductsPage from '@/components/pages/admin/AdminProductsPage';

export const metadata: Metadata = {
  title: 'Quản lý Sản phẩm trưng bày',
};

export default function AdminProductsRoutePage() {
  return <AdminProductsPage />;
}
