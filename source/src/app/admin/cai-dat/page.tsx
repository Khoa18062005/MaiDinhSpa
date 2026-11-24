import React from 'react';
import type { Metadata } from 'next';
import AdminSettingsPage from '@/components/pages/admin/AdminSettingsPage';

export const metadata: Metadata = {
  title: 'Cài đặt Sức chứa & Hạng Thành viên',
};

export default function AdminSettingsRoutePage() {
  return <AdminSettingsPage />;
}
