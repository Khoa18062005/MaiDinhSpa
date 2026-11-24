import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { Service } from '@/types';
import { formatVND } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const effectivePrice = service.salePrice ?? service.price;

  return (
    <article className="group flex flex-col justify-between rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
      <div>
        <Link
          href={`/dich-vu/${service.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[var(--bg-surface-soft)]"
        >
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--bg-surface-card)]/95 px-3 py-1 text-xs font-medium text-[var(--text-primary)] shadow-xs tabular-nums">
            <Clock className="h-3.5 w-3.5 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
            {service.durationMinutes} phút
          </div>
          {service.salePrice && (
            <div className="absolute top-3 right-3 rounded-full bg-[var(--btn-primary-bg)] px-3 py-1 text-xs font-medium text-[var(--btn-primary-text)]">
              Ưu đãi liệu trình
            </div>
          )}
        </Link>

        <div className="mt-4">
          <p className="text-xs font-medium text-[var(--accent-gold-text)]">
            {service.categoryName}
          </p>
          <h3 className="mt-1.5 font-serif-display text-xl font-medium leading-snug text-[var(--text-primary)]">
            <Link href={`/dich-vu/${service.slug}`} className="hover:underline">
              {service.name}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {service.shortDesc}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
        <div className="tabular-nums">
          <span className="block text-lg font-semibold text-[var(--text-primary)]">
            {formatVND(effectivePrice)}
          </span>
          {service.salePrice && (
            <span className="text-xs text-[var(--text-muted)] line-through">
              {formatVND(service.price)}
            </span>
          )}
        </div>

        <Link
          href={`/dat-lich?service=${service.slug}`}
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
        >
          Đặt lịch
          <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
        </Link>
      </div>
    </article>
  );
}
