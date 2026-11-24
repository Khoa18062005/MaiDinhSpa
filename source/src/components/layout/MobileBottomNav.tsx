'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Award, CalendarCheck, Home, MessageCircle, Sparkles } from 'lucide-react';
import { SpaSettings } from '@/types';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
  settings: SpaSettings;
}

export default function MobileBottomNav({ settings }: MobileBottomNavProps) {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isServices = pathname.startsWith('/dich-vu') || pathname.startsWith('/san-pham');
  const isBooking = pathname.startsWith('/dat-lich');
  const isMember = pathname.startsWith('/tai-khoan') || pathname.startsWith('/dang-nhap');

  return (
    <nav
      aria-label="Điều hướng nhanh dưới đáy trên di động"
      className="fixed inset-x-3 bottom-[max(0.65rem,env(safe-area-inset-bottom))] z-40 rounded-[24px] border border-[var(--border-strong)] bg-[var(--bg-surface-card)]/96 px-2 py-1.5 shadow-[var(--shadow-elevated)] backdrop-blur-md lg:hidden"
    >
      <div className="grid grid-cols-5 items-center gap-1">
        <Link
          href="/"
          className={cn(
            'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[11px] font-semibold transition-colors active:scale-95',
            isHome
              ? 'bg-[var(--bg-pill-active)] text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)]'
          )}
        >
          <Home className="h-4 w-4 shrink-0" strokeWidth={1.85} />
          <span className="truncate">Trang chủ</span>
        </Link>

        <Link
          href="/dich-vu"
          className={cn(
            'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[11px] font-semibold transition-colors active:scale-95',
            isServices
              ? 'bg-[var(--bg-pill-active)] text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)]'
          )}
        >
          <Sparkles className="h-4 w-4 shrink-0" strokeWidth={1.85} />
          <span className="truncate">Dịch vụ</span>
        </Link>

        <Link
          href="/dat-lich"
          className={cn(
            'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[11px] font-bold shadow-xs transition-transform active:scale-95',
            isBooking
              ? 'bg-[var(--btn-primary-hover)] text-[var(--btn-primary-text)] ring-2 ring-[var(--accent-gold)]'
              : 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
          )}
        >
          <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2} />
          <span className="truncate">Đặt lịch</span>
        </Link>

        <Link
          href="/tai-khoan"
          className={cn(
            'flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[11px] font-semibold transition-colors active:scale-95',
            isMember
              ? 'bg-[var(--bg-pill-active)] text-[var(--text-primary)]'
              : 'text-[var(--text-secondary)]'
          )}
        >
          <Award className="h-4 w-4 shrink-0" strokeWidth={1.85} />
          <span className="truncate">Thẻ điểm</span>
        </Link>

        <a
          href={settings.zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 text-[11px] font-semibold text-[#1456C2] transition-colors active:scale-95"
        >
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.85} />
          <span className="truncate">Chat Zalo</span>
        </a>
      </div>
    </nav>
  );
}
