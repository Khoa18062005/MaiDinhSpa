'use client';

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Category, Product } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import ProductCard from '@/components/shared/ProductCard';
import { cn } from '@/lib/utils';

interface ProductsPageProps {
  categories: Category[];
  initialProducts: Product[];
}

export default function ProductsPage({ categories, initialProducts }: ProductsPageProps) {
  const { products: liveProducts } = useSpaDemo();
  const activeList = useMemo(
    () => (liveProducts.length ? liveProducts.filter((p) => p.isActive) : initialProducts),
    [liveProducts, initialProducts]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return activeList.filter((prd) => {
      const matchCat = selectedCategory === 'ALL' || prd.categoryId === selectedCategory;
      const matchStock = !onlyInStock || prd.inStock;
      const q = query.trim().toLowerCase();
      const matchText =
        !q ||
        prd.name.toLowerCase().includes(q) ||
        prd.brand.toLowerCase().includes(q) ||
        prd.shortDesc.toLowerCase().includes(q);
      return matchCat && matchStock && matchText;
    });
  }, [activeList, selectedCategory, onlyInStock, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-7 sm:p-10">
        <h1 className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-5xl">
          Danh mục Dược mỹ phẩm tại Mai Đinh Spa
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
          Các sản phẩm dưới đây được trưng bày để bạn tra cứu thành phần, công dụng và giá bán niêm yết tại quầy. Để tránh mua nhầm hoạt chất không hợp nền da, Mai Đinh Spa không bán giỏ hàng đại trà mà tư vấn trực tiếp qua Zalo hoặc khi bạn ghé cơ sở.
        </p>

        <div className="mt-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={cn(
                'min-h-10 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
                selectedCategory === 'ALL'
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                  : 'border border-[var(--border-strong)] bg-[var(--bg-surface-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-pill-active)]'
              )}
            >
              Tất cả ({activeList.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'min-h-10 rounded-full px-4 py-2 text-xs font-semibold transition-colors',
                  selectedCategory === cat.id
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                    : 'border border-[var(--border-strong)] bg-[var(--bg-surface-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-pill-active)]'
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="h-4 w-4 accent-[#2B2521]"
              />
              Chỉ hiện hàng có sẵn
            </label>

            <div className="relative flex-1 sm:w-64">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
                strokeWidth={1.75}
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm tên mỹ phẩm, thương hiệu..."
                aria-label="Tìm tên mỹ phẩm hoặc thương hiệu"
                className="h-11 w-full rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] pr-4 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
              />
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-12 text-center">
          <p className="font-serif-display text-2xl text-[var(--text-primary)]">
            Không có sản phẩm phù hợp bộ lọc hiện tại
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setOnlyInStock(false);
              setQuery('');
            }}
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[var(--text-primary)] px-6 py-2.5 text-sm font-semibold text-[#FAF7F2]"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
