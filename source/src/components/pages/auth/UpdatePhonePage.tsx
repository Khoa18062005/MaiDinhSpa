'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';
import { isValidVNPhone } from '@/lib/utils';

export default function UpdatePhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidVNPhone(phone)) {
      setError('Vui lòng nhập đúng Số điện thoại 10 số Việt Nam.');
      return;
    }
    router.push('/tai-khoan');
  };

  return (
    <div className="w-full max-w-md rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-7 shadow-[var(--shadow-elevated)] sm:p-9">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-surface-soft)] text-[var(--accent-gold-text)]">
        <Phone className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-[var(--text-primary)]">
        Bổ sung Số điện thoại tích điểm
      </h1>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
        Bạn vừa đăng nhập qua Google thành công. Hãy cập nhật Số điện thoại để lễ tân Mai Đinh Spa tra cứu nhanh thẻ hạng và cộng điểm khi bạn thanh toán tại quầy.
      </p>

      <form onSubmit={handleComplete} className="mt-6 space-y-4">
        <div>
          <label htmlFor="google-phone" className="block text-xs font-semibold text-[var(--text-primary)]">
            Số điện thoại của bạn <span className="text-[#9E2A22]">*</span>
          </label>
          <input
            id="google-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError(null);
            }}
            placeholder="0909123456"
            className="mt-1.5 h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm tabular-nums"
          />
        </div>

        <div>
          <label htmlFor="google-dob" className="block text-xs font-semibold text-[var(--text-primary)]">
            Ngày sinh (Nhận ưu đãi tháng sinh nhật)
          </label>
          <input
            id="google-dob"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm tabular-nums"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-[#FCE9E7] p-3 text-xs font-medium text-[#8F2820]">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
        >
          Hoàn tất &amp; Mở thẻ thành viên
        </button>
      </form>
    </div>
  );
}
