'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, Palette, SlidersHorizontal, X } from 'lucide-react';
import { SPA_PALETTES, SpaThemeId } from '@/lib/palettes';
import { cn } from '@/lib/utils';

const STORAGE_THEME_KEY = 'mds-active-theme';
const STORAGE_AMOUNT_KEY = 'mds-color-amount';

export default function ThemePaletteSwitcher() {
  const pathname = usePathname();
  const hasMobileBottomNav =
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/dang-nhap') &&
    !pathname.startsWith('/dang-ky') &&
    !pathname.startsWith('/cap-nhat-sdt');

  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<SpaThemeId>('alabaster-espresso');
  const [colorAmount, setColorAmount] = useState<number>(0.65);

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) as SpaThemeId | null;
    const savedAmount = localStorage.getItem(STORAGE_AMOUNT_KEY);

    if (savedTheme && SPA_PALETTES.some((p) => p.id === savedTheme)) {
      setActiveTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'alabaster-espresso');
    }

    if (savedAmount) {
      const parsed = Number(savedAmount);
      if (!Number.isNaN(parsed)) {
        setColorAmount(parsed);
        document.documentElement.style.setProperty('--p-color-amount', String(parsed));
      }
    }
  }, []);

  const handleSelectTheme = (id: SpaThemeId) => {
    setActiveTheme(id);
    document.documentElement.setAttribute('data-theme', id);
    localStorage.setItem(STORAGE_THEME_KEY, id);
  };

  const handleAmountChange = (val: number) => {
    setColorAmount(val);
    document.documentElement.style.setProperty('--p-color-amount', String(val));
    localStorage.setItem(STORAGE_AMOUNT_KEY, String(val));
  };

  const currentMeta =
    SPA_PALETTES.find((p) => p.id === activeTheme) ?? SPA_PALETTES[0];

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Bộ chọn 6 bảng màu thương hiệu Mai Đinh Spa"
          className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 rounded-[24px] border border-[var(--border-strong)] bg-[var(--bg-surface-card)] p-4 shadow-[var(--shadow-elevated)] sm:inset-x-auto sm:left-4 sm:w-[380px] sm:p-5 lg:bottom-18"
        >
          <div className="flex items-start justify-between gap-2 border-b border-[var(--border-subtle)] pb-3.5">
            <div>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">
                Thử nghiệm Bảng màu Thương hiệu (6)
              </h2>
              <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                Chạm để đổi tức thì toàn bộ giao diện · Chuẩn tương phản AA
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng bảng chọn màu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-surface-soft)] text-[var(--text-primary)] hover:bg-[var(--bg-pill-active)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* 6 Palette Cards */}
          <div className="mt-3 max-h-[46vh] space-y-2 overflow-y-auto pr-1 sm:max-h-[340px]">
            {SPA_PALETTES.map((palette) => {
              const selected = palette.id === activeTheme;
              return (
                <button
                  key={palette.id}
                  type="button"
                  onClick={() => handleSelectTheme(palette.id)}
                  aria-pressed={selected}
                  className={cn(
                    'flex min-h-14 w-full items-start justify-between gap-3 rounded-[16px] border p-3 text-left transition-all active:scale-[0.99]',
                    selected
                      ? 'border-[var(--accent-gold-text)] bg-[var(--bg-surface-soft)] ring-1 ring-[var(--accent-gold-text)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface-card)] hover:bg-[var(--bg-surface-soft)]'
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-bold text-[var(--text-primary)]">
                        {palette.name}
                      </span>
                      <span className="shrink-0 rounded-full bg-[var(--bg-pill-active)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-secondary)]">
                        {palette.badge}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[var(--text-secondary)]">
                      {palette.description}
                    </p>
                  </div>

                  {/* 4-Swatch Strip + Active Check */}
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <div className="flex -space-x-1.5">
                      <span
                        style={{ backgroundColor: palette.swatches.canvas }}
                        className="h-5 w-5 rounded-full border border-black/15"
                        title={`Nền: ${palette.swatches.canvas}`}
                      />
                      <span
                        style={{ backgroundColor: palette.swatches.surface }}
                        className="h-5 w-5 rounded-full border border-black/15"
                        title={`Thẻ: ${palette.swatches.surface}`}
                      />
                      <span
                        style={{ backgroundColor: palette.swatches.action }}
                        className="h-5 w-5 rounded-full border border-black/15"
                        title={`Nút chính: ${palette.swatches.action}`}
                      />
                      <span
                        style={{ backgroundColor: palette.swatches.accent }}
                        className="h-5 w-5 rounded-full border border-black/15"
                        title={`Điểm nhấn: ${palette.swatches.accent}`}
                      />
                    </div>
                    {selected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--accent-gold-text)]">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                        Đang chọn
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Color Dosage / Tint Intensity Slider */}
          <div className="mt-3.5 border-t border-[var(--border-subtle)] pt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-primary)]">
              <span className="inline-flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--accent-gold-text)]" />
                Độ đậm sắc nền ({Math.round(colorAmount * 100)}%)
              </span>
              <span className="text-[var(--text-muted)]">Dịu nhẹ ↔ Đậm chất</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={colorAmount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              aria-label="Điều chỉnh độ đậm sắc màu nền"
              className="mt-2.5 h-2 w-full cursor-pointer accent-[var(--btn-primary-bg)]"
            />
          </div>
        </div>
      )}

      {/* Trigger Pill — Above thumb bar on public/member pages, bottom-right on admin/auth mobile, bottom-left on desktop */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Đổi bảng màu giao diện"
        className={cn(
          'fixed right-3.5 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-[var(--shadow-elevated)] transition-transform active:scale-95 lg:right-auto lg:bottom-4 lg:left-4 lg:px-4',
          hasMobileBottomNav
            ? 'bottom-[calc(5.1rem+env(safe-area-inset-bottom))]'
            : 'bottom-[max(0.85rem,env(safe-area-inset-bottom))]'
        )}
      >
        <Palette className="h-4 w-4 shrink-0 text-[var(--accent-gold-text)]" strokeWidth={1.85} />
        <span className="lg:hidden">Đổi màu</span>
        <span className="hidden lg:inline">Bảng màu:</span>
        <span className="hidden font-bold lg:inline">{currentMeta.name}</span>
        <span className="flex -space-x-1">
          <span
            style={{ backgroundColor: currentMeta.swatches.canvas }}
            className="h-3.5 w-3.5 rounded-full border border-black/20"
          />
          <span
            style={{ backgroundColor: currentMeta.swatches.action }}
            className="h-3.5 w-3.5 rounded-full border border-black/20"
          />
        </span>
      </button>
    </>
  );
}
