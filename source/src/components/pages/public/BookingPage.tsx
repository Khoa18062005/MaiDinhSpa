'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  CalendarPlus,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Appointment, ClosedDate, Service } from '@/types';
import { useSpaDemo } from '@/lib/demo-store';
import { DEMO_TODAY } from '@/lib/data/mock-db';
import {
  cn,
  computeTimeSlotsWithAvailability,
  formatVND,
  formatVNDate,
  isValidVNPhone,
  minutesToTime,
  normalizeVNPhone,
  timeToMinutes,
} from '@/lib/utils';
import MembershipTierBadge from '@/components/shared/MembershipTierBadge';

interface BookingPageProps {
  closedDates: ClosedDate[];
  preselectedServiceSlug?: string;
}

function getUpcomingDays(baseDateStr: string, count = 8): { date: string; dayLabel: string; shortDate: string }[] {
  const [y, m, d] = baseDateStr.split('-').map(Number);
  const weekdayNames = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'];
  const result: { date: string; dayLabel: string; shortDate: string }[] = [];

  for (let i = 0; i < count; i += 1) {
    const dt = new Date(y, m - 1, d + i);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    result.push({
      date: `${yyyy}-${mm}-${dd}`,
      dayLabel: i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : weekdayNames[dt.getDay()],
      shortDate: `${dd}/${mm}`,
    });
  }
  return result;
}

export default function BookingPage({
  closedDates,
  preselectedServiceSlug,
}: BookingPageProps) {
  const {
    services,
    settings,
    appointments,
    customers,
    activeDemoCustomerId,
    addAppointment,
  } = useSpaDemo();

  const activeServices = useMemo(() => services.filter((s) => s.isActive), [services]);

  const defaultSelectedIds = useMemo(() => {
    if (preselectedServiceSlug) {
      const found = activeServices.find((s) => s.slug === preselectedServiceSlug);
      if (found) return [found.id];
    }
    return activeServices[0] ? [activeServices[0].id] : [];
  }, [activeServices, preselectedServiceSlug]);

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(defaultSelectedIds);
  const [selectedDate, setSelectedDate] = useState<string>(DEMO_TODAY);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>('10:00');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdBooking, setCreatedBooking] = useState<Appointment | null>(null);
  const [copied, setCopied] = useState(false);

  const upcomingDays = useMemo(() => getUpcomingDays(DEMO_TODAY, 8), []);

  const selectedServices: Service[] = useMemo(
    () => activeServices.filter((s) => selectedServiceIds.includes(s.id)),
    [activeServices, selectedServiceIds]
  );

  const totalDurationMinutes = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0),
    [selectedServices]
  );

  const perGuestAmount = useMemo(
    () => selectedServices.reduce((sum, s) => sum + (s.salePrice ?? s.price), 0),
    [selectedServices]
  );

  const estimatedTotal = perGuestAmount * guestCount;

  const availability = useMemo(
    () =>
      computeTimeSlotsWithAvailability({
        date: selectedDate,
        totalDurationMinutes: totalDurationMinutes || 60,
        guestCount,
        openTime: settings.openTime,
        closeTime: settings.closeTime,
        intervalMinutes: settings.slotIntervalMinutes,
        maxConcurrentBeds: settings.maxConcurrentBeds,
        existingAppointments: appointments,
        closedDates,
      }),
    [
      selectedDate,
      totalDurationMinutes,
      guestCount,
      settings,
      appointments,
      closedDates,
    ]
  );

  // Tự động chuyển sang khung giờ trống gần nhất nếu người dùng đổi ngày/số khách làm khung giờ cũ bị kín
  useEffect(() => {
    if (availability.isClosedDay) return;
    const currentValid = availability.slots.find(
      (s) => s.time === selectedTime && s.isSelectable
    );
    if (!currentValid) {
      const firstOpen = availability.slots.find((s) => s.isSelectable);
      setSelectedTime(firstOpen ? firstOpen.time : '');
    }
  }, [availability, selectedTime]);

  const matchedMember = useMemo(() => {
    const normalized = normalizeVNPhone(customerPhone);
    return customers.find((c) => c.phone === normalized) ?? null;
  }, [customerPhone, customers]);

  const toggleService = (id: string) => {
    setErrorMsg(null);
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePrefillMember = () => {
    const member = customers.find((c) => c.id === activeDemoCustomerId) ?? customers[0];
    if (!member) return;
    setCustomerName(member.fullName);
    setCustomerPhone(member.phone);
    setCustomerEmail(member.email ?? '');
    setPrivacyAccepted(true);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (selectedServices.length === 0) {
      setErrorMsg('Vui lòng chọn ít nhất 01 liệu trình để Mai Đinh Spa ước tính thời lượng giữ giường.');
      return;
    }

    if (availability.isClosedDay) {
      setErrorMsg('Ngày bạn chọn Spa tạm nghỉ bảo trì. Vui lòng chọn ngày khác trên lịch.');
      return;
    }

    const activeSlot = availability.slots.find((s) => s.time === selectedTime);
    if (!activeSlot || !activeSlot.isSelectable) {
      setErrorMsg('Khung giờ đã chọn hiện không đủ giường trống hoặc vượt giờ đóng cửa. Vui lòng chọn khung giờ sáng đèn.');
      return;
    }

    if (customerName.trim().length < 2) {
      setErrorMsg('Vui lòng nhập Họ và tên người đặt hẹn.');
      return;
    }

    if (!isValidVNPhone(customerPhone)) {
      setErrorMsg('Số điện thoại chưa đúng chuẩn 10 số di động Việt Nam (VD: 0909123456).');
      return;
    }

    if (!privacyAccepted) {
      setErrorMsg('Vui lòng tích xác nhận đồng ý Chính sách bảo vệ dữ liệu cá nhân trước khi gửi yêu cầu.');
      return;
    }

    const normalizedPhone = normalizeVNPhone(customerPhone);
    const pendingSamePhoneToday = appointments.filter(
      (a) => a.customerPhone === normalizedPhone && a.status === 'PENDING'
    );
    if (pendingSamePhoneToday.length >= 3) {
      setErrorMsg('Số điện thoại này đang có 3 lịch hẹn chờ duyệt. Vui lòng đợi Spa xác nhận hoặc gọi Hotline hỗ trợ.');
      return;
    }

    const endTime = minutesToTime(timeToMinutes(selectedTime) + totalDurationMinutes);

    const created = addAppointment({
      customerId: matchedMember?.id ?? null,
      customerName: customerName.trim(),
      customerPhone: normalizedPhone,
      customerEmail: customerEmail.trim() || null,
      customerTierCode: matchedMember?.tierCode ?? 'MEMBER',
      appointmentDate: selectedDate,
      startTime: selectedTime,
      endTime,
      totalDurationMinutes,
      guestCount,
      customerNote: customerNote.trim() || null,
      adminNote: null,
      status: 'PENDING',
      estimatedAmount: estimatedTotal,
      items: selectedServices.map((srv, idx) => ({
        id: `item-${Date.now()}-${idx}`,
        serviceId: srv.id,
        serviceName: srv.name,
        price: srv.price,
        salePrice: srv.salePrice,
        durationMinutes: srv.durationMinutes,
        quantity: guestCount,
      })),
    });

    setCreatedBooking(created);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadIcs = (apt: Appointment) => {
    const cleanDate = apt.appointmentDate.replace(/-/g, '');
    const cleanStart = apt.startTime.replace(':', '') + '00';
    const cleanEnd = apt.endTime.replace(':', '') + '00';
    const serviceNames = apt.items.map((i) => i.serviceName).join(', ');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mai Dinh Spa//Booking//VI',
      'BEGIN:VEVENT',
      `SUMMARY:Lịch hẹn Mai Đinh Spa (${apt.bookingCode})`,
      `DTSTART:${cleanDate}T${cleanStart}`,
      `DTEND:${cleanDate}T${cleanEnd}`,
      `LOCATION:${settings.address}, ${settings.districtCity}`,
      `DESCRIPTION:Liệu trình: ${serviceNames}. Trạng thái: Chờ Spa xác nhận.`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${apt.bookingCode}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (createdBooking) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-7 shadow-[var(--shadow-elevated)] sm:p-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F3EC] text-[#1F5C3E]">
            <CheckCircle2 className="h-6 w-6" strokeWidth={1.85} />
          </div>

          <h1 className="mt-4 font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl">
            Đã gửi yêu cầu giữ lịch hẹn tại Mai Đinh Spa
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Đơn hẹn của bạn đang ở trạng thái <strong>Chờ Chủ Spa duyệt</strong>. Lễ tân sẽ đối chiếu phòng trị liệu và xác nhận trong vòng <strong>30 phút</strong> (trong khung giờ mở cửa {settings.openTime} – {settings.closeTime}).
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] p-5">
            <div>
              <p className="text-xs font-medium text-[var(--text-muted)]">Mã tra cứu lịch hẹn của bạn</p>
              <p className="mt-1 tabular-nums font-serif-display text-3xl font-semibold tracking-wider text-[var(--text-primary)]">
                {createdBooking.bookingCode}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(createdBooking.bookingCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-pill-active)]"
            >
              {copied ? <Check className="h-4 w-4 text-[#1F5C3E]" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Đã sao chép mã' : 'Sao chép mã'}
            </button>
          </div>

          <dl className="mt-6 space-y-3 border-y border-[var(--border-subtle)] py-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-secondary)]">Khách đặt hẹn</dt>
              <dd className="font-semibold text-[var(--text-primary)]">
                {createdBooking.customerName} ({createdBooking.customerPhone})
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-secondary)]">Thời gian dự kiến</dt>
              <dd className="tabular-nums font-semibold text-[var(--text-primary)]">
                {createdBooking.startTime} – {createdBooking.endTime} · Ngày {formatVNDate(createdBooking.appointmentDate)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-secondary)]">Số lượng khách</dt>
              <dd className="tabular-nums font-semibold text-[var(--text-primary)]">
                {createdBooking.guestCount} khách (giữ {createdBooking.guestCount} giường)
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-secondary)]">Chi phí ước tính tại quầy</dt>
              <dd className="tabular-nums font-semibold text-[var(--text-primary)]">
                {formatVND(createdBooking.estimatedAmount)} (Chưa trừ ưu đãi hạng / điểm)
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleDownloadIcs(createdBooking)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-surface-soft)]"
            >
              <CalendarPlus className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
              Lưu vào Lịch điện thoại (.ics)
            </button>

            <Link
              href={`/tra-cuu-lich?code=${createdBooking.bookingCode}&phone=${createdBooking.customerPhone}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-6 py-2.5 text-xs font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
            >
              Theo dõi trạng thái đơn này
            </Link>

            <Link
              href="/admin/lich-hen"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#EFE9DF] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-pill-active)]"
            >
              <ShieldCheck className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
              Sang trang Chủ Spa duyệt thử ngay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-5xl">
            Đặt lịch hẹn trước tại Mai Đinh Spa
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Giữ chỗ miễn phí không cần thanh toán trước. Hệ thống tự động kiểm tra số giường trống theo tổng thời lượng liệu trình bạn chọn.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePrefillMember}
          className="inline-flex min-h-10 shrink-0 items-center gap-2 self-start rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-pill-active)]"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
          Điền nhanh bằng Tài khoản Thành viên mẫu
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="space-y-7 lg:col-span-8">
          {/* STEP 1: SELECT TREATMENTS */}
          <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 sm:p-8">
            <h2 className="font-serif-display text-2xl font-medium text-[var(--text-primary)]">
              1. Chọn liệu trình bạn muốn thực hiện
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Bạn có thể kết hợp nhiều dịch vụ trong cùng một lần ghé Spa.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {activeServices.map((srv) => {
                const checked = selectedServiceIds.includes(srv.id);
                const price = srv.salePrice ?? srv.price;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    aria-pressed={checked}
                    className={cn(
                      'flex flex-col justify-between rounded-[20px] border p-4 text-left transition-all',
                      checked
                        ? 'border-[var(--text-primary)] bg-[var(--bg-surface-soft)] ring-1 ring-[var(--text-primary)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface-card)] hover:border-[var(--border-strong)]'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
                        {srv.name}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                          checked
                            ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                            : 'border-[var(--border-strong)]'
                        )}
                      >
                        {checked && <Check className="h-3 w-3" strokeWidth={2.5} />}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2.5 text-xs tabular-nums">
                      <span className="inline-flex items-center gap-1 text-[var(--text-muted)]">
                        <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                        {srv.durationMinutes} phút
                      </span>
                      <span className="font-semibold text-[var(--text-primary)]">
                        {formatVND(price)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* STEP 2: DATE, GUESTS & CAPACITY-AWARE TIME SLOTS */}
          <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif-display text-2xl font-medium text-[var(--text-primary)]">
                  2. Chọn ngày hẹn, số khách &amp; khung giờ trống
                </h2>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Mỗi khách đi cùng thực hiện gói đã chọn và giữ số giường tương ứng (tối đa {settings.maxConcurrentBeds} giường/khung giờ).
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-3.5 py-2">
                <Users className="h-4 w-4 shrink-0 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
                <label htmlFor="guest-count" className="text-xs font-semibold text-[var(--text-primary)]">
                  Số khách:
                </label>
                <select
                  id="guest-count"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="bg-transparent text-xs font-bold text-[var(--text-primary)] focus:outline-none tabular-nums"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n} người
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Date Strip */}
            <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {upcomingDays.map((d) => {
                const closed = closedDates.some((c) => c.date === d.date);
                const selected = selectedDate === d.date;
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedDate(d.date)}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-[16px] border py-2.5 text-center transition-colors tabular-nums',
                      selected
                        ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]'
                        : closed
                        ? 'border-[#E6D5D2] bg-[#FAF1F0] text-[#8E3B33]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] text-[var(--text-primary)] hover:bg-[var(--bg-pill-active)]'
                    )}
                  >
                    <span className="text-[11px] font-medium opacity-85">{d.dayLabel}</span>
                    <span className="mt-0.5 text-sm font-semibold">{d.shortDate}</span>
                    {closed && <span className="text-[10px] font-semibold">Nghỉ</span>}
                  </button>
                );
              })}
            </div>

            {/* Time Slots Grid */}
            <div className="mt-6">
              {availability.isClosedDay ? (
                <div className="rounded-[18px] border border-[#E6C7C2] bg-[#FCE9E7] p-4 text-sm text-[#8F2820]">
                  <strong>Mai Đinh Spa tạm nghỉ ngày {formatVNDate(selectedDate)}:</strong>{' '}
                  {availability.closedReason}. Bạn vui lòng chọn ngày kế tiếp nhé.
                </div>
              ) : (
                <>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                    <span>
                      Khung giờ mở cửa: <strong className="text-[var(--text-primary)]">{settings.openTime} – {settings.closeTime}</strong>
                    </span>
                    <span>
                      Tổng thời lượng dự kiến: <strong className="text-[var(--text-primary)]">{totalDurationMinutes || 60} phút</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
                    {availability.slots.map((slot) => {
                      const chosen = selectedTime === slot.time && slot.isSelectable;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.isSelectable}
                          onClick={() => {
                            setSelectedTime(slot.time);
                            setErrorMsg(null);
                          }}
                          className={cn(
                            'flex min-h-14 flex-col items-center justify-center rounded-[14px] border px-2 py-2 text-center transition-all tabular-nums',
                            chosen
                              ? 'border-[var(--btn-primary-bg)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-xs'
                              : slot.isSelectable
                              ? 'border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-pill-active)]'
                              : 'cursor-not-allowed border-[var(--border-subtle)] bg-[#EFECE6]/70 text-[var(--text-muted)] opacity-65'
                          )}
                        >
                          <span className="text-sm font-semibold">{slot.time}</span>
                          <span className="text-[10px]">
                            {slot.isSelectable
                              ? `Trống ${slot.availableBeds}/${settings.maxConcurrentBeds} giường`
                              : slot.disabledReason === 'EXCEEDS_CLOSING'
                              ? 'Quá giờ đóng cửa'
                              : 'Kín giường'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* STEP 3: CUSTOMER CONTACT & CONSENT */}
          <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 sm:p-8">
            <h2 className="font-serif-display text-2xl font-medium text-[var(--text-primary)]">
              3. Thông tin người đặt hẹn
            </h2>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Không bắt buộc đăng ký tài khoản. Nếu bạn nhập đúng SĐT thành viên, điểm thưởng sẽ tự động cộng sau khi thanh toán tại quầy.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-name" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Họ và tên <span className="text-[#9E2A22]">*</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="VD: Nguyễn Minh Thư"
                  className="mt-1.5 h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
              </div>

              <div>
                <label htmlFor="booking-phone" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Số điện thoại Zalo / Liên hệ <span className="text-[#9E2A22]">*</span>
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="VD: 0909123456"
                  className="mt-1.5 h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] tabular-nums"
                />
                {matchedMember && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-[var(--accent-sage)]">
                    <MembershipTierBadge tierCode={matchedMember.tierCode} />
                    <span>Nhận diện thành viên: {matchedMember.fullName}</span>
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="booking-email" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Email nhận thư xác nhận lịch hẹn (Tùy chọn)
                </label>
                <input
                  id="booking-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@domain.com (để nhận thông báo tự động khi Chủ Spa duyệt lịch)"
                  className="mt-1.5 h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="booking-note" className="block text-xs font-semibold text-[var(--text-primary)]">
                  Lưu ý riêng cho kỹ thuật viên (Tình trạng da, dị ứng tinh dầu, lực ấn...)
                </label>
                <textarea
                  id="booking-note"
                  rows={3}
                  maxLength={500}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="VD: Mình đang mang thai tháng thứ 5 / Da dễ kích ứng với bạc hà / Đi 2 người muốn nằm cùng phòng..."
                  className="mt-1.5 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface-soft)] p-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-[16px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-3.5 text-xs leading-relaxed text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#2B2521]"
              />
              <span>
                Tôi đồng ý để Mai Đinh Spa xử lý thông tin liên hệ và ghi chú tình trạng chăm sóc phục vụ buổi hẹn theo{' '}
                <Link href="/chinh-sach-bao-mat" className="font-semibold text-[var(--text-primary)] underline">
                  Chính sách bảo vệ dữ liệu cá nhân
                </Link>
                .
              </span>
            </label>

            {errorMsg && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#E6C7C2] bg-[#FCE9E7] p-3.5 text-xs font-medium text-[#8F2820]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </section>
        </div>

        {/* STICKY RESERVATION TICKET SUMMARY */}
        <aside className="lg:sticky lg:top-24 lg:col-span-4">
          <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 shadow-[var(--shadow-ambient)] sm:p-7">
            <h2 className="font-serif-display text-2xl font-medium text-[var(--text-primary)]">
              Phiếu tóm tắt lịch hẹn
            </h2>

            {selectedServices.length === 0 ? (
              <p className="mt-4 rounded-xl bg-[var(--bg-surface-soft)] p-4 text-xs text-[var(--text-muted)]">
                Chưa có liệu trình nào được chọn. Hãy tích chọn ít nhất 1 dịch vụ ở Bước 1.
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5 border-b border-[var(--border-subtle)] pb-4 text-sm">
                {selectedServices.map((srv) => (
                  <li key={srv.id} className="flex items-start justify-between gap-3">
                    <span className="text-[var(--text-secondary)]">{srv.name}</span>
                    <span className="tabular-nums shrink-0 font-semibold text-[var(--text-primary)]">
                      {formatVND(srv.salePrice ?? srv.price)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <dl className="mt-4 space-y-2.5 text-sm tabular-nums">
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Ngày &amp; Giờ bắt đầu</dt>
                <dd className="font-semibold text-[var(--text-primary)]">
                  {selectedTime} · {formatVNDate(selectedDate)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Tổng thời lượng</dt>
                <dd className="font-semibold text-[var(--text-primary)]">
                  {totalDurationMinutes} phút
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--text-secondary)]">Số lượng khách</dt>
                <dd className="font-semibold text-[var(--text-primary)]">
                  × {guestCount} khách
                </dd>
              </div>
              <div className="flex justify-between border-t border-[var(--border-subtle)] pt-3 text-base">
                <dt className="font-semibold text-[var(--text-primary)]">Tạm tính tại quầy</dt>
                <dd className="font-serif-display text-2xl font-semibold text-[var(--text-primary)]">
                  {formatVND(estimatedTotal)}
                </dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
            >
              Gửi yêu cầu đặt lịch (Chờ duyệt)
            </button>

            <p className="mt-3 text-center text-xs leading-relaxed text-[var(--text-muted)]">
              Không thu cọc online · Hỗ trợ đổi hoặc hủy lịch miễn phí trước giờ hẹn tối thiểu {settings.cancelCutoffHours} tiếng.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
