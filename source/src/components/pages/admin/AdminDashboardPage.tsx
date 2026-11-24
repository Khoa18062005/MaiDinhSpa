'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Receipt,
  RotateCcw,
  Users,
} from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import { DEMO_TODAY } from '@/lib/data/mock-db';
import { formatVND, formatVNDate } from '@/lib/utils';
import BookingStatusBadge from '@/components/shared/BookingStatusBadge';
import MembershipTierBadge from '@/components/shared/MembershipTierBadge';

export default function AdminDashboardPage() {
  const {
    appointments,
    invoices,
    customers,
    updateAppointmentStatus,
    voidInvoice,
  } = useSpaDemo();

  const [voidingId, setVoidingId] = useState<string | null>(null);
  const [voidReason, setVoidReason] = useState('Nhập nhầm số tiền thực thu tại quầy');

  const pendingAppointments = appointments.filter((a) => a.status === 'PENDING');
  const todayConfirmed = appointments.filter(
    (a) => a.appointmentDate === DEMO_TODAY && a.status === 'CONFIRMED'
  );
  const paidRevenue = invoices
    .filter((i) => i.status === 'PAID')
    .reduce((sum, i) => sum + i.finalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            Bảng điều hành Mai Đinh Spa
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
             Lịch vận hành ngày {formatVNDate(DEMO_TODAY)} · Kiểm duyệt lịch hẹn mới và đối soát sổ cái hóa đơn.
          </p>
        </div>

        <Link
          href="/admin/lich-hen"
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-5 py-2 text-xs font-semibold text-[var(--btn-primary-text)]"
        >
          Mở lịch điều phối đầy đủ
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 4 Operational KPI Tiles */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#7D4E0D]">
            <span>Đơn chờ Chủ Spa duyệt</span>
            <Clock className="h-4 w-4" />
          </div>
          <p className="mt-2 tabular-nums text-3xl font-bold text-[var(--text-primary)]">
            {pendingAppointments.length}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Cần phản hồi trong 30 phút</p>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1F5C3E]">
            <span>Khách xác nhận hôm nay</span>
            <CalendarCheck className="h-4 w-4" />
          </div>
          <p className="mt-2 tabular-nums text-3xl font-bold text-[var(--text-primary)]">
            {todayConfirmed.length}
          </p>
          <p className="mt-1 tabular-nums text-xs text-[var(--text-muted)]">
            Tổng {todayConfirmed.reduce((s, a) => s + a.guestCount, 0)} khách ghé cơ sở
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--accent-gold-text)]">
            <span>Doanh thu hóa đơn thực thu</span>
            <Receipt className="h-4 w-4" />
          </div>
          <p className="mt-2 tabular-nums text-2xl font-bold text-[var(--text-primary)]">
            {formatVND(paidRevenue)}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Từ {invoices.filter((i) => i.status === 'PAID').length} hóa đơn hợp lệ
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
            <span>Hồ sơ khách hàng</span>
            <Users className="h-4 w-4" />
          </div>
          <p className="mt-2 tabular-nums text-3xl font-bold text-[var(--text-primary)]">
            {customers.length}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Định danh theo Số điện thoại</p>
        </div>
      </div>

      {/* Fast 1-Tap Pending Queue */}
      <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            Hàng đợi cần duyệt ngay ({pendingAppointments.length})
          </h2>
          <Link href="/admin/lich-hen" className="text-xs font-semibold text-[var(--accent-gold-text)] hover:underline">
            Quản lý toàn bộ lịch hẹn
          </Link>
        </div>

        {pendingAppointments.length === 0 ? (
          <p className="mt-4 rounded-xl bg-[var(--bg-surface-soft)] p-5 text-sm text-[var(--text-secondary)]">
            Tuyệt vời! Toàn bộ yêu cầu đặt lịch mới đều đã được Chủ Spa xử lý hết.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {pendingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-col justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tabular-nums text-sm font-bold text-[var(--text-primary)]">
                      {apt.bookingCode}
                    </span>
                    <span className="font-semibold text-sm text-[var(--text-primary)]">
                      {apt.customerName} ({apt.customerPhone})
                    </span>
                    <MembershipTierBadge tierCode={apt.customerTierCode} />
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {apt.items.map((i) => i.serviceName).join(' + ')}
                  </p>
                  <p className="mt-1 tabular-nums text-xs font-medium text-[var(--accent-gold-text)]">
                    Hẹn lúc {apt.startTime} – {apt.endTime} · Ngày {formatVNDate(apt.appointmentDate)} · {apt.guestCount} khách
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => updateAppointmentStatus(apt.id, 'CONFIRMED')}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#1F5C3E] px-4 py-2 text-xs font-semibold text-white hover:bg-[#184A31]"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Duyệt giữ lịch
                  </button>
                  <button
                    type="button"
                    onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')}
                    className="inline-flex min-h-10 items-center rounded-full border border-[var(--border-strong)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#9E2A22]"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Invoices & VOID Reversal Ledger (Fixes B-03) */}
      <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          Hóa đơn thu ngân gần đây &amp; Đối soát hủy hóa đơn (VOID)
        </h2>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">
          Nếu lễ tân nhập sai số tiền sau khi bấm Hoàn thành, bấm <strong>Hủy &amp; Đảo điểm</strong> để hệ thống tự động trừ ngược chi tiêu và ghi bút toán đảo vào sổ cái.
        </p>

        {/* Mobile Stacked Cards (iPhone 16/17 Pro Max friendly) */}
        <div className="mt-4 space-y-3 md:hidden">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-4 tabular-nums"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  {inv.invoiceCode}
                </span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    inv.status === 'PAID'
                      ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                      : 'bg-[#EFECE6] text-[#575049] line-through'
                  }`}
                >
                  {inv.status === 'PAID' ? 'Đã thu tiền' : 'Đã hủy (VOID)'}
                </span>
              </div>

              <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
                {inv.customerName} · <span className="font-normal text-[var(--text-secondary)]">{inv.customerPhone}</span>
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                DV: {formatVND(inv.serviceSubtotal)} · MP: {formatVND(inv.retailSubtotal)}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                <div>
                  <span className="block text-base font-bold text-[var(--text-primary)]">
                    {formatVND(inv.finalAmount)}
                  </span>
                  <span className="text-xs font-semibold text-[#1F5C3E]">
                    +{inv.pointsEarned} điểm
                  </span>
                  {inv.pointsRedeemed > 0 && (
                    <span className="ml-1.5 text-xs text-[#7D4E0D]">(-{inv.pointsRedeemed}đ)</span>
                  )}
                </div>

                {inv.status === 'PAID' &&
                  (voidingId === inv.id ? (
                    <button
                      type="button"
                      onClick={() => {
                        voidInvoice(inv.id, voidReason);
                        setVoidingId(null);
                      }}
                      className="min-h-10 rounded-full bg-[#9E2A22] px-4 py-2 text-xs font-semibold text-white"
                    >
                      Xác nhận đảo
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setVoidingId(inv.id)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)]"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Hủy / Đảo điểm
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="mt-4 hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm tabular-nums">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                <th className="pb-3 font-semibold">Mã HĐ</th>
                <th className="pb-3 font-semibold">Khách hàng</th>
                <th className="pb-3 font-semibold">Dịch vụ / Mỹ phẩm</th>
                <th className="pb-3 font-semibold">Thực thu</th>
                <th className="pb-3 font-semibold">Điểm</th>
                <th className="pb-3 font-semibold">Trạng thái</th>
                <th className="pb-3 text-right font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="align-middle">
                  <td className="py-3.5 font-semibold text-[var(--text-primary)]">
                    {inv.invoiceCode}
                  </td>
                  <td className="py-3.5">
                    <span className="block font-medium text-[var(--text-primary)]">
                      {inv.customerName}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{inv.customerPhone}</span>
                  </td>
                  <td className="py-3.5 text-xs text-[var(--text-secondary)]">
                    DV: {formatVND(inv.serviceSubtotal)} · MP: {formatVND(inv.retailSubtotal)}
                  </td>
                  <td className="py-3.5 font-bold text-[var(--text-primary)]">
                    {formatVND(inv.finalAmount)}
                  </td>
                  <td className="py-3.5 text-xs">
                    <span className="text-[#1F5C3E] font-semibold">+{inv.pointsEarned}đ</span>
                    {inv.pointsRedeemed > 0 && (
                      <span className="ml-1.5 text-[#7D4E0D]">(-{inv.pointsRedeemed}đ)</span>
                    )}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        inv.status === 'PAID'
                          ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                          : 'bg-[#EFECE6] text-[#575049] line-through'
                      }`}
                    >
                      {inv.status === 'PAID' ? 'Đã thu tiền' : 'Đã hủy (VOID)'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    {inv.status === 'PAID' && (
                      voidingId === inv.id ? (
                        <div className="inline-flex items-center gap-2">
                          <input
                            type="text"
                            value={voidReason}
                            onChange={(e) => setVoidReason(e.target.value)}
                            aria-label="Lý do hủy hóa đơn"
                            className="h-8 w-44 rounded-lg border border-[var(--border-strong)] px-2 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              voidInvoice(inv.id, voidReason);
                              setVoidingId(null);
                            }}
                            className="rounded-lg bg-[#9E2A22] px-2.5 py-1.5 text-xs font-semibold text-white"
                          >
                            Xác nhận đảo
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setVoidingId(inv.id)}
                          className="inline-flex items-center gap-1 rounded-full border border-[var(--border-strong)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#9E2A22]"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Hủy / Đảo điểm
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
