'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, KeyRound, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('minhthu.nguyen@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/tai-khoan');
  };

  return (
    <div className="w-full max-w-md rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-7 shadow-[var(--shadow-elevated)] sm:p-9">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        Đăng nhập Thành viên
      </h1>
      <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
        Theo dõi thẻ hạng, số dư điểm thưởng và lịch hẹn của bạn tại Mai Đinh Spa.
      </p>

      {/* Google 1-Tap OAuth (0đ OTP) */}
      <button
        type="button"
        onClick={() => router.push('/cap-nhat-sdt')}
        className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-pill-active)]"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
          />
        </svg>
        Tiếp tục nhanh bằng Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span className="h-px flex-1 bg-[var(--border-subtle)]" />
        <span>hoặc dùng Email thành viên</span>
        <span className="h-px flex-1 bg-[var(--border-subtle)]" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-xs font-semibold text-[var(--text-primary)]">
            Địa chỉ Email
          </label>
          <div className="relative mt-1.5">
            <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] pr-4 pl-10 text-sm text-[var(--text-primary)]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="login-password" className="block text-xs font-semibold text-[var(--text-primary)]">
            Mật khẩu
          </label>
          <div className="relative mt-1.5">
            <KeyRound className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] pr-4 pl-10 text-sm text-[var(--text-primary)]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
        >
          Đăng nhập vào Thẻ Thành viên
          <ArrowRight className="h-4 w-4" strokeWidth={1.85} />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
        Chưa có thẻ thành viên?{' '}
        <Link href="/dang-ky" className="font-semibold text-[var(--text-primary)] underline">
          Đăng ký miễn phí ngay
        </Link>
      </p>
    </div>
  );
}
