import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetailPage from '@/components/pages/public/ServiceDetailPage';
import { getActiveServices, getServiceBySlug } from '@/lib/data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Không tìm thấy liệu trình' };
  return {
    title: service.name,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getActiveServices(),
  ]);

  if (!service) {
    notFound();
  }

  const relatedServices = allServices
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

  return <ServiceDetailPage service={service} relatedServices={relatedServices} />;
}
