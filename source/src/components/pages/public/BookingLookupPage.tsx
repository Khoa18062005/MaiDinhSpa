'use client';

import React, { useState } from 'react';
import { CheckCircle2, Clock, Search } from 'lucide-react';
import { Appointment } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import { APPOINTMENT_STATUS_META } from '@/lib/constants';
import { formatVND, formatVNDate, normalizeVNPhone } from '@/lib/utils';
import BookingStatusBadge from '@/components/shared/BookingStatusBadge';

interface BookingLookupPageProps {
  initialCode?: string;
  initialPhone?: string;
}

export default function BookingLookupPage({
  initialCode = '',
  initialPhone = '',
}: BookingLookupPageProps) {
  const { appointments, settings } = useSpaDemo();

  const [bookingCode, setBookingCode] = useState(initialCode || 'MDS-7KQ4TX');
  const [phone, setPhone] = useState(initialPhone || '0909123456');
  const [result, setResult] = useState<Appointment | null>(() => {
    const codeClean = (initialCode || 'MDS-7KQ4TX').trim().toUpperCase();
    const phoneClean = normalizeVNPhone(initialPhone || '0909123456');
    return (
      appointments.find(
        (a) => a.bookingCode.toUpperCase() === codeClean && a.customerPhone === phoneClean
      ) ?? null
    );
  });
  const [searched, setSearched] = useState(true);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const codeClean = bookingCode.trim().toUpperCase();
    const phoneClean = normalizeVNPhone(phone);
    const matched =
      appointments.find(
        (a) => a.bookingCode.toUpperCase() === codeClean && a.customerPhone === phoneClean
      ) ?? null;
    setResult(matched);
    setSearched(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-7 sm:p-10">
        <h1 className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl">
          Tra cứu trạng thái lịch hẹn
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Nhập Mã lịch hẹn và Số điện thoại đã đăng ký để xem Chủ Spa đã duyệt giữ giường cho bạn chưa. (Thử sẵn mã mẫu <code className="font-semibold">MDS-7KQ4TX</code> + SĐT <code className="font-semibold">0909123456</code>).
        </p>

        <form onSubmit={handleLookup} className="mt-6 grid gap-3 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <label htmlFor="lookup-code" className="sr-only">
              Mã lịch hẹn
            </label>
            <input
              id="lookup-code"
              type="text"
              required
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              placeholder="Mã đơn (VD: MDS-7KQ4TX)"
              className="h-12 w-full rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-5 text-sm font-semibold text-[var(--text-primary)] uppercase placeholder:normal-case"
            />
          </div>
          <div className="sm:col-span-4">
            <label htmlFor="lookup-phone" className="sr-only">
              Số điện thoại
            </label>
            <input
              id="lookup-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại (10 số)"
              className="h-12 w-full rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-5 text-sm text-[var(--text-primary)] tabular-nums"
            />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-5 text-sm font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
            >
              <Search className="h-4 w-4" strokeWidth={1.85} />
              Tra cứu
            </button>
          </div>
        </form>
      </div>

      {searched && !result && (
        <div className="mt-6 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-8 text-center">
          <p className="font-serif-display text-xl text-[var(--text-primary)]">
            Không tìm thấy đơn lịch hẹn trùng khớp
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Vui lòng kiểm tra lại đúng Mã đơn (bắt đầu bằng <code>MDS-</code>) và Số điện thoại, hoặc gọi Hotline {settings.phoneDisplay}.
          </p>
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-7 shadow-[var(--shadow-ambient)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-5">
            <div>
              <p className="text-xs text-[var(--text-muted)]">Mã lịch hẹn</p>
              <p className="tabular-nums font-serif-display text-2xl font-semibold text-[var(--text-primary)]">
                {result.bookingCode}
              </p>
            </div>
            <BookingStatusBadge status={result.status} />
          </div>

          <p className="mt-4 rounded-xl bg-[var(--bg-surface-soft)] p-4 text-sm text-[var(--text-secondary)]">
            {APPOINTMENT_STATUS_META[result.status].description}
          </p>

          {/* 3-Step Visual Timeline */}
          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[#E7F3EC] p-3 text-[#1F5C3E]">
              <CheckCircle2 className="mx-auto h-4 w-4" />
              <span className="mt-1 block font-semibold">1. Đã tiếp nhận</span>
            </div>
            <div
              className={`rounded-xl border border-[var(--border-subtle)] p-3 ${
                result.status === 'CONFIRMED' || result.status === 'COMPLETED'
                  ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                  : 'bg-[var(--bg-surface-soft)] text-[var(--text-muted)]'
              }`}
            >
              <Clock className="mx-auto h-4 w-4" />
              <span className="mt-1 block font-semibold">2. Chủ Spa duyệt lịch</span>
            </div>
            <div
              className={`rounded-xl border border-[var(--border-subtle)] p-3 ${
                result.status === 'COMPLETED'
                  ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                  : 'bg-[var(--bg-surface-soft)] text-[var(--text-muted)]'
              }`}
            >
              <CheckCircle2 className="mx-auto h-4 w-4" />
              <span className="mt-1 block font-semibold">3. Hoàn thành &amp; Cộng điểm</span>
            </div>
          </div>

          <dl className="mt-6 space-y-2.5 border-t border-[var(--border-subtle)] pt-5 text-sm tabular-nums">
            <div className="flex justify-between">
              <dt className="text-[var(--text-secondary)]">Ngày &amp; Khung giờ</dt>
              <dd className="font-semibold text-[var(--text-primary)]">
                {result.startTime} – {result.endTime} · {formatVNDate(result.appointmentDate)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-secondary)]">Liệu trình đăng ký</dt>
              <dd className="max-w-xs text-right font-medium text-[var(--text-primary)]">
                {result.items.map((i) => i.serviceName).join(', ')}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-secondary)]">Số lượng khách</dt>
              <dd className="font-semibold text-[var(--text-primary)]">{result.guestCount} người</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-[var(--text-secondary)]">Chi phí dự kiến</dt>
              <dd className="font-semibold text-[var(--text-primary)]">
                {formatVND(result.estimatedAmount)}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
