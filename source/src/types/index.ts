export * from './database.types';

export interface ActionResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
  fieldErrors?: Record<string, string[]>;
}

export interface TimeSlotAvailability {
  time: string;
  endTime: string;
  occupiedBeds: number;
  availableBeds: number;
  isSelectable: boolean;
  disabledReason?: 'FULL_CAPACITY' | 'EXCEEDS_CLOSING' | 'PAST_LEAD_TIME';
}

export interface InvoiceCalculationInput {
  serviceListPriceTotal: number;
  serviceSalePriceTotal: number;
  retailSubtotal: number;
  tierDiscountPercent: number;
  pointsToRedeem: number;
  availablePoints: number;
  pointRedeemValueVnd: number;
  maxRedeemPercent: number;
  allowRedeemOnRetail: boolean;
  pointsPer100k: number;
}

export interface InvoiceCalculationResult {
  effectiveServiceBase: number;
  saleSavings: number;
  tierDiscountAmount: number;
  appliedDiscountMode: 'TIER_DISCOUNT' | 'SALE_PRICE' | 'NONE';
  subtotalAfterTier: number;
  maxRedeemablePoints: number;
  validPointsRedeemed: number;
  pointsDiscountAmount: number;
  finalAmount: number;
  pointsEarned: number;
}
