'use client';

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Category, Service } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import ServiceCard from '@/components/shared/ServiceCard';
import { cn } from '@/lib/utils';

interface ServicesPageProps {
  categories: Category[];
  initialServices: Service[];
}

export default function ServicesPage({ categories, initialServices }: ServicesPageProps) {
  const { services: liveServices } = useSpaDemo();
  const activeList = useMemo(
    () => (liveServices.length ? liveServices.filter((s) => s.isActive) : initialServices),
    [liveServices, initialServices]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return activeList.filter((srv) => {
      const matchCat = selectedCategory === 'ALL' || srv.categoryId === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchText =
        !q ||
        srv.name.toLowerCase().includes(q) ||
        srv.shortDesc.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [activeList, selectedCategory, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-7 sm:p-10">
        <h1 className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-5xl">
          Bảng giá &amp; Liệu trình Dịch vụ
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
          Giá niêm yết trọn gói cho từng buổi lẻ tại Mai Đinh Spa. Thành viên Hạng Bạc, Vàng và Kim Cương được tự động áp dụng mức giảm ưu đãi từ 5% – 12% khi thanh toán tại quầy.
        </p>

        {/* Filter Bar */}
        <div className="mt-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Nhóm dịch vụ">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'ALL'}
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
                role="tab"
                aria-selected={selectedCategory === cat.id}
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

          <div className="relative w-full lg:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tên liệu trình..."
              aria-label="Tìm tên liệu trình"
              className="h-11 w-full rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] pr-4 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-12 text-center">
          <p className="font-serif-display text-2xl text-[var(--text-primary)]">
            Chưa tìm thấy liệu trình khớp từ khóa
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Bạn hãy thử xóa bộ lọc hoặc xem toàn bộ các nhóm chăm sóc da và dưỡng sinh của Spa.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('ALL');
              setQuery('');
            }}
            className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[var(--text-primary)] px-6 py-2.5 text-sm font-semibold text-[#FAF7F2]"
          >
            Xem lại tất cả dịch vụ
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
