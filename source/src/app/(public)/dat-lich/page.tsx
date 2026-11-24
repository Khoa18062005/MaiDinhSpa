import React from 'react';
import type { Metadata } from 'next';
import BookingPage from '@/components/pages/public/BookingPage';
import { getClosedDates } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Đặt lịch hẹn giữ chỗ miễn phí',
  description: 'Đặt lịch chăm sóc da và gội đầu dưỡng sinh trực tuyến tại Mai Đinh Spa. Không cần đặt cọc trước.',
};

export default async function BookingRoutePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const [{ service }, closedDates] = await Promise.all([
    searchParams,
    getClosedDates(),
  ]);

  return (
    <BookingPage
      closedDates={closedDates}
      preselectedServiceSlug={service}
    />
  );
}
