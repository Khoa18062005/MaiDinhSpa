import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BrandLogo from '@/components/shared/BrandLogo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-between px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Về trang chủ
        </Link>

        <Link href="/" aria-label="Mai Đinh Skinlab Spa">
          <BrandLogo size="sm" />
        </Link>
      </div>

      <main className="my-10 flex flex-1 items-center justify-center">{children}</main>

      <p className="text-center text-xs text-[var(--text-muted)]">
        Bảo mật xác thực không mật khẩu OTP trả phí · Hỗ trợ khách hàng Mai Đinh Spa
      </p>
    </div>
  );
}
