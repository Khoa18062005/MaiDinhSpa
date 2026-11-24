import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@/types';
import { formatVND } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div>
        <Link
          href={`/san-pham/${product.slug}`}
          className="relative block aspect-square w-full overflow-hidden rounded-[18px] bg-[var(--bg-surface-soft)]"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div
            className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              product.inStock
                ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                : 'bg-[#EFECE6] text-[#575049]'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                product.inStock ? 'bg-[#1F5C3E]' : 'bg-[#575049]'
              }`}
              aria-hidden="true"
            />
            {product.inStock ? 'Có sẵn tại Spa' : 'Tạm hết hàng'}
          </div>
        </Link>

        <div className="mt-4">
          <div className="flex items-center justify-between gap-2 text-xs font-medium text-[var(--text-muted)]">
            <span>{product.brand}</span>
            <span className="tabular-nums">{product.volume}</span>
          </div>
          <h3 className="mt-1.5 font-serif-display text-lg font-medium leading-snug text-[var(--text-primary)]">
            <Link href={`/san-pham/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {product.shortDesc}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
        <div className="tabular-nums">
          <span className="block text-xs text-[var(--text-muted)]">Giá niêm yết tại quầy</span>
          <span className="text-base font-semibold text-[var(--text-primary)]">
            {formatVND(product.price)}
          </span>
        </div>

        <Link
          href={`/san-pham/${product.slug}`}
          className="inline-flex min-h-10 shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-[var(--border-strong)] bg-transparent px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-soft)]"
        >
          Xem chi tiết
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        </Link>
      </div>
    </article>
  );
}
