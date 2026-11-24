import { AppointmentStatus, TierCode } from '@/types';

export const APPOINTMENT_STATUS_META: Record<
  AppointmentStatus,
  { label: string; shortLabel: string; bgVar: string; textVar: string; description: string }
> = {
  PENDING: {
    label: 'Chờ Spa xác nhận',
    shortLabel: 'Chờ duyệt',
    bgVar: 'var(--status-pending-bg)',
    textVar: 'var(--status-pending-text)',
    description: 'Mai Đinh Spa đang đối chiếu giường trống và sẽ phản hồi trong vòng 30 phút giờ mở cửa.',
  },
  CONFIRMED: {
    label: 'Đã xác nhận giữ chỗ',
    shortLabel: 'Đã xác nhận',
    bgVar: 'var(--status-confirmed-bg)',
    textVar: 'var(--status-confirmed-text)',
    description: 'Giường trị liệu và kỹ thuật viên đã được sắp xếp sẵn sàng đón bạn.',
  },
  COMPLETED: {
    label: 'Đã hoàn thành & Tích điểm',
    shortLabel: 'Hoàn thành',
    bgVar: 'var(--status-completed-bg)',
    textVar: 'var(--status-completed-text)',
    description: 'Cảm ơn bạn đã trải nghiệm dịch vụ. Điểm thưởng đã được ghi nhận vào sổ cái.',
  },
  CANCELLED: {
    label: 'Đã hủy lịch',
    shortLabel: 'Đã hủy',
    bgVar: 'var(--status-cancelled-bg)',
    textVar: 'var(--status-cancelled-text)',
    description: 'Lịch hẹn đã được hủy và giải phóng khung giờ.',
  },
  NO_SHOW: {
    label: 'Khách vắng mặt',
    shortLabel: 'Vắng mặt',
    bgVar: 'var(--status-noshow-bg)',
    textVar: 'var(--status-noshow-text)',
    description: 'Quá giờ hẹn nhưng khách chưa ghé cơ sở.',
  },
};

export const TIER_VISUAL_META: Record<
  TierCode,
  {
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    cardGradient: string;
    cardText: string;
    cardMuted: string;
    accentColor: string;
  }
> = {
  MEMBER: {
    badgeBg: '#FAF6F0',
    badgeText: '#5C534B',
    badgeBorder: '#DED3C3',
    cardGradient: 'linear-gradient(135deg, #FAF7F2 0%, #EFE6D8 100%)',
    cardText: '#2B2521',
    cardMuted: '#6E645B',
    accentColor: '#745B2F',
  },
  SILVER: {
    badgeBg: '#EEF1F4',
    badgeText: '#3A4654',
    badgeBorder: '#CFD6DF',
    cardGradient: 'linear-gradient(135deg, #F4F6F8 0%, #DFE5EC 100%)',
    cardText: '#222B35',
    cardMuted: '#4D5B6B',
    accentColor: '#3A4654',
  },
  GOLD: {
    badgeBg: '#FBF2DA',
    badgeText: '#785716',
    badgeBorder: '#E5CC93',
    cardGradient: 'linear-gradient(135deg, #FCF5E3 0%, #EDD8A6 100%)',
    cardText: '#2B2212',
    cardMuted: '#695326',
    accentColor: '#785716',
  },
  VIP: {
    badgeBg: '#2B2521',
    badgeText: '#E8CC91',
    badgeBorder: '#574A3E',
    cardGradient: 'linear-gradient(135deg, #2F2823 0%, #1C1714 100%)',
    cardText: '#FAF5EC',
    cardMuted: '#C9BCA9',
    accentColor: '#E8CC91',
  },
};

export const VN_PHONE_REGEX = /^0(3|5|7|8|9)\d{8}$/;
