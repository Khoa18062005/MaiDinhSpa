'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import MembershipTierBadge from '@/components/shared/MembershipTierBadge';
import { formatVND } from '@/lib/utils';

export default function AdminSettingsPage() {
  const { settings, tiers, updateSettings, updateTiers } = useSpaDemo();

  const [openTime, setOpenTime] = useState(settings.openTime);
  const [closeTime, setCloseTime] = useState(settings.closeTime);
  const [maxBeds, setMaxBeds] = useState(settings.maxConcurrentBeds);
  const [cancelCutoff, setCancelCutoff] = useState(settings.cancelCutoffHours);
  const [redeemValue, setRedeemValue] = useState(settings.pointRedeemValueVnd);
  const [maxRedeemPct, setMaxRedeemPct] = useState(settings.maxRedeemPercent);
  const [localTiers, setLocalTiers] = useState(tiers);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      openTime,
      closeTime,
      maxConcurrentBeds: maxBeds,
      cancelCutoffHours: cancelCutoff,
      pointRedeemValueVnd: redeemValue,
      maxRedeemPercent: maxRedeemPct,
    });
    updateTiers(localTiers);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Cài đặt Sức chứa &amp; Công thức Hạng Thành viên
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Mọi thay đổi được áp dụng tức thì sang màn hình Đặt lịch và Thu ngân tại quầy.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-6 py-2 text-xs font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
        >
          Lưu toàn bộ cấu hình
        </button>
      </div>

      {savedNotice && (
        <div className="flex items-center gap-2 rounded-xl bg-[#E7F3EC] px-4 py-3 text-xs font-semibold text-[#1F5C3E]">
          <CheckCircle2 className="h-4 w-4" />
          Đã lưu cấu hình vận hành và bảng tỷ lệ tích điểm thành công!
        </div>
      )}

      {/* Operating Hours & Bed Capacity */}
      <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          1. Giờ đón khách &amp; Sức chứa giường đồng thời
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="cfg-open" className="block text-xs font-semibold text-[var(--text-primary)]">
              Giờ mở cửa
            </label>
            <input
              id="cfg-open"
              type="time"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
            />
          </div>

          <div>
            <label htmlFor="cfg-close" className="block text-xs font-semibold text-[var(--text-primary)]">
              Giờ đóng cửa
            </label>
            <input
              id="cfg-close"
              type="time"
              value={closeTime}
              onChange={(e) => setCloseTime(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
            />
          </div>

          <div>
            <label htmlFor="cfg-beds" className="block text-xs font-semibold text-[var(--text-primary)]">
              Số giường tối đa nhận cùng lúc
            </label>
            <input
              id="cfg-beds"
              type="number"
              min={1}
              max={20}
              value={maxBeds}
              onChange={(e) => setMaxBeds(Number(e.target.value))}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
            />
          </div>

          <div>
            <label htmlFor="cfg-cutoff" className="block text-xs font-semibold text-[var(--text-primary)]">
              Hạn chót tự hủy lịch (tiếng)
            </label>
            <input
              id="cfg-cutoff"
              type="number"
              min={1}
              max={48}
              value={cancelCutoff}
              onChange={(e) => setCancelCutoff(Number(e.target.value))}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
            />
          </div>
        </div>
      </section>

      {/* Loyalty Rules & 4 Tiers */}
      <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          2. Quy tắc tiêu điểm &amp; Bảng 4 Hạng Thành viên
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cfg-point-val" className="block text-xs font-semibold text-[var(--text-primary)]">
              Giá trị quy đổi 1 điểm thưởng (VNĐ)
            </label>
            <input
              id="cfg-point-val"
              type="number"
              min={100}
              step={100}
              value={redeemValue}
              onChange={(e) => setRedeemValue(Number(e.target.value))}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
            />
          </div>

          <div>
            <label htmlFor="cfg-redeem-cap" className="block text-xs font-semibold text-[var(--text-primary)]">
              Trần trừ điểm tối đa trên 1 hóa đơn (%)
            </label>
            <input
              id="cfg-redeem-cap"
              type="number"
              min={10}
              max={100}
              value={maxRedeemPct}
              onChange={(e) => setMaxRedeemPct(Number(e.target.value))}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 text-sm font-semibold tabular-nums"
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm tabular-nums">
            <thead>
              <tr className="border-b border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                <th className="pb-3 font-semibold">Hạng thành viên</th>
                <th className="pb-3 font-semibold">Mốc tổng chi tiêu (VNĐ)</th>
                <th className="pb-3 font-semibold">Điểm cộng / 100.000đ</th>
                <th className="pb-3 font-semibold">% Giảm giá Dịch vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)]">
              {localTiers.map((tier, idx) => (
                <tr key={tier.id}>
                  <td className="py-3.5">
                    <MembershipTierBadge tierCode={tier.code} size="md" />
                  </td>
                  <td className="py-3.5">
                    <input
                      type="number"
                      min={0}
                      step={500000}
                      disabled={tier.code === 'MEMBER'}
                      value={tier.minSpent}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLocalTiers((prev) =>
                          prev.map((t, i) => (i === idx ? { ...t, minSpent: val } : t))
                        );
                      }}
                      aria-label={`Mốc chi tiêu ${tier.name}`}
                      className="h-9 w-36 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3 text-xs font-semibold disabled:opacity-60"
                    />
                    <span className="ml-2 text-xs text-[var(--text-muted)]">
                      ({formatVND(tier.minSpent)})
                    </span>
                  </td>
                  <td className="py-3.5">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={tier.pointsPer100k}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLocalTiers((prev) =>
                          prev.map((t, i) => (i === idx ? { ...t, pointsPer100k: val } : t))
                        );
                      }}
                      aria-label={`Hệ số điểm ${tier.name}`}
                      className="h-9 w-20 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3 text-xs font-semibold"
                    />
                  </td>
                  <td className="py-3.5">
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={tier.discountPercent}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLocalTiers((prev) =>
                          prev.map((t, i) => (i === idx ? { ...t, discountPercent: val } : t))
                        );
                      }}
                      aria-label={`Phần trăm giảm giá ${tier.name}`}
                      className="h-9 w-20 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3 text-xs font-semibold"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </form>
  );
}
