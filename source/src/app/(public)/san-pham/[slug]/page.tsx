import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailPage from '@/components/pages/public/ProductDetailPage';
import { getActiveProducts, getProductBySlug, getSpaSettings } from '@/lib/data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Không tìm thấy sản phẩm' };
  return {
    title: product.name,
    description: product.shortDesc,
  };
}

export default async function ProductDetailRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts, settings] = await Promise.all([
    getProductBySlug(slug),
    getActiveProducts(),
    getSpaSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={relatedProducts}
      settings={settings}
    />
  );
}
