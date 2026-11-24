import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Appointment,
  ClosedDate,
  InvoiceCalculationInput,
  InvoiceCalculationResult,
  MembershipTier,
  TimeSlotAvailability,
} from '@/types';
import { VN_PHONE_REGEX } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number): string {
  return `${Math.round(amount).toLocaleString('vi-VN')}đ`;
}

export function formatVNDate(dateStr: string): string {
  if (!dateStr) return '';
  const clean = dateStr.split('T')[0];
  const parts = clean.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function normalizeVNPhone(raw: string): string {
  const cleaned = raw.replace(/[\s.\-()]/g, '');
  if (cleaned.startsWith('+84')) {
    return `0${cleaned.slice(3)}`;
  }
  if (cleaned.startsWith('84') && cleaned.length === 11) {
    return `0${cleaned.slice(2)}`;
  }
  return cleaned;
}

export function isValidVNPhone(raw: string): boolean {
  return VN_PHONE_REGEX.test(normalizeVNPhone(raw));
}

const BOOKING_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

export function generateBookingCode(prefix = 'MDS'): string {
  let suffix = '';
  for (let i = 0; i < 6; i += 1) {
    const idx = Math.floor(Math.random() * BOOKING_ALPHABET.length);
    suffix += BOOKING_ALPHABET[idx];
  }
  return `${prefix}-${suffix}`;
}

export function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function minutesToTime(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Kiểm soát sức chứa theo khoảng thời gian [start, start + duration) × guestCount
 * và chặn khung giờ lố giờ đóng cửa (khắc phục A-01 & A-03 trong report.md)
 */
export function computeTimeSlotsWithAvailability(params: {
  date: string;
  totalDurationMinutes: number;
  guestCount: number;
  openTime: string;
  closeTime: string;
  intervalMinutes: number;
  maxConcurrentBeds: number;
  existingAppointments: Appointment[];
  closedDates: ClosedDate[];
}): { isClosedDay: boolean; closedReason?: string; slots: TimeSlotAvailability[] } {
  const {
    date,
    totalDurationMinutes,
    guestCount,
    openTime,
    closeTime,
    intervalMinutes,
    maxConcurrentBeds,
    existingAppointments,
    closedDates,
  } = params;

  const closedMatch = closedDates.find((c) => c.date === date);
  if (closedMatch) {
    return { isClosedDay: true, closedReason: closedMatch.reason, slots: [] };
  }

  const openMins = timeToMinutes(openTime);
  const closeMins = timeToMinutes(closeTime);
  const duration = Math.max(totalDurationMinutes, 30);

  const dayBookings = existingAppointments.filter(
    (apt) =>
      apt.appointmentDate === date &&
      (apt.status === 'CONFIRMED' || apt.status === 'PENDING')
  );

  const slots: TimeSlotAvailability[] = [];

  for (let start = openMins; start + 30 <= closeMins; start += intervalMinutes) {
    const end = start + duration;
    const timeLabel = minutesToTime(start);
    const endLabel = minutesToTime(end);

    if (end > closeMins) {
      slots.push({
        time: timeLabel,
        endTime: endLabel,
        occupiedBeds: 0,
        availableBeds: 0,
        isSelectable: false,
        disabledReason: 'EXCEEDS_CLOSING',
      });
      continue;
    }

    // Tính số giường bị chiếm cao nhất trong toàn bộ khoảng [start, end)
    let peakOccupied = 0;
    for (let checkPoint = start; checkPoint < end; checkPoint += 15) {
      let occupiedAtPoint = 0;
      for (const apt of dayBookings) {
        const aptStart = timeToMinutes(apt.startTime);
        const aptEnd = timeToMinutes(apt.endTime);
        if (checkPoint >= aptStart && checkPoint < aptEnd) {
          occupiedAtPoint += apt.guestCount;
        }
      }
      if (occupiedAtPoint > peakOccupied) {
        peakOccupied = occupiedAtPoint;
      }
    }

    const availableBeds = Math.max(0, maxConcurrentBeds - peakOccupied);
    const fitsGuests = availableBeds >= guestCount;

    slots.push({
      time: timeLabel,
      endTime: endLabel,
      occupiedBeds: peakOccupied,
      availableBeds,
      isSelectable: fitsGuests,
      disabledReason: fitsGuests ? undefined : 'FULL_CAPACITY',
    });
  }

  return { isClosedDay: false, slots };
}

/**
 * Công thức chuẩn tính Hóa đơn & Điểm thưởng (khắc phục B-01 & B-02 trong report.md):
 * - Tách riêng tiền Dịch vụ (áp % hạng) và tiền Mỹ phẩm (không áp % hạng)
 * - Không cộng dồn giá Sale với giảm giá Hạng: tự chọn phương án có lợi hơn cho khách
 * - Trần đổi điểm tối đa maxRedeemPercent (mặc định 50%)
 * - Không bao giờ để finalAmount < 0
 */
export function calculateInvoiceSummary(
  input: InvoiceCalculationInput
): InvoiceCalculationResult {
  const {
    serviceListPriceTotal,
    serviceSalePriceTotal,
    retailSubtotal,
    tierDiscountPercent,
    pointsToRedeem,
    availablePoints,
    pointRedeemValueVnd,
    maxRedeemPercent,
    allowRedeemOnRetail,
    pointsPer100k,
  } = input;

  const listServiceAfterTier = Math.round(
    serviceListPriceTotal * (1 - tierDiscountPercent / 100)
  );
  const tierDiscountIfOnList = serviceListPriceTotal - listServiceAfterTier;
  const saleSavings = Math.max(0, serviceListPriceTotal - serviceSalePriceTotal);

  let effectiveServiceAfterTier = serviceSalePriceTotal;
  let tierDiscountAmount = 0;
  let appliedDiscountMode: InvoiceCalculationResult['appliedDiscountMode'] = 'NONE';

  if (tierDiscountIfOnList > saleSavings && tierDiscountIfOnList > 0) {
    effectiveServiceAfterTier = listServiceAfterTier;
    tierDiscountAmount = tierDiscountIfOnList;
    appliedDiscountMode = 'TIER_DISCOUNT';
  } else if (saleSavings > 0) {
    effectiveServiceAfterTier = serviceSalePriceTotal;
    tierDiscountAmount = 0;
    appliedDiscountMode = 'SALE_PRICE';
  }

  const subtotalAfterTier = effectiveServiceAfterTier + retailSubtotal;
  const redeemBase = allowRedeemOnRetail ? subtotalAfterTier : effectiveServiceAfterTier;
  const maxDiscountVndByCap = Math.floor((redeemBase * maxRedeemPercent) / 100);
  const maxPointsByCap = Math.floor(maxDiscountVndByCap / pointRedeemValueVnd);
  const maxRedeemablePoints = Math.max(0, Math.min(availablePoints, maxPointsByCap));

  const validPointsRedeemed = Math.max(
    0,
    Math.min(Math.floor(pointsToRedeem), maxRedeemablePoints)
  );
  const pointsDiscountAmount = validPointsRedeemed * pointRedeemValueVnd;

  const finalAmount = Math.max(0, subtotalAfterTier - pointsDiscountAmount);
  const pointsEarned = Math.floor((finalAmount * pointsPer100k) / 100000);

  return {
    effectiveServiceBase: serviceListPriceTotal,
    saleSavings,
    tierDiscountAmount,
    appliedDiscountMode,
    subtotalAfterTier,
    maxRedeemablePoints,
    validPointsRedeemed,
    pointsDiscountAmount,
    finalAmount,
    pointsEarned,
  };
}

export function resolveTierBySpent(
  totalSpent: number,
  tiers: MembershipTier[]
): { currentTier: MembershipTier; nextTier: MembershipTier | null; remainingToNext: number; progressPercent: number } {
  const sorted = [...tiers].sort((a, b) => a.minSpent - b.minSpent);
  let currentTier = sorted[0];

  for (const tier of sorted) {
    if (totalSpent >= tier.minSpent) {
      currentTier = tier;
    }
  }

  const currentIdx = sorted.findIndex((t) => t.code === currentTier.code);
  const nextTier = currentIdx < sorted.length - 1 ? sorted[currentIdx + 1] : null;

  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      remainingToNext: 0,
      progressPercent: 100,
    };
  }

  const span = nextTier.minSpent - currentTier.minSpent;
  const gained = totalSpent - currentTier.minSpent;
  const progressPercent = Math.min(100, Math.max(0, Math.round((gained / span) * 100)));
  const remainingToNext = Math.max(0, nextTier.minSpent - totalSpent);

  return {
    currentTier,
    nextTier,
    remainingToNext,
    progressPercent,
  };
}
