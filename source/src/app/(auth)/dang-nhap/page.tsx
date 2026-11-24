import React from 'react';
import type { Metadata } from 'next';
import LoginPage from '@/components/pages/auth/LoginPage';

export const metadata: Metadata = {
  title: 'Đăng nhập Thành viên',
};

export default function LoginRoutePage() {
  return <LoginPage />;
}
