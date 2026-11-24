'use client';

import React from 'react';
import { ArrowDownLeft, ArrowUpRight, RotateCcw } from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import { formatVND, formatVNDate } from '@/lib/utils';

export default function PointHistoryPage() {
  const {
    customers,
    pointTransactions,
    settings,
    activeDemoCustomerId,
  } = useSpaDemo();

  const customer = customers.find((c) => c.id === activeDemoCustomerId) ?? customers[0];
  const myTransactions = pointTransactions.filter((t) => t.customerId === customer.id);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Sổ cái biến động điểm thưởng
          </h1>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Mọi giao dịch tích điểm, trừ điểm tại quầy và quà sinh nhật đều được lưu đối soát minh bạch. Điểm có hiệu lực {settings.pointsExpiryMonths} tháng kể từ ngày tích.
          </p>
        </div>

        <div className="rounded-2xl bg-[var(--bg-surface-soft)] px-4 py-3 text-right tabular-nums">
          <span className="block text-xs text-[var(--text-muted)]">Số dư khả dụng</span>
          <span className="text-xl font-bold text-[var(--text-primary)]">
            {customer.pointsBalance} điểm
          </span>
          <span className="block text-xs font-semibold text-[var(--accent-gold-text)]">
            ({formatVND(customer.pointsBalance * settings.pointRedeemValueVnd)})
          </span>
        </div>
      </div>

      {myTransactions.length === 0 ? (
        <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-10 text-center">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            Chưa phát sinh giao dịch điểm nào
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Điểm thưởng sẽ tự động xuất hiện tại đây ngay khi bạn hoàn tất thanh toán buổi hẹn đầu tiên tại quầy.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)]">
          <div className="divide-y divide-[var(--border-subtle)]">
            {myTransactions.map((tx) => {
              const isPositive = tx.pointsChange > 0;
              return (
                <div
                  key={tx.id}
                  className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        tx.type === 'REVERSAL'
                          ? 'bg-[#EFECE6] text-[#575049]'
                          : isPositive
                          ? 'bg-[#E7F3EC] text-[#1F5C3E]'
                          : 'bg-[#FEF3DC] text-[#7D4E0D]'
                      }`}
                    >
                      {tx.type === 'REVERSAL' ? (
                        <RotateCcw className="h-4 w-4" />
                      ) : isPositive ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {tx.description}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] tabular-nums">
                        <span>Ngày ghi sổ: {formatVNDate(tx.createdAt)}</span>
                        {tx.expiresAt && (
                          <span>Hết hạn: {formatVNDate(tx.expiresAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-2 sm:flex-col sm:items-end sm:border-0 sm:pt-0 tabular-nums">
                    <span
                      className={`text-base font-bold ${
                        isPositive ? 'text-[#1F5C3E]' : 'text-[#7D4E0D]'
                      }`}
                    >
                      {isPositive ? `+${tx.pointsChange}` : tx.pointsChange} điểm
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      Số dư sau GD: <strong>{tx.balanceAfter} điểm</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
