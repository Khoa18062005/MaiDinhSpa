import React from 'react';
import Link from 'next/link';
import { Clock, MapPin, Phone } from 'lucide-react';
import { SpaSettings } from '@/types';
import BrandLogo from '@/components/shared/BrandLogo';

interface FooterProps {
  settings: SpaSettings;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] pb-28 sm:mt-20 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link href="/" aria-label={settings.spaName} className="inline-block">
              <BrandLogo size="lg" />
            </Link>
            <p className="mt-2 text-xs text-[var(--text-muted)]">{settings.tagline}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
              Không gian chăm sóc da chuyên sâu và trị liệu dưỡng sinh 01 cơ sở duy nhất. Mỗi buổi hẹn đều được giữ chỗ riêng tư để bạn tận hưởng trọn vẹn sự thư thái mà không phải chờ đợi.
            </p>
          </div>

          {/* Contact & Single-Branch Info */}
          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold tracking-wider text-[var(--text-primary)] uppercase">
              Cơ sở & Giờ đón khách
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
                <span>
                  {settings.address}, {settings.districtCity}
                </span>
              </li>
              <li className="flex items-center gap-2.5 tabular-nums">
                <Clock className="h-4 w-4 shrink-0 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
                <span>
                  Mở cửa hằng ngày: {settings.openTime} – {settings.closeTime}
                </span>
              </li>
              <li className="flex items-center gap-2.5 tabular-nums">
                <Phone className="h-4 w-4 shrink-0 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
                <a href={`tel:${settings.phone}`} className="font-medium text-[var(--text-primary)] hover:underline">
                  Hotline / Zalo: {settings.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold tracking-wider text-[var(--text-primary)] uppercase">
              Khách hàng Thành viên
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/dich-vu" className="hover:text-[var(--text-primary)] hover:underline">
                  Bảng giá Liệu trình Dịch vụ
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="hover:text-[var(--text-primary)] hover:underline">
                  Danh mục Dược mỹ phẩm tại Spa
                </Link>
              </li>
              <li>
                <Link href="/dat-lich" className="hover:text-[var(--text-primary)] hover:underline">
                  Đặt lịch hẹn giữ chỗ miễn phí
                </Link>
              </li>
              <li>
                <Link href="/tra-cuu-lich" className="hover:text-[var(--text-primary)] hover:underline">
                  Tra cứu trạng thái lịch hẹn
                </Link>
              </li>
              <li>
                <Link href="/tai-khoan" className="hover:text-[var(--text-primary)] hover:underline">
                  Thẻ thành viên & Lịch sử điểm
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-[var(--text-primary)] hover:underline">
                  Chính sách bảo vệ dữ liệu cá nhân
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center">
          <p>© 2026 {settings.spaName}. Đặt lịch trực tuyến không thu tiền cọc trước.</p>
          <div className="flex items-center gap-4">
            <Link href="/chinh-sach-bao-mat" className="hover:text-[var(--text-primary)] hover:underline">
              Quyền riêng tư & Dữ liệu sức khỏe làn da
            </Link>
            <Link href="/admin" className="hover:text-[var(--text-primary)] hover:underline">
              Dành cho Chủ Spa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
