'use client';

import React, { useMemo, useState } from 'react';
import { CheckCircle2, Gift, Receipt, Search, ShieldCheck } from 'lucide-react';
import { Customer } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import { formatVND } from '@/lib/utils';
import MembershipTierBadge from '@/components/shared/MembershipTierBadge';
import CheckoutLoyaltyModal from '@/components/shared/CheckoutLoyaltyModal';

export default function AdminCustomersPage() {
  const {
    customers,
    updateCustomerSkinNotes,
    adjustCustomerPoints,
    verifyCustomerPhone,
  } = useSpaDemo();

  const [query, setQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [adjustingCustomerId, setAdjustingCustomerId] = useState<string | null>(null);
  const [pointsDelta, setPointsDelta] = useState<number>(50);
  const [adjustReason, setAdjustReason] = useState('Tặng điểm ưu đãi sinh nhật khách thân thiết');
  const [retailCustomer, setRetailCustomer] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) => c.fullName.toLowerCase().includes(q) || c.phone.includes(q)
    );
  }, [customers, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Hồ sơ Khách hàng &amp; Quản lý Sổ điểm
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Tra cứu nhanh bằng Số điện thoại tại quầy. Ghi chú tình trạng da chỉ lưu nội bộ cho Chủ Spa.
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập SĐT hoặc tên khách hàng..."
            aria-label="Tìm khách hàng theo SĐT hoặc tên"
            className="h-11 w-full rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] pr-4 pl-10 text-sm text-[var(--text-primary)]"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((cus) => (
          <article
            key={cus.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    {cus.fullName}
                  </h2>
                  <span className="tabular-nums text-sm font-semibold text-[var(--text-secondary)]">
                    · {cus.phone}
                  </span>
                  <MembershipTierBadge tierCode={cus.tierCode} />
                  {cus.phoneVerifyStatus === 'VERIFIED' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F3EC] px-2.5 py-0.5 text-[11px] font-semibold text-[#1F5C3E]">
                      <CheckCircle2 className="h-3 w-3" />
                      Đã xác minh SĐT
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => verifyCustomerPhone(cus.id)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#FEF3DC] px-2.5 py-0.5 text-[11px] font-semibold text-[#7D4E0D] hover:bg-[#FBE7BF]"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      Bấm xác nhận SĐT tại quầy
                    </button>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-4 tabular-nums text-xs text-[var(--text-secondary)]">
                  <span>
                    Tổng chi tiêu xét hạng: <strong className="text-[var(--text-primary)]">{formatVND(cus.totalSpent)}</strong>
                  </span>
                  <span>
                    Ví điểm khả dụng: <strong className="text-[var(--accent-gold-text)]">{cus.pointsBalance} điểm</strong>
                  </span>
                  {cus.noShowCount > 0 && (
                    <span className="text-[#9E2A22]">
                      Vắng mặt (No-show): {cus.noShowCount} lần
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRetailCustomer(cus)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[var(--btn-primary-bg)] px-4 py-1.5 text-xs font-semibold text-[var(--btn-primary-text)]"
                >
                  <Receipt className="h-3.5 w-3.5 text-[#DFC084]" />
                  Thu tiền mua lẻ
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAdjustingCustomerId(adjustingCustomerId === cus.id ? null : cus.id);
                  }}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--border-strong)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-soft)]"
                >
                  <Gift className="h-3.5 w-3.5 text-[var(--accent-gold-text)]" />
                  Tặng / Điều chỉnh điểm
                </button>
              </div>
            </div>

            {/* Confidential Skin & Care Notes (Admin Only) */}
            <div className="mt-4 rounded-xl bg-[var(--bg-surface-soft)] p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  Ghi chú chuyên môn nền da &amp; sở thích (Bảo mật nội bộ Admin):
                </span>
                {editingNotesId !== cus.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNotesId(cus.id);
                      setNotesDraft(cus.skinNotes ?? '');
                    }}
                    className="text-xs font-semibold text-[var(--accent-gold-text)] underline"
                  >
                    Cập nhật ghi chú
                  </button>
                )}
              </div>

              {editingNotesId === cus.id ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    rows={2}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-strong)] bg-white p-2.5 text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingNotesId(null)}
                      className="rounded-lg px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateCustomerSkinNotes(cus.id, notesDraft);
                        setEditingNotesId(null);
                      }}
                      className="rounded-lg bg-[var(--text-primary)] px-3.5 py-1 text-xs font-semibold text-[#FAF7F2]"
                    >
                      Lưu hồ sơ da
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {cus.skinNotes || 'Chưa có ghi chú nền da.'}
                </p>
              )}
            </div>

            {/* Manual Points Adjustment Drawer */}
            {adjustingCustomerId === cus.id && (
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border-strong)] bg-white p-3.5">
                <input
                  type="number"
                  value={pointsDelta}
                  onChange={(e) => setPointsDelta(Number(e.target.value))}
                  aria-label="Số điểm cộng hoặc trừ"
                  className="h-9 w-28 rounded-lg border border-[var(--border-strong)] px-3 text-xs font-bold tabular-nums"
                />
                <input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="Lý do điều chỉnh sổ điểm..."
                  className="h-9 flex-1 min-w-[200px] rounded-lg border border-[var(--border-strong)] px-3 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    adjustCustomerPoints(cus.id, pointsDelta, adjustReason);
                    setAdjustingCustomerId(null);
                  }}
                  className="h-9 rounded-full bg-[#1F5C3E] px-4 text-xs font-semibold text-white"
                >
                  Ghi bút toán điểm
                </button>
              </div>
            )}
          </article>
        ))}
      </div>

      {retailCustomer && (
        <CheckoutLoyaltyModal
          appointment={null}
          preselectedCustomer={retailCustomer}
          onClose={() => setRetailCustomer(null)}
        />
      )}
    </div>
  );
}
