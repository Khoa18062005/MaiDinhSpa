import React from 'react';
import type { Metadata } from 'next';
import ProductsPage from '@/components/pages/public/ProductsPage';
import { getActiveProducts, getProductCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Danh mục Dược mỹ phẩm tại Spa',
  description: 'Tra cứu thành phần, công dụng và giá niêm yết các dòng dược mỹ phẩm chính hãng đang phân phối tại Mai Đinh Spa.',
};

export default async function ProductsRoutePage() {
  const [categories, initialProducts] = await Promise.all([
    getProductCategories(),
    getActiveProducts(),
  ]);

  return <ProductsPage categories={categories} initialProducts={initialProducts} />;
}
