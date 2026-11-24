'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  Coins,
  MessageCircle,
  Plus,
  Search,
} from 'lucide-react';
import { Appointment, AppointmentStatus } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import {
  cn,
  formatVND,
  formatVNDate,
  minutesToTime,
  timeToMinutes,
} from '@/lib/utils';
import BookingStatusBadge from '@/components/shared/BookingStatusBadge';
import MembershipTierBadge from '@/components/shared/MembershipTierBadge';
import CheckoutLoyaltyModal from '@/components/shared/CheckoutLoyaltyModal';

const STATUS_TABS: { value: 'ALL' | AppointmentStatus; label: string }[] = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'PENDING', label: 'Chờ duyệt' },
  { value: 'CONFIRMED', label: 'Đã xác nhận' },
  { value: 'COMPLETED', label: 'Hoàn thành' },
  { value: 'CANCELLED', label: 'Đã hủy' },
];

export default function AdminBookingsPage() {
  const {
    appointments,
    settings,
    updateAppointmentStatus,
  } = useSpaDemo();

  const [statusFilter, setStatusFilter] = useState<'ALL' | AppointmentStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkoutApt, setCheckoutApt] = useState<Appointment | null>(null);
  const [retailModalOpen, setRetailModalOpen] = useState(false);
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [newTimeInput, setNewTimeInput] = useState('15:30');

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const matchStatus = statusFilter === 'ALL' || apt.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchText =
        !q ||
        apt.bookingCode.toLowerCase().includes(q) ||
        apt.customerName.toLowerCase().includes(q) ||
        apt.customerPhone.includes(q);
      return matchStatus && matchText;
    });
  }, [appointments, statusFilter, searchQuery]);

  // Tính số giường đang CONFIRMED chồng lấn với 1 lịch hẹn
  const countOverlappingConfirmedBeds = (target: Appointment): number => {
    const startA = timeToMinutes(target.startTime);
    const endA = timeToMinutes(target.endTime);
    return appointments
      .filter(
        (other) =>
          other.id !== target.id &&
          other.appointmentDate === target.appointmentDate &&
          other.status === 'CONFIRMED'
      )
      .reduce((acc, other) => {
        const startB = timeToMinutes(other.startTime);
        const endB = timeToMinutes(other.endTime);
        const overlaps = startA < endB && endA > startB;
        return overlaps ? acc + other.guestCount : acc;
      }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Điều phối Lịch hẹn &amp; Thu ngân Tích điểm
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Sức chứa tối đa: <strong>{settings.maxConcurrentBeds} giường cùng khung giờ</strong>. Hệ thống tự cảnh báo nếu lịch chờ duyệt vượt số giường trống.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRetailModalOpen(true)}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-5 py-2 text-xs font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
        >
          <Plus className="h-4 w-4" />
          Lập hóa đơn mua lẻ mỹ phẩm
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                'min-h-9 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                statusFilter === tab.value
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                  : 'bg-[var(--bg-surface-soft)] text-[var(--text-secondary)] hover:bg-[var(--bg-pill-active)]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm SĐT, tên khách, mã MDS..."
            aria-label="Tìm lịch hẹn theo SĐT hoặc mã đơn"
            className="h-10 w-full rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] pr-4 pl-9 text-xs text-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* Responsive Booking Cards */}
      <div className="space-y-4">
        {filtered.map((apt) => {
          const overlappingBeds = countOverlappingConfirmedBeds(apt);
          const exceedsBeds =
            apt.status === 'PENDING' &&
            overlappingBeds + apt.guestCount > settings.maxConcurrentBeds;

          return (
            <article
              key={apt.id}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="tabular-nums text-sm font-bold text-[var(--text-primary)]">
                    {apt.bookingCode}
                  </span>
                  <span className="tabular-nums rounded-lg bg-[var(--bg-surface-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]">
                    {apt.startTime} – {apt.endTime} · {formatVNDate(apt.appointmentDate)}
                  </span>
                  <span className="tabular-nums text-xs text-[var(--text-secondary)]">
                    ({apt.guestCount} khách / {apt.totalDurationMinutes} phút)
                  </span>
                </div>
                <BookingStatusBadge status={apt.status} />
              </div>

              {exceedsBeds && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#FEF3DC] px-3.5 py-2 text-xs font-semibold text-[#7D4E0D]">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>
                    Cảnh báo quá tải: Khung giờ này đã có {overlappingBeds}/{settings.maxConcurrentBeds} giường CONFIRMED. Gợi ý thương lượng dời giờ với khách trước khi bấm duyệt!
                  </span>
                </div>
              )}

              <div className="mt-4 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-[var(--text-primary)]">
                      {apt.customerName}
                    </span>
                    <span className="tabular-nums text-sm font-medium text-[var(--text-secondary)]">
                      · {apt.customerPhone}
                    </span>
                    <MembershipTierBadge tierCode={apt.customerTierCode} />
                  </div>

                  <p className="text-sm text-[var(--text-primary)]">
                    {apt.items.map((i) => i.serviceName).join(' + ')}
                  </p>

                  {apt.customerNote && (
                    <p className="text-xs text-[#745B2F]">
                      Ghi chú khách: “{apt.customerNote}”
                    </p>
                  )}
                  {apt.adminNote && (
                    <p className="text-xs text-[var(--text-muted)]">
                      Ghi chú nội bộ: {apt.adminNote}
                    </p>
                  )}
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-2 tabular-nums text-sm font-bold text-[var(--text-primary)]">
                    {formatVND(apt.estimatedAmount)}
                  </span>

                  {/* 1-Tap Free Zalo Confirmation Link (Fixes A-02) */}
                  <a
                    href={`https://zalo.me/${apt.customerPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#1B64D8]/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1456C2] hover:bg-[#F0F6FF]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Nhắn Zalo
                  </a>

                  {apt.status === 'PENDING' && (
                    <>
                      <button
                        type="button"
                        onClick={() => updateAppointmentStatus(apt.id, 'CONFIRMED')}
                        className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#1F5C3E] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#184A31]"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Duyệt lịch
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRescheduleId(rescheduleId === apt.id ? null : apt.id);
                          setNewTimeInput(apt.startTime);
                        }}
                        className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-strong)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-soft)]"
                      >
                        Đổi giờ
                      </button>

                      <button
                        type="button"
                        onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')}
                        className="inline-flex min-h-9 items-center rounded-full border border-[#D9B8B4] px-3.5 py-1.5 text-xs font-semibold text-[#8F2820] hover:bg-[#FCE9E7]"
                      >
                        Hủy
                      </button>
                    </>
                  )}

                  {apt.status === 'CONFIRMED' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCheckoutApt(apt)}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
                      >
                        <Coins className="h-3.5 w-3.5 opacity-90" />
                        Hoàn thành &amp; Tích điểm
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAppointmentStatus(apt.id, 'NO_SHOW')}
                        className="inline-flex min-h-9 items-center rounded-full border border-[var(--border-strong)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[#9E2A22]"
                      >
                        Khách vắng mặt
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Inline Reschedule Bar */}
              {rescheduleId === apt.id && (
                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-[var(--bg-surface-soft)] p-3">
                  <label className="text-xs font-semibold text-[var(--text-primary)]">
                    Giờ mới sau khi thống nhất với khách:
                  </label>
                  <input
                    type="time"
                    value={newTimeInput}
                    onChange={(e) => setNewTimeInput(e.target.value)}
                    className="h-9 rounded-lg border border-[var(--border-strong)] bg-white px-2.5 text-xs font-semibold tabular-nums"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const nextEnd = minutesToTime(
                        timeToMinutes(newTimeInput) + apt.totalDurationMinutes
                      );
                      updateAppointmentStatus(apt.id, 'CONFIRMED', {
                        startTime: newTimeInput,
                        endTime: nextEnd,
                        adminNote: `Đã đổi từ ${apt.startTime} sang ${newTimeInput} theo thỏa thuận với khách.`,
                      });
                      setRescheduleId(null);
                    }}
                    className="h-9 rounded-full bg-[#1F5C3E] px-4 text-xs font-semibold text-white"
                  >
                    Lưu giờ mới &amp; Duyệt luôn
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {(checkoutApt || retailModalOpen) && (
        <CheckoutLoyaltyModal
          appointment={checkoutApt}
          onClose={() => {
            setCheckoutApt(null);
            setRetailModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
