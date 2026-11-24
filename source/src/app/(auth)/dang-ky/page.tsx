import React from 'react';
import type { Metadata } from 'next';
import RegisterPage from '@/components/pages/auth/RegisterPage';

export const metadata: Metadata = {
  title: 'Đăng ký Thẻ Thành viên Thân thiết',
};

export default function RegisterRoutePage() {
  return <RegisterPage />;
}
