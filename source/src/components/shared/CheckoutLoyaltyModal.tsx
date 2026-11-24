'use client';

import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, Coins, Plus, X } from 'lucide-react';
import { Appointment, Customer } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import { calculateInvoiceSummary, formatVND, resolveTierBySpent } from '@/lib/utils';
import MembershipTierBadge from './MembershipTierBadge';

interface CheckoutLoyaltyModalProps {
  appointment: Appointment | null;
  preselectedCustomer?: Customer | null;
  onClose: () => void;
}

export default function CheckoutLoyaltyModal({
  appointment,
  preselectedCustomer,
  onClose,
}: CheckoutLoyaltyModalProps) {
  const {
    customers,
    products,
    tiers,
    settings,
    completeInvoiceAndAwardPoints,
  } = useSpaDemo();

  const resolvedInitialCustomer = useMemo(() => {
    if (preselectedCustomer) return preselectedCustomer;
    if (appointment?.customerId) {
      return customers.find((c) => c.id === appointment.customerId) ?? null;
    }
    if (appointment?.customerPhone) {
      return customers.find((c) => c.phone === appointment.customerPhone) ?? null;
    }
    return customers[0] ?? null;
  }, [appointment, preselectedCustomer, customers]);

  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    resolvedInitialCustomer?.id ?? customers[0]?.id ?? ''
  );

  const defaultServiceListTotal = useMemo(() => {
    if (!appointment) return 0;
    return appointment.items.reduce((s, item) => s + item.price * item.quantity, 0);
  }, [appointment]);

  const defaultServiceSaleTotal = useMemo(() => {
    if (!appointment) return 0;
    return appointment.items.reduce(
      (s, item) => s + (item.salePrice ?? item.price) * item.quantity,
      0
    );
  }, [appointment]);

  const [extraServiceAmount, setExtraServiceAmount] = useState<number>(0);
  const [retailSubtotal, setRetailSubtotal] = useState<number>(0);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
  const [adminNote, setAdminNote] = useState<string>(appointment?.adminNote ?? '');

  const customer = customers.find((c) => c.id === selectedCustomerId) ?? customers[0];
  const { currentTier } = resolveTierBySpent(customer?.totalSpent ?? 0, tiers);

  const calc = useMemo(
    () =>
      calculateInvoiceSummary({
        serviceListPriceTotal: defaultServiceListTotal + extraServiceAmount,
        serviceSalePriceTotal: defaultServiceSaleTotal + extraServiceAmount,
        retailSubtotal,
        tierDiscountPercent: currentTier.discountPercent,
        pointsToRedeem,
        availablePoints: customer?.pointsBalance ?? 0,
        pointRedeemValueVnd: settings.pointRedeemValueVnd,
        maxRedeemPercent: settings.maxRedeemPercent,
        allowRedeemOnRetail: settings.allowRedeemOnRetail,
        pointsPer100k: currentTier.pointsPer100k,
      }),
    [
      defaultServiceListTotal,
      defaultServiceSaleTotal,
      extraServiceAmount,
      retailSubtotal,
      currentTier,
      pointsToRedeem,
      customer,
      settings,
    ]
  );

  const projectedTierInfo = useMemo(
    () => resolveTierBySpent((customer?.totalSpent ?? 0) + calc.finalAmount, tiers),
    [customer, calc.finalAmount, tiers]
  );
  const willUpgradeTier = projectedTierInfo.currentTier.code !== currentTier.code;

  const handleQuickAddProduct = (price: number) => {
    setRetailSubtotal((prev) => prev + price);
  };

  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;

    completeInvoiceAndAwardPoints({
      appointmentId: appointment?.id ?? null,
      customerId: customer.id,
      serviceSubtotal: defaultServiceListTotal + extraServiceAmount,
      retailSubtotal,
      tierDiscountAmount: calc.tierDiscountAmount + calc.saleSavings,
      pointsRedeemed: calc.validPointsRedeemed,
      pointsDiscountAmount: calc.pointsDiscountAmount,
      finalAmount: calc.finalAmount,
      pointsEarned: calc.pointsEarned,
      adminNote: adminNote.trim() || undefined,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5 shadow-[var(--shadow-elevated)] sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <h2 id="checkout-modal-title" className="text-lg font-bold text-[var(--text-primary)]">
              {appointment
                ? `Chốt hóa đơn & Tích điểm — ${appointment.bookingCode}`
                : 'Lập hóa đơn bán lẻ mỹ phẩm tại quầy'}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
              Tách bạch tiền Dịch vụ (áp giảm giá hạng) và tiền Mỹ phẩm (không giảm % hạng, vẫn cộng chi tiêu).
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ thanh toán"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-surface-soft)] text-[var(--text-primary)] hover:bg-[var(--bg-pill-active)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleConfirmCheckout} className="mt-5 space-y-5">
          {/* Customer Selection & Tier Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--bg-surface-soft)] p-4">
            <div className="flex-1 min-w-[220px]">
              <label htmlFor="checkout-customer" className="block text-xs font-semibold text-[var(--text-primary)]">
                Hồ sơ khách hàng nhận điểm
              </label>
              <select
                id="checkout-customer"
                value={selectedCustomerId}
                onChange={(e) => {
                  setSelectedCustomerId(e.target.value);
                  setPointsToRedeem(0);
                }}
                className="mt-1.5 h-10 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-3 text-sm font-semibold text-[var(--text-primary)]"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.fullName} ({c.phone}) — Ví: {c.pointsBalance} điểm
                  </option>
                ))}
              </select>
            </div>

            {customer && (
              <div className="text-right">
                <MembershipTierBadge tierCode={currentTier.code} size="md" />
                <p className="mt-1 tabular-nums text-xs text-[var(--text-secondary)]">
                  Ưu đãi hạng: <strong>-{currentTier.discountPercent}% DV</strong> · Cộng{' '}
                  <strong>{currentTier.pointsPer100k}đ/100k</strong>
                </p>
              </div>
            )}
          </div>

          {/* Service & Retail Split Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="extra-service" className="block text-xs font-semibold text-[var(--text-primary)]">
                Tiền Dịch vụ phát sinh thêm (VNĐ)
              </label>
              <input
                id="extra-service"
                type="number"
                min={0}
                step={10000}
                value={extraServiceAmount || ''}
                onChange={(e) => setExtraServiceAmount(Math.max(0, Number(e.target.value)))}
                placeholder="0"
                className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
              />
              <p className="mt-1 tabular-nums text-[11px] text-[var(--text-muted)]">
                Dịch vụ đặt trước: {formatVND(defaultServiceListTotal)}
              </p>
            </div>

            <div>
              <label htmlFor="retail-amount" className="block text-xs font-semibold text-[var(--text-primary)]">
                Tiền Mỹ phẩm mua tại quầy (VNĐ)
              </label>
              <input
                id="retail-amount"
                type="number"
                min={0}
                step={10000}
                value={retailSubtotal || ''}
                onChange={(e) => setRetailSubtotal(Math.max(0, Number(e.target.value)))}
                placeholder="0"
                className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
              />
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {products.slice(0, 2).map((prd) => (
                  <button
                    key={prd.id}
                    type="button"
                    onClick={() => handleQuickAddProduct(prd.price)}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-pill-active)]"
                  >
                    <Plus className="h-3 w-3 shrink-0" />
                    {prd.name.split(' ').slice(0, 3).join(' ')} ({formatVND(prd.price)})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Redeem Points Control */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="redeem-points" className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
                <Coins className="h-4 w-4 text-[var(--accent-gold-text)]" />
                Trừ điểm thưởng trong ví khách (Tối đa {settings.maxRedeemPercent}% hóa đơn = {calc.maxRedeemablePoints} điểm)
              </label>
              <button
                type="button"
                onClick={() => setPointsToRedeem(calc.maxRedeemablePoints)}
                className="text-xs font-semibold text-[var(--accent-gold-text)] underline"
              >
                Dùng tối đa ({calc.maxRedeemablePoints} điểm)
              </button>
            </div>
            <input
              id="redeem-points"
              type="number"
              min={0}
              max={calc.maxRedeemablePoints}
              value={pointsToRedeem || ''}
              onChange={(e) => setPointsToRedeem(Math.max(0, Number(e.target.value)))}
              placeholder="Nhập số điểm khách muốn dùng..."
              className="mt-2 h-10 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-3.5 text-sm font-semibold tabular-nums"
            />
          </div>

          {/* Accounting Breakdown */}
          <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface-card)] p-4 text-sm tabular-nums space-y-2">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Tổng Dịch vụ (Giá niêm yết)</span>
              <span>{formatVND(calc.effectiveServiceBase)}</span>
            </div>
            {calc.appliedDiscountMode === 'SALE_PRICE' && (
              <div className="flex justify-between text-[#1F5C3E]">
                <span>Áp dụng giá Khuyến mãi liệu trình (có lợi hơn % hạng)</span>
                <span>-{formatVND(calc.saleSavings)}</span>
              </div>
            )}
            {calc.appliedDiscountMode === 'TIER_DISCOUNT' && (
              <div className="flex justify-between text-[#1F5C3E]">
                <span>Giảm giá đặc quyền {currentTier.name} ({currentTier.discountPercent}% trên DV)</span>
                <span>-{formatVND(calc.tierDiscountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Tổng Mỹ phẩm mua lẻ (Không áp % hạng)</span>
              <span>{formatVND(retailSubtotal)}</span>
            </div>
            {calc.validPointsRedeemed > 0 && (
              <div className="flex justify-between text-[#7D4E0D]">
                <span>Quy đổi trừ {calc.validPointsRedeemed} điểm thưởng</span>
                <span>-{formatVND(calc.pointsDiscountAmount)}</span>
              </div>
            )}

            <div className="flex items-baseline justify-between border-t border-[var(--border-subtle)] pt-3">
              <span className="font-bold text-[var(--text-primary)]">Số tiền thực thu tại quầy</span>
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                {formatVND(calc.finalAmount)}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#E7F3EC] px-3.5 py-2 text-xs font-semibold text-[#1F5C3E]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Điểm thưởng mới cộng vào sổ cái: +{calc.pointsEarned} điểm
              </span>
              {willUpgradeTier && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#2B2521] px-2.5 py-0.5 text-[#DFC084]">
                  <Award className="h-3.5 w-3.5" />
                  Thăng hạng {projectedTierInfo.currentTier.name}!
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="checkout-note" className="block text-xs font-semibold text-[var(--text-primary)]">
              Ghi chú hóa đơn nội bộ (Tùy chọn)
            </label>
            <input
              id="checkout-note"
              type="text"
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="VD: Chuyển khoản Vietcombank / Tiền mặt tại quầy..."
              className="mt-1 h-10 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] px-3 text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-full border border-[var(--border-strong)] px-5 text-xs font-semibold text-[var(--text-primary)]"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="h-11 rounded-full bg-[var(--btn-primary-bg)] px-6 text-xs font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
            >
              Xác nhận thu {formatVND(calc.finalAmount)} &amp; Ghi sổ điểm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
