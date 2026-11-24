'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, CalendarCheck, Menu, ShieldCheck, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'TRANG CHỦ' },
  { href: '/#khong-gian', label: 'GIỚI THIỆU' },
  { href: '/dich-vu', label: 'DỊCH VỤ' },
  { href: '/san-pham', label: 'SẢN PHẨM' },
  { href: '/dat-lich', label: 'ĐẶT LỊCH' },
  { href: '/tra-cuu-lich', label: 'TRA CỨU' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 w-full max-w-7xl px-3 sm:px-6 lg:px-8">
      <nav
        aria-label="Điều hướng chính Mai Đinh Spa"
        className="flex items-center justify-between gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-card)]/96 px-3.5 py-2 shadow-[var(--shadow-ambient)] backdrop-blur-xs lg:px-5"
      >
        {/* Far-Left Brand Emblem */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 rounded-full pr-2 pl-1 py-1 focus-visible:outline-offset-4"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] font-serif-display text-base font-semibold text-[var(--accent-gold-text)] sm:h-10 sm:w-10"
          >
            MĐ
          </span>
          <div className="leading-tight">
            <span className="block whitespace-nowrap font-serif-display text-base font-semibold tracking-tight text-[var(--text-primary)] sm:text-lg">
              Mai Đinh Spa
            </span>
            <span className="hidden whitespace-nowrap text-[10px] font-medium tracking-[0.12em] text-[var(--accent-gold-text)] uppercase xl:block">
              Botanical Sanctuary
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden items-center gap-0.5 xl:gap-1 lg:flex">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold tracking-[0.06em] transition-colors',
                  active
                    ? 'bg-[var(--bg-pill-active)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-soft)] hover:text-[var(--text-primary)]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Far-Right Actions (Desktop) */}
        <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
          <Link
            href="/tai-khoan"
            className={cn(
              'inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
              pathname.startsWith('/tai-khoan')
                ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                : 'border-[var(--border-strong)] bg-[var(--bg-surface-soft)] text-[var(--text-primary)] hover:bg-[var(--bg-pill-active)]'
            )}
          >
            <Award className="h-3.5 w-3.5 shrink-0 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
            Thành viên
          </Link>

          <Link
            href="/admin"
            title="Cổng quản trị Chủ Mai Đinh Spa"
            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface-soft)] hover:text-[var(--text-primary)]"
          >
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            Quản trị
          </Link>
        </div>

        {/* Mobile Quick CTA + Menu Trigger */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href="/dat-lich"
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--btn-primary-bg)] px-3.5 py-2 text-xs font-semibold text-[var(--btn-primary-text)]"
          >
            <CalendarCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            Đặt lịch
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] text-[var(--text-primary)]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Panel */}
      {mobileOpen && (
        <div className="mt-2 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-4 shadow-[var(--shadow-elevated)] lg:hidden">
          <div className="grid gap-1">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex min-h-11 items-center rounded-xl px-4 py-2.5 text-sm font-semibold',
                    active
                      ? 'bg-[var(--bg-pill-active)] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-soft)]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3">
            <Link
              href="/tai-khoan"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-xs font-semibold text-[var(--text-primary)]"
            >
              <Award className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
              Thẻ Thành viên
            </Link>
            <Link
              href="/dang-nhap"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 text-xs font-semibold text-[var(--text-secondary)]"
            >
              <User className="h-4 w-4" strokeWidth={1.75} />
              Đăng nhập
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="col-span-2 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#EFE9DF] px-4 text-xs font-semibold text-[var(--text-primary)]"
            >
              <ShieldCheck className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
              Mở Cổng Quản trị Chủ Mai Đinh Spa (Demo)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
