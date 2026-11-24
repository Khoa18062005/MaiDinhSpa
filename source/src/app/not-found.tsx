import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarCheck } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-lg rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-10 shadow-[var(--shadow-ambient)]">
        <p className="tabular-nums font-serif-display text-5xl font-medium text-[var(--accent-gold-text)]">
          404
        </p>
        <h1 className="mt-3 font-serif-display text-3xl font-medium text-[var(--text-primary)]">
          Trang bạn tìm hiện không tồn tại
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          Đường dẫn có thể đã thay đổi hoặc liệu trình bạn tìm đã được cập nhật trong bảng giá mới của Mai Đinh Spa.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-pill-active)]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Về trang chủ
          </Link>
          <Link
            href="/dat-lich"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-6 py-2.5 text-sm font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={1.75} />
            Đặt lịch hẹn
          </Link>
        </div>
      </div>
    </main>
  );
}
