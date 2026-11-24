import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { Product, SpaSettings } from '@/types';
import { formatVND } from '@/lib/utils';
import ProductCard from '@/components/shared/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  settings: SpaSettings;
}

export default function ProductDetailPage({
  product,
  relatedProducts,
  settings,
}: ProductDetailPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link
        href="/san-pham"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Quay lại danh mục sản phẩm
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 sm:p-9 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-wider text-[var(--accent-gold-text)] uppercase">
              {product.brand} · {product.volume} · Xuất xứ {product.origin}
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                product.inStock
                  ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                  : 'bg-[#EFECE6] text-[#575049]'
              }`}
            >
              {product.inStock ? 'Đang có sẵn tại quầy Spa' : 'Tạm hết hàng — Nhận đặt giữ trước'}
            </span>
          </div>

          <h1 className="mt-3 font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3 tabular-nums">
            <span className="font-serif-display text-3xl font-semibold text-[var(--text-primary)]">
              {formatVND(product.price)}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              (Mua tại quầy vẫn được cộng chi tiêu xét hạng &amp; tích điểm thành viên)
            </span>
          </div>

          <p className="mt-5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {product.description}
          </p>

          <div className="mt-6 grid gap-5 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                Hoạt chất chủ đạo
              </h2>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.keyIngredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                Nền da khuyến nghị
              </h2>
              <ul className="mt-2.5 space-y-1.5 text-sm text-[var(--text-secondary)]">
                {product.skinTypes.map((st) => (
                  <li key={st} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-sage)]"
                      strokeWidth={1.85}
                    />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-[18px] bg-[var(--bg-surface-soft)] p-4">
            <h2 className="text-xs font-semibold tracking-wide text-[var(--text-primary)] uppercase">
              Hướng dẫn sử dụng tại nhà
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              {product.usageGuide}
            </p>
          </div>

          {/* Consultation CTAs (No Cart) */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href={settings.zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
            >
              <MessageCircle className="h-4 w-4 text-[#DFC084]" strokeWidth={1.85} />
              Nhắn Zalo nhờ Chủ Spa tư vấn da
            </a>

            <a
              href={`tel:${settings.phone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-soft)]"
            >
              <Phone className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.85} />
              Gọi giữ hàng: {settings.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-products-heading" className="mt-16">
          <h2
            id="related-products-heading"
            className="font-serif-display text-2xl font-medium text-[var(--text-primary)] sm:text-3xl"
          >
            Sản phẩm cùng chu trình dưỡng
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
