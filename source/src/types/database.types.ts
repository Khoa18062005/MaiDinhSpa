export type TierCode = 'MEMBER' | 'SILVER' | 'GOLD' | 'VIP';

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export type InvoiceStatus = 'PAID' | 'VOIDED';

export type PointTransactionType =
  | 'EARN'
  | 'REDEEM'
  | 'ADJUST'
  | 'REVERSAL'
  | 'EXPIRE';

export type PhoneVerifyStatus = 'VERIFIED' | 'PENDING_VERIFY' | 'UNVERIFIED';

export interface MembershipTier {
  id: string;
  code: TierCode;
  name: string;
  minSpent: number;
  pointsPer100k: number;
  discountPercent: number;
  benefits: string[];
  sortOrder: number;
}

export interface Customer {
  id: string;
  authUserId: string | null;
  phone: string;
  fullName: string;
  email: string | null;
  birthday: string | null;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  tierCode: TierCode;
  totalSpent: number;
  pointsBalance: number;
  skinNotes: string | null;
  phoneVerifyStatus: PhoneVerifyStatus;
  consentAt: string | null;
  noShowCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'SERVICE' | 'PRODUCT';
  sortOrder: number;
  isActive: boolean;
}

export interface ServiceStep {
  stepNumber: number;
  title: string;
  description: string;
  durationNote?: string;
}

export interface Service {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  suitableFor: string[];
  steps: ServiceStep[];
  price: number;
  salePrice: number | null;
  durationMinutes: number;
  imageUrl: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  brand: string;
  volume: string;
  origin: string;
  shortDesc: string;
  description: string;
  keyIngredients: string[];
  skinTypes: string[];
  usageGuide: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  inStock: boolean;
  isActive: boolean;
}

export interface AppointmentItem {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  salePrice: number | null;
  durationMinutes: number;
  quantity: number;
}

export interface Appointment {
  id: string;
  bookingCode: string;
  customerId: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  customerTierCode: TierCode;
  appointmentDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  totalDurationMinutes: number;
  guestCount: number;
  customerNote: string | null;
  adminNote: string | null;
  status: AppointmentStatus;
  estimatedAmount: number;
  items: AppointmentItem[];
  invoiceId: string | null;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceCode: string;
  appointmentId: string | null;
  bookingCode: string | null;
  customerId: string;
  customerName: string;
  customerPhone: string;
  tierCodeSnapshot: TierCode;
  serviceSubtotal: number;
  retailSubtotal: number;
  tierDiscountAmount: number;
  pointsRedeemed: number;
  pointsDiscountAmount: number;
  finalAmount: number;
  pointsEarned: number;
  status: InvoiceStatus;
  voidReason: string | null;
  createdAt: string;
}

export interface PointTransaction {
  id: string;
  customerId: string;
  invoiceId: string | null;
  type: PointTransactionType;
  pointsChange: number;
  balanceAfter: number;
  description: string;
  expiresAt: string | null;
  createdAt: string;
}

export interface ClosedDate {
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface Testimonial {
  id: string;
  customerLabel: string;
  serviceUsed: string;
  rating: number;
  quote: string;
  visitedMonth: string;
  isDemoData?: boolean;
}

export interface SpaSettings {
  spaName: string;
  tagline: string;
  address: string;
  districtCity: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  zaloUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  mapsUrl: string;
  openTime: string;
  closeTime: string;
  slotIntervalMinutes: number;
  maxConcurrentBeds: number;
  minLeadTimeMinutes: number;
  maxAdvanceDays: number;
  cancelCutoffHours: number;
  pointRedeemValueVnd: number;
  maxRedeemPercent: number;
  pointsExpiryMonths: number;
  allowRedeemOnRetail: boolean;
  googleRatingScore: number;
  googleReviewCount: number;
  isRatingDemo: boolean;
}
