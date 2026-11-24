import React from 'react';
import type { Metadata } from 'next';
import ServicesPage from '@/components/pages/public/ServicesPage';
import { getActiveServices, getServiceCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Bảng giá & Liệu trình Dịch vụ',
  description: 'Khám phá các gói chăm sóc da chuyên sâu, gội đầu dưỡng sinh thảo mộc và trị liệu đá nóng tại Mai Đinh Spa.',
};

export default async function ServicesRoutePage() {
  const [categories, initialServices] = await Promise.all([
    getServiceCategories(),
    getActiveServices(),
  ]);

  return <ServicesPage categories={categories} initialServices={initialServices} />;
}
