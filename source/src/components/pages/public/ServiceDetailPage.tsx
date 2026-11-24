import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CalendarCheck, CheckCircle2, Clock } from 'lucide-react';
import { Service } from '@/types';
import { formatVND } from '@/lib/utils';
import ServiceCard from '@/components/shared/ServiceCard';

interface ServiceDetailPageProps {
  service: Service;
  relatedServices: Service[];
}

export default function ServiceDetailPage({
  service,
  relatedServices,
}: ServiceDetailPageProps) {
  const effectivePrice = service.salePrice ?? service.price;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link
        href="/dich-vu"
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Quay lại bảng giá dịch vụ
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Main Ritual Content */}
        <div className="space-y-8 lg:col-span-8">
          <div className="overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 sm:p-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[var(--bg-surface-soft)]">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--accent-gold-text)]">
              <span>{service.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                Thời lượng {service.durationMinutes} phút
              </span>
            </div>

            <h1 className="mt-2 font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl">
              {service.name}
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {service.description}
            </p>

            {/* Suitable For */}
            <div className="mt-7 rounded-[20px] bg-[var(--bg-surface-soft)] p-5">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                Liệu trình đặc biệt phù hợp với:
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                {service.suitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-sage)]"
                      strokeWidth={1.85}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Ritual Timeline */}
          <section
            aria-labelledby="ritual-steps-heading"
            className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 sm:p-8"
          >
            <h2
              id="ritual-steps-heading"
              className="font-serif-display text-2xl font-medium text-[var(--text-primary)] sm:text-3xl"
            >
              Quy trình {service.steps.length} bước thực hiện chuẩn tại Mai Đinh Spa
            </h2>
            <ol className="mt-6 space-y-5">
              {service.steps.map((step) => (
                <li
                  key={step.stepNumber}
                  className="flex gap-4 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-4 sm:p-5"
                >
                  <span className="tabular-nums flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)]">
                    {step.stepNumber}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      {step.durationNote && (
                        <span className="tabular-nums rounded-full bg-[var(--bg-surface-card)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                          {step.durationNote}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Sticky Reservation Card */}
        <aside className="lg:sticky lg:top-24 lg:col-span-4">
          <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 shadow-[var(--shadow-ambient)] sm:p-7">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase">
              Chi phí trọn gói 1 buổi
            </p>
            <div className="mt-2 flex items-baseline gap-3 tabular-nums">
              <span className="font-serif-display text-4xl font-semibold text-[var(--text-primary)]">
                {formatVND(effectivePrice)}
              </span>
              {service.salePrice && (
                <span className="text-sm text-[var(--text-muted)] line-through">
                  {formatVND(service.price)}
                </span>
              )}
            </div>

            <dl className="mt-5 space-y-2.5 border-y border-[var(--border-subtle)] py-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Thời lượng thực hiện</dt>
                <dd className="tabular-nums font-semibold text-[var(--text-primary)]">
                  {service.durationMinutes} phút
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Đặt cọc trực tuyến</dt>
                <dd className="font-semibold text-[var(--accent-sage)]">Miễn phí (0đ)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Tích điểm thành viên</dt>
                <dd className="font-semibold text-[var(--accent-gold-text)]">1 – 4 điểm / 100k</dd>
              </div>
            </dl>

            <Link
              href={`/dat-lich?service=${service.slug}`}
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
            >
              <CalendarCheck className="h-4 w-4" strokeWidth={1.85} />
              Đặt lịch liệu trình này
            </Link>

            <p className="mt-3 text-center text-xs leading-relaxed text-[var(--text-muted)]">
              Chủ Spa sẽ kiểm tra giường trống và xác nhận lịch hẹn của bạn trong vòng 30 phút giờ mở cửa.
            </p>
          </div>
        </aside>
      </div>

      {relatedServices.length > 0 && (
        <section aria-labelledby="related-services-heading" className="mt-16">
          <h2
            id="related-services-heading"
            className="font-serif-display text-2xl font-medium text-[var(--text-primary)] sm:text-3xl"
          >
            Liệu trình gợi ý kết hợp
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((rel) => (
              <ServiceCard key={rel.id} service={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
