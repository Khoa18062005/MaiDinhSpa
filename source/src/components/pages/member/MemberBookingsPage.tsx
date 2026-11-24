'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarPlus, XCircle } from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import { formatVND, formatVNDate } from '@/lib/utils';
import BookingStatusBadge from '@/components/shared/BookingStatusBadge';

export default function MemberBookingsPage() {
  const {
    customers,
    appointments,
    invoices,
    settings,
    activeDemoCustomerId,
    updateAppointmentStatus,
  } = useSpaDemo();

  const customer = customers.find((c) => c.id === activeDemoCustomerId) ?? customers[0];
  const myBookings = appointments.filter(
    (a) => a.customerId === customer.id || a.customerPhone === customer.phone
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Lịch sử đặt hẹn của {customer.fullName}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Bạn có thể chủ động hủy lịch đang chờ duyệt hoặc hủy trước giờ hẹn tối thiểu {settings.cancelCutoffHours} tiếng.
          </p>
        </div>

        <Link
          href="/dat-lich"
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-5 py-2 text-xs font-semibold text-[var(--btn-primary-text)]"
        >
          <CalendarPlus className="h-3.5 w-3.5" />
          Đặt lịch hẹn mới
        </Link>
      </div>

      {myBookings.length === 0 ? (
        <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-10 text-center">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            Chưa có lịch hẹn nào được ghi nhận
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Mọi đơn đặt trực tuyến hoặc đặt qua lễ tân trùng SĐT {customer.phone} sẽ hiển thị tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myBookings.map((apt) => {
            const linkedInvoice = apt.invoiceId
              ? invoices.find((i) => i.id === apt.invoiceId)
              : null;
            const canCancel = apt.status === 'PENDING' || apt.status === 'CONFIRMED';

            return (
              <article
                key={apt.id}
                className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="tabular-nums text-sm font-bold text-[var(--text-primary)]">
                      {apt.bookingCode}
                    </span>
                    <span className="tabular-nums text-xs text-[var(--text-secondary)]">
                      {apt.startTime} – {apt.endTime} · Ngày {formatVNDate(apt.appointmentDate)}
                    </span>
                  </div>
                  <BookingStatusBadge status={apt.status} />
                </div>

                <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {apt.items.map((item) => item.serviceName).join(' + ')}
                    </p>
                    <p className="tabular-nums text-xs text-[var(--text-secondary)]">
                      Số lượng: {apt.guestCount} khách · Tổng thời lượng: {apt.totalDurationMinutes} phút
                    </p>
                    {apt.customerNote && (
                      <p className="text-xs text-[var(--text-muted)]">
                        Ghi chú của bạn: “{apt.customerNote}”
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 tabular-nums">
                    {linkedInvoice && linkedInvoice.status === 'PAID' ? (
                      <div className="rounded-xl bg-[#E7F3EC] px-3.5 py-2 text-right text-xs text-[#1F5C3E]">
                        <span className="block font-semibold">
                          Thực thu: {formatVND(linkedInvoice.finalAmount)}
                        </span>
                        <span>+{linkedInvoice.pointsEarned} điểm thưởng</span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-[var(--text-primary)]">
                        Dự kiến: {formatVND(apt.estimatedAmount)}
                      </span>
                    )}

                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#D9B8B4] px-4 py-1.5 text-xs font-semibold text-[#8F2820] transition-colors hover:bg-[#FCE9E7]"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        Xin hủy lịch
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
