'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, CalendarDays, Coins, LogOut, UserCheck } from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import { cn } from '@/lib/utils';
import MembershipTierBadge from '@/components/shared/MembershipTierBadge';

const MEMBER_NAV = [
  { href: '/tai-khoan', label: 'Thẻ thành viên & Hạng', icon: Award },
  { href: '/tai-khoan/lich-hen', label: 'Lịch hẹn của tôi', icon: CalendarDays },
  { href: '/tai-khoan/lich-su-diem', label: 'Sổ cái lịch sử điểm', icon: Coins },
];

export default function MemberSidebar() {
  const pathname = usePathname();
  const { customers, activeDemoCustomerId, setActiveDemoCustomerId } = useSpaDemo();
  const current = customers.find((c) => c.id === activeDemoCustomerId) ?? customers[0];

  return (
    <aside className="space-y-4">
      <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-sidebar)] p-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-base font-semibold text-[var(--text-primary)]">
              {current.fullName}
            </p>
            <p className="tabular-nums text-xs text-[var(--text-secondary)]">
              SĐT: {current.phone}
            </p>
          </div>
          <MembershipTierBadge tierCode={current.tierCode} />
        </div>

        <nav aria-label="Menu Thành viên" className="mt-5 space-y-1">
          {MEMBER_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-[var(--bg-surface-card)] font-semibold text-[var(--text-primary)] shadow-2xs'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-soft)] hover:text-[var(--text-primary)]'
                )}
              >
                <Icon className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 border-t border-[var(--border-strong)]/50 pt-4">
          <Link
            href="/dang-nhap"
            className="flex min-h-10 items-center gap-2.5 rounded-xl px-3.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
            Đăng xuất tài khoản
          </Link>
        </div>
      </div>

      {/* Interactive Demo Profile Switcher */}
      <div className="rounded-[20px] border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface-card)] p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-gold-text)]">
          <UserCheck className="h-4 w-4" strokeWidth={1.75} />
          Chuyển nhanh Hạng mẫu (Demo UI)
        </div>
        <p className="mt-1 text-[11px] text-[var(--text-muted)]">
          Chọn thử các khách hàng khác nhau để xem màu Thẻ điện tử &amp; tiến trình xét hạng:
        </p>
        <select
          aria-label="Chọn khách hàng thành viên mẫu"
          value={current.id}
          onChange={(e) => setActiveDemoCustomerId(e.target.value)}
          className="mt-2.5 h-10 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3 text-xs font-semibold text-[var(--text-primary)]"
        >
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.fullName} — {c.tierCode} ({c.pointsBalance} điểm)
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
