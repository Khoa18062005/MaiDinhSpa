'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useSpaDemo } from '@/lib/demo-store';
import { isValidVNPhone, normalizeVNPhone } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const { customers, appointments, setActiveDemoCustomerId } = useSpaDemo();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [consent, setConsent] = useState(false);

  // Luồng bảo vệ C-01: Xác minh khi SĐT đã có hồ sơ điểm tại quầy
  const [pendingVerifyCustomerId, setPendingVerifyCustomerId] = useState<string | null>(null);
  const [verifyBookingCode, setVerifyBookingCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [queuedAtCounter, setQueuedAtCounter] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!isValidVNPhone(phone)) {
      setErrorMsg('Số điện thoại phải đúng 10 chữ số di động Việt Nam (VD: 0938777888).');
      return;
    }
    if (!consent) {
      setErrorMsg('Vui lòng đồng ý Chính sách bảo vệ dữ liệu cá nhân trước khi mở thẻ.');
      return;
    }

    const normalized = normalizeVNPhone(phone);
    const existingRecord = customers.find((c) => c.phone === normalized);

    if (existingRecord) {
      // Kích hoạt hàng rào bảo mật C-01: Không tự động gộp điểm khi chưa xác minh chủ sở hữu SĐT!
      setPendingVerifyCustomerId(existingRecord.id);
      return;
    }

    router.push('/tai-khoan');
  };

  const handleVerifyExistingRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const normalized = normalizeVNPhone(phone);
    const matchedBooking = appointments.find(
      (a) =>
        a.customerPhone === normalized &&
        a.bookingCode.toUpperCase() === verifyBookingCode.trim().toUpperCase()
    );

    if (!matchedBooking) {
      setErrorMsg('Mã lịch hẹn không khớp với SĐT này. Bạn có thể bấm "Xác nhận tại quầy lần tới" để lễ tân duyệt.');
      return;
    }

    if (pendingVerifyCustomerId) {
      setActiveDemoCustomerId(pendingVerifyCustomerId);
    }
    router.push('/tai-khoan');
  };

  if (queuedAtCounter) {
    return (
      <div className="w-full max-w-md rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-8 text-center shadow-[var(--shadow-elevated)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF3DC] text-[#7D4E0D]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
          Tài khoản đã tạo ở chế độ Chờ xác minh SĐT
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          Để bảo vệ số dư điểm thưởng có sẵn của SĐT <strong>{normalizeVNPhone(phone)}</strong>, lễ tân Mai Đinh Spa sẽ xác nhận liên kết trong 1 chạm ở lần ghé tiếp theo của bạn.
        </p>
        <Link
          href="/tai-khoan"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[var(--text-primary)] px-6 text-sm font-semibold text-[#FAF7F2]"
        >
          Vào trang Tài khoản
        </Link>
      </div>
    );
  }

  if (pendingVerifyCustomerId) {
    return (
      <div className="w-full max-w-md rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-7 shadow-[var(--shadow-elevated)] sm:p-9">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#FEF3DC] px-3 py-1 text-xs font-semibold text-[#7D4E0D]">
          <ShieldAlert className="h-4 w-4" />
          Bảo vệ điểm thưởng thành viên
        </div>

        <h1 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
          Số điện thoại này đã có hồ sơ tích điểm tại Spa
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          Để tránh người lạ nhập trùng SĐT chiếm quyền xem lịch sử &amp; điểm thưởng, vui lòng nhập <strong>01 Mã lịch hẹn trước đây</strong> của bạn (thử mã mẫu <code>MDS-4H6N3R</code> cho SĐT <code>0938777888</code>) hoặc chọn xác nhận tại quầy.
        </p>

        <form onSubmit={handleVerifyExistingRecord} className="mt-5 space-y-4">
          <div>
            <label htmlFor="verify-code" className="block text-xs font-semibold text-[var(--text-primary)]">
              Mã lịch hẹn / Hóa đơn gần nhất
            </label>
            <input
              id="verify-code"
              type="text"
              value={verifyBookingCode}
              onChange={(e) => setVerifyBookingCode(e.target.value)}
              placeholder="VD: MDS-4H6N3R"
              className="mt-1.5 h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm font-semibold uppercase"
            />
          </div>

          {errorMsg && (
            <p className="rounded-xl bg-[#FCE9E7] p-3 text-xs font-medium text-[#8F2820]">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--text-primary)] text-sm font-semibold text-[#FAF7F2]"
          >
            Xác minh &amp; Đồng bộ điểm ngay
          </button>

          <button
            type="button"
            onClick={() => setQueuedAtCounter(true)}
            className="flex h-11 w-full items-center justify-center rounded-full border border-[var(--border-strong)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-soft)]"
          >
            Chưa nhớ mã — Nhờ Chủ Spa xác nhận tại quầy lần tới
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-7 shadow-[var(--shadow-elevated)] sm:p-9">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
        Mở Thẻ Thành viên Thân thiết
      </h1>
      <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
        Tích lũy chi tiêu lên hạng trọn đời — hưởng ưu đãi tới 12% dịch vụ. (Thử nhập SĐT <code>0938777888</code> để xem cơ chế chống chiếm đoạt điểm).
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="reg-name" className="block text-xs font-semibold text-[var(--text-primary)]">
            Họ và tên <span className="text-[#9E2A22]">*</span>
          </label>
          <input
            id="reg-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nguyễn Minh Thư"
            className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="reg-phone" className="block text-xs font-semibold text-[var(--text-primary)]">
              Số điện thoại <span className="text-[#9E2A22]">*</span>
            </label>
            <input
              id="reg-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0938777888"
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm tabular-nums"
            />
          </div>

          <div>
            <label htmlFor="reg-dob" className="block text-xs font-semibold text-[var(--text-primary)]">
              Ngày sinh (Quà tháng SN)
            </label>
            <input
              id="reg-dob"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3 text-sm tabular-nums"
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-xs font-semibold text-[var(--text-primary)]">
            Email đăng nhập <span className="text-[#9E2A22]">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@email.com"
            className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm"
          />
        </div>

        <div>
          <label htmlFor="reg-pass" className="block text-xs font-semibold text-[var(--text-primary)]">
            Mật khẩu (tối thiểu 6 ký tự) <span className="text-[#9E2A22]">*</span>
          </label>
          <input
            id="reg-pass"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1.5 h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#2B2521]"
          />
          <span>
            Tôi đồng ý với{' '}
            <Link href="/chinh-sach-bao-mat" className="font-semibold text-[var(--text-primary)] underline">
              Chính sách bảo mật dữ liệu cá nhân
            </Link>{' '}
            của Mai Đinh Spa.
          </span>
        </label>

        {errorMsg && (
          <div className="flex items-start gap-2 rounded-xl bg-[#FCE9E7] p-3 text-xs font-medium text-[#8F2820]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-sm font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
        >
          Tạo tài khoản Thành viên
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-[var(--text-secondary)]">
        Đã là thành viên?{' '}
        <Link href="/dang-nhap" className="font-semibold text-[var(--text-primary)] underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
