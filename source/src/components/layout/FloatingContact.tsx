import React from 'react';
import { MapPin, MessageCircle, Phone, Share2 } from 'lucide-react';
import { SpaSettings } from '@/types';

interface FloatingContactProps {
  settings: SpaSettings;
}

export default function FloatingContact({ settings }: FloatingContactProps) {
  return (
    <>
      <aside
        aria-label="Liên hệ nhanh Mai Đinh Spa"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 md:flex"
      >
        <a
          href={settings.mapsUrl}
          target="_blank"
          rel="noreferrer"
          title="Chỉ đường Google Maps tới Mai Đinh Spa"
          aria-label="Chỉ đường Google Maps tới Mai Đinh Spa"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C94A38] text-white shadow-md transition-transform hover:scale-105"
        >
          <MapPin className="h-4 w-4" strokeWidth={1.85} />
        </a>

        <a
          href={settings.facebookUrl}
          target="_blank"
          rel="noreferrer"
          title="Fanpage Mai Đinh Spa"
          aria-label="Fanpage Mai Đinh Spa"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2457B2] text-white shadow-md transition-transform hover:scale-105"
        >
          <Share2 className="h-4 w-4" strokeWidth={1.85} />
        </a>

        <a
          href={settings.zaloUrl}
          target="_blank"
          rel="noreferrer"
          title="Nhắn Zalo tư vấn trực tiếp cùng Mai Đinh Spa"
          aria-label="Nhắn Zalo tư vấn trực tiếp"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B64D8]/20 bg-white text-[11px] font-bold tracking-tight text-[#1456C2] shadow-md transition-transform hover:scale-105"
        >
          Zalo
        </a>

        <a
          href={`tel:${settings.phone}`}
          title={`Gọi Hotline ${settings.phoneDisplay}`}
          aria-label={`Gọi Hotline ${settings.phoneDisplay}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B59461] text-[#1F1A17] shadow-md transition-transform hover:scale-105"
        >
          <Phone className="h-4 w-4" strokeWidth={1.85} />
        </a>
      </aside>

      <a
        href={settings.zaloUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-4 z-40 hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--btn-primary-bg)] px-4 py-2.5 text-xs font-semibold text-[var(--btn-primary-text)] shadow-[var(--shadow-elevated)] transition-colors hover:bg-[var(--btn-primary-hover)] lg:inline-flex"
      >
        <MessageCircle className="h-4 w-4 shrink-0 opacity-90" strokeWidth={1.85} />
        Chat với Mai Đinh
      </a>
    </>
  );
}
