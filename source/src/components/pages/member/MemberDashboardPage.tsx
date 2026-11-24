'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, CalendarCheck, CheckCircle2, Coins } from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import { TIER_VISUAL_META } from '@/lib/constants';
import { formatVND, formatVNDate, resolveTierBySpent } from '@/lib/utils';
import BookingStatusBadge from '@/components/shared/BookingStatusBadge';

export default function MemberDashboardPage() {
  const {
    customers,
    tiers,
    appointments,
    settings,
    activeDemoCustomerId,
  } = useSpaDemo();

  const customer = customers.find((c) => c.id === activeDemoCustomerId) ?? customers[0];
  const { currentTier, nextTier, remainingToNext, progressPercent } = resolveTierBySpent(
    customer.totalSpent,
    tiers
  );
  const visual = TIER_VISUAL_META[currentTier.code];

  const myAppointments = appointments.filter(
    (a) => a.customerId === customer.id || a.customerPhone === customer.phone
  );
  const nextUpcoming = myAppointments.find(
    (a) => a.status === 'PENDING' || a.status === 'CONFIRMED'
  );

  const redeemableVnd = customer.pointsBalance * settings.pointRedeemValueVnd;

  return (
    <div className="space-y-6">
      {/* Digital Membership Card */}
      <section
        aria-label="Thẻ thành viên điện tử"
        style={{
          background: visual.cardGradient,
          color: visual.cardText,
        }}
        className="relative overflow-hidden rounded-[26px] border border-[var(--border-strong)]/60 p-6 shadow-[var(--shadow-elevated)] sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p
              style={{ color: visual.cardMuted }}
              className="text-xs font-semibold tracking-[0.14em] uppercase"
            >
              Mai Đinh Spa · Loyalty Card
            </p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
              {customer.fullName}
            </h1>
            <p style={{ color: visual.cardMuted }} className="mt-0.5 tabular-nums text-sm">
              Mã định danh SĐT: {customer.phone}
            </p>
          </div>

          <div
            style={{
              borderColor: visual.accentColor,
              color: visual.accentColor,
            }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase"
          >
            <Award className="h-4 w-4" strokeWidth={1.85} />
            {currentTier.name}
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-current/10 pt-6 sm:grid-cols-3">
          <div>
            <p style={{ color: visual.cardMuted }} className="text-xs">
              Ví điểm thưởng khả dụng
            </p>
            <p className="mt-1 tabular-nums text-2xl font-bold">
              {customer.pointsBalance.toLocaleString('vi-VN')} điểm
            </p>
            <p style={{ color: visual.accentColor }} className="tabular-nums text-xs font-semibold">
              = {formatVND(redeemableVnd)} trừ trực tiếp tại quầy
            </p>
          </div>

          <div>
            <p style={{ color: visual.cardMuted }} className="text-xs">
              Tổng chi tiêu xét hạng trọn đời
            </p>
            <p className="mt-1 tabular-nums text-2xl font-bold">
              {formatVND(customer.totalSpent)}
            </p>
            <p style={{ color: visual.cardMuted }} className="text-xs">
              Không bị giảm khi bạn tiêu điểm
            </p>
          </div>

          <div>
            <p style={{ color: visual.cardMuted }} className="text-xs">
              Đặc quyền hạng hiện tại
            </p>
            <p className="mt-1 tabular-nums text-2xl font-bold">
              {currentTier.discountPercent > 0
                ? `Giảm ${currentTier.discountPercent}% DV`
                : 'Tích 1đ / 100k'}
            </p>
            <p style={{ color: visual.cardMuted }} className="tabular-nums text-xs">
              Tỷ lệ cộng: {currentTier.pointsPer100k} điểm / 100.000đ
            </p>
          </div>
        </div>
      </section>

      {/* Tier Upgrade Progress */}
      <section className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            Tiến trình nâng hạng thành viên
          </h2>
          <span className="tabular-nums text-xs font-semibold text-[var(--accent-gold-text)]">
            {nextTier
              ? `Còn ${formatVND(remainingToNext)} để lên ${nextTier.name}`
              : 'Bạn đã đạt hạng Kim Cương cao nhất'}
          </span>
        </div>

        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[var(--bg-sidebar)]">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full rounded-full bg-[var(--btn-primary-bg)] transition-all duration-300"
          />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {currentTier.benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-start gap-2.5 rounded-xl bg-[var(--bg-surface-soft)] p-3.5 text-xs leading-relaxed text-[var(--text-secondary)]"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-sage)]"
                strokeWidth={1.85}
              />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Appointment Quick View */}
      <section className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            Lịch hẹn sắp tới
          </h2>
          <Link
            href="/tai-khoan/lich-hen"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-primary)] hover:underline"
          >
            Xem tất cả ({myAppointments.length})
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {!nextUpcoming ? (
          <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-xl bg-[var(--bg-surface-soft)] p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Bạn hiện chưa có lịch hẹn nào đang chờ phục vụ
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                Đặt lịch trước để nhận ưu đãi hạng {currentTier.name} và tích điểm mới.
              </p>
            </div>
            <Link
              href="/dat-lich"
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2 text-xs font-semibold text-[#FAF7F2]"
            >
              <CalendarCheck className="h-3.5 w-3.5" />
              Đặt lịch ngay
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex flex-col justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="tabular-nums text-sm font-bold text-[var(--text-primary)]">
                  {nextUpcoming.bookingCode}
                </span>
                <BookingStatusBadge status={nextUpcoming.status} />
              </div>
              <p className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">
                {nextUpcoming.items.map((i) => i.serviceName).join(', ')}
              </p>
              <p className="mt-1 tabular-nums text-xs text-[var(--text-secondary)]">
                {nextUpcoming.startTime} – {nextUpcoming.endTime} · Ngày {formatVNDate(nextUpcoming.appointmentDate)} · {nextUpcoming.guestCount} khách
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <Link
                href="/tai-khoan/lich-su-diem"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)]"
              >
                <Coins className="h-3.5 w-3.5 text-[var(--accent-gold-text)]" />
                Sổ điểm
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
