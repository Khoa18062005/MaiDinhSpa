'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarClock,
  ExternalLink,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import { cn } from '@/lib/utils';
import BrandLogo from '@/components/shared/BrandLogo';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Tổng quan hôm nay', icon: LayoutDashboard },
  { href: '/admin/lich-hen', label: 'Duyệt lịch & Hóa đơn', icon: CalendarClock, badgePending: true },
  { href: '/admin/khach-hang', label: 'Khách hàng & Điểm', icon: Users },
  { href: '/admin/dich-vu', label: 'Quản lý Dịch vụ', icon: Sparkles },
  { href: '/admin/san-pham', label: 'Sản phẩm trưng bày', icon: Package },
  { href: '/admin/cai-dat', label: 'Cài đặt Spa & Hạng', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { appointments } = useSpaDemo();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pendingCount = appointments.filter((a) => a.status === 'PENDING').length;

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-sidebar)] px-4 py-2.5 lg:hidden">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <span className="rounded-full bg-[var(--bg-pill-active)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--text-primary)] tabular-nums">
            {pendingCount} chờ duyệt
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Mở menu quản trị"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-card)]"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          'border-r border-[var(--border-subtle)] bg-[var(--bg-sidebar)] p-5 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-68 lg:shrink-0 lg:flex-col lg:justify-between',
          mobileOpen ? 'block' : 'hidden lg:flex'
        )}
      >
        <div>
          <div className="hidden border-b border-[var(--border-subtle)] pb-5 mb-4 lg:block">
            <BrandLogo size="md" />
            <p className="mt-1.5 text-xs font-medium text-[var(--text-muted)]">
              Cổng Quản trị · Chủ Spa
            </p>
          </div>

          <nav aria-label="Điều hướng Quản trị" className="space-y-1">
            {ADMIN_LINKS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex min-h-11 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors',
                    active
                      ? 'bg-[var(--bg-surface-card)] font-semibold text-[var(--text-primary)] shadow-2xs'
                      : 'font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-surface-soft)] hover:text-[var(--text-primary)]'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.85} />
                    {item.label}
                  </span>
                  {item.badgePending && pendingCount > 0 && (
                    <span className="tabular-nums rounded-full bg-[#9E2A22] px-2 py-0.5 text-[11px] font-bold text-white">
                      {pendingCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6 border-t border-[var(--border-strong)]/60 pt-4">
          <Link
            href="/"
            className="flex min-h-10 items-center justify-between rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-soft)]"
          >
            <span>Xem trang Khách hàng</span>
            <ExternalLink className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          </Link>
        </div>
      </aside>
    </>
  );
}
