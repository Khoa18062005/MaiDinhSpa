import React from 'react';
import type { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/pages/public/PrivacyPolicyPage';
import { getSpaSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Chính sách bảo vệ dữ liệu cá nhân',
};

export default async function PrivacyPolicyRoutePage() {
  const settings = await getSpaSettings();
  return <PrivacyPolicyPage settings={settings} />;
}
