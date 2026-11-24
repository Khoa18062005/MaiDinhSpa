import React from 'react';
import type { Metadata } from 'next';
import UpdatePhonePage from '@/components/pages/auth/UpdatePhonePage';

export const metadata: Metadata = {
  title: 'Cập nhật Số điện thoại Thành viên',
};

export default function UpdatePhoneRoutePage() {
  return <UpdatePhonePage />;
}
