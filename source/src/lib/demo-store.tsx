'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Appointment,
  AppointmentStatus,
  Customer,
  Invoice,
  MembershipTier,
  PointTransaction,
  Product,
  Service,
  SpaSettings,
  TierCode,
} from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_CUSTOMERS,
  MOCK_INVOICES,
  MOCK_MEMBERSHIP_TIERS,
  MOCK_POINT_TRANSACTIONS,
  MOCK_PRODUCTS,
  MOCK_SERVICES,
  MOCK_SPA_SETTINGS,
} from './data/mock-db';
import { generateBookingCode, resolveTierBySpent } from './utils';

interface CompleteInvoicePayload {
  appointmentId: string | null;
  customerId: string;
  serviceSubtotal: number;
  retailSubtotal: number;
  tierDiscountAmount: number;
  pointsRedeemed: number;
  pointsDiscountAmount: number;
  finalAmount: number;
  pointsEarned: number;
  adminNote?: string;
}

interface SpaDemoContextValue {
  settings: SpaSettings;
  tiers: MembershipTier[];
  services: Service[];
  products: Product[];
  appointments: Appointment[];
  customers: Customer[];
  invoices: Invoice[];
  pointTransactions: PointTransaction[];
  activeDemoCustomerId: string;
  setActiveDemoCustomerId: (id: string) => void;
  addAppointment: (apt: Omit<Appointment, 'id' | 'bookingCode' | 'createdAt' | 'invoiceId'>) => Appointment;
  updateAppointmentStatus: (
    id: string,
    status: AppointmentStatus,
    options?: { startTime?: string; endTime?: string; adminNote?: string }
  ) => void;
  completeInvoiceAndAwardPoints: (payload: CompleteInvoicePayload) => Invoice;
  voidInvoice: (invoiceId: string, reason: string) => void;
  adjustCustomerPoints: (customerId: string, delta: number, reason: string) => void;
  updateCustomerSkinNotes: (customerId: string, notes: string) => void;
  verifyCustomerPhone: (customerId: string) => void;
  toggleServiceActive: (serviceId: string) => void;
  upsertService: (service: Service) => void;
  toggleProductStock: (productId: string) => void;
  upsertProduct: (product: Product) => void;
  updateSettings: (next: SpaSettings) => void;
  updateTiers: (next: MembershipTier[]) => void;
}

const SpaDemoContext = createContext<SpaDemoContextValue | null>(null);

export function SpaDemoProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SpaSettings>(MOCK_SPA_SETTINGS);
  const [tiers, setTiers] = useState<MembershipTier[]>(MOCK_MEMBERSHIP_TIERS);
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>(
    MOCK_POINT_TRANSACTIONS
  );
  const [activeDemoCustomerId, setActiveDemoCustomerId] = useState<string>('cus-gold-01');

  const addAppointment: SpaDemoContextValue['addAppointment'] = (aptInput) => {
    const newApt: Appointment = {
      ...aptInput,
      id: `apt-${Date.now()}`,
      bookingCode: generateBookingCode('MDS'),
      invoiceId: null,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newApt, ...prev]);
    return newApt;
  };

  const updateAppointmentStatus: SpaDemoContextValue['updateAppointmentStatus'] = (
    id,
    status,
    options
  ) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id !== id) return apt;
        return {
          ...apt,
          status,
          startTime: options?.startTime ?? apt.startTime,
          endTime: options?.endTime ?? apt.endTime,
          adminNote: options?.adminNote !== undefined ? options.adminNote : apt.adminNote,
        };
      })
    );

    if (status === 'NO_SHOW') {
      const target = appointments.find((a) => a.id === id);
      if (target?.customerId) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === target.customerId ? { ...c, noShowCount: c.noShowCount + 1 } : c
          )
        );
      }
    }
  };

  const completeInvoiceAndAwardPoints: SpaDemoContextValue['completeInvoiceAndAwardPoints'] = (
    payload
  ) => {
    const customer = customers.find((c) => c.id === payload.customerId);
    const linkedApt = payload.appointmentId
      ? appointments.find((a) => a.id === payload.appointmentId)
      : null;

    const invoiceCode = generateBookingCode('HD');
    const nowIso = new Date().toISOString();
    const tierSnapshot: TierCode = customer?.tierCode ?? 'MEMBER';

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceCode,
      appointmentId: payload.appointmentId,
      bookingCode: linkedApt?.bookingCode ?? null,
      customerId: payload.customerId,
      customerName: customer?.fullName ?? linkedApt?.customerName ?? 'Khách lẻ',
      customerPhone: customer?.phone ?? linkedApt?.customerPhone ?? '',
      tierCodeSnapshot: tierSnapshot,
      serviceSubtotal: payload.serviceSubtotal,
      retailSubtotal: payload.retailSubtotal,
      tierDiscountAmount: payload.tierDiscountAmount,
      pointsRedeemed: payload.pointsRedeemed,
      pointsDiscountAmount: payload.pointsDiscountAmount,
      finalAmount: payload.finalAmount,
      pointsEarned: payload.pointsEarned,
      status: 'PAID',
      voidReason: null,
      createdAt: nowIso,
    };

    setInvoices((prev) => [newInvoice, ...prev]);

    if (payload.appointmentId) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === payload.appointmentId
            ? {
                ...a,
                status: 'COMPLETED',
                invoiceId: newInvoice.id,
                adminNote: payload.adminNote ?? a.adminNote,
              }
            : a
        )
      );
    }

    if (customer) {
      const afterRedeem = Math.max(0, customer.pointsBalance - payload.pointsRedeemed);
      const afterEarn = afterRedeem + payload.pointsEarned;
      const nextTotalSpent = customer.totalSpent + payload.finalAmount;
      const { currentTier: resolvedTier } = resolveTierBySpent(nextTotalSpent, tiers);

      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customer.id
            ? {
                ...c,
                totalSpent: nextTotalSpent,
                pointsBalance: afterEarn,
                tierCode: resolvedTier.code,
              }
            : c
        )
      );

      const newLedgers: PointTransaction[] = [];
      if (payload.pointsRedeemed > 0) {
        newLedgers.push({
          id: `pt-redeem-${Date.now()}`,
          customerId: customer.id,
          invoiceId: newInvoice.id,
          type: 'REDEEM',
          pointsChange: -payload.pointsRedeemed,
          balanceAfter: afterRedeem,
          description: `Đổi ${payload.pointsRedeemed} điểm giảm giá trên hóa đơn ${invoiceCode}`,
          expiresAt: null,
          createdAt: nowIso,
        });
      }
      if (payload.pointsEarned > 0) {
        const expDate = new Date();
        expDate.setMonth(expDate.getMonth() + settings.pointsExpiryMonths);
        newLedgers.push({
          id: `pt-earn-${Date.now() + 1}`,
          customerId: customer.id,
          invoiceId: newInvoice.id,
          type: 'EARN',
          pointsChange: payload.pointsEarned,
          balanceAfter: afterEarn,
          description: `Tích điểm hóa đơn ${invoiceCode} (Thực thu ${payload.finalAmount.toLocaleString('vi-VN')}đ)`,
          expiresAt: expDate.toISOString(),
          createdAt: nowIso,
        });
      }
      if (newLedgers.length > 0) {
        setPointTransactions((prev) => [...newLedgers.reverse(), ...prev]);
      }
    }

    return newInvoice;
  };

  const voidInvoice: SpaDemoContextValue['voidInvoice'] = (invoiceId, reason) => {
    const inv = invoices.find((i) => i.id === invoiceId);
    if (!inv || inv.status === 'VOIDED') return;

    const nowIso = new Date().toISOString();
    setInvoices((prev) =>
      prev.map((i) =>
        i.id === invoiceId ? { ...i, status: 'VOIDED', voidReason: reason } : i
      )
    );

    const customer = customers.find((c) => c.id === inv.customerId);
    if (customer) {
      const netReversal = inv.pointsRedeemed - inv.pointsEarned;
      const updatedBalance = Math.max(0, customer.pointsBalance + netReversal);
      const updatedSpent = Math.max(0, customer.totalSpent - inv.finalAmount);
      const { currentTier } = resolveTierBySpent(updatedSpent, tiers);

      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customer.id
            ? {
                ...c,
                pointsBalance: updatedBalance,
                totalSpent: updatedSpent,
                tierCode: currentTier.code,
              }
            : c
        )
      );

      if (netReversal !== 0) {
        setPointTransactions((prev) => [
          {
            id: `pt-rev-${Date.now()}`,
            customerId: customer.id,
            invoiceId: inv.id,
            type: 'REVERSAL',
            pointsChange: netReversal,
            balanceAfter: updatedBalance,
            description: `Đảo bút toán do hủy hóa đơn ${inv.invoiceCode}: ${reason}`,
            expiresAt: null,
            createdAt: nowIso,
          },
          ...prev,
        ]);
      }
    }
  };

  const adjustCustomerPoints: SpaDemoContextValue['adjustCustomerPoints'] = (
    customerId,
    delta,
    reason
  ) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer || delta === 0) return;

    const nextBalance = Math.max(0, customer.pointsBalance + delta);
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, pointsBalance: nextBalance } : c))
    );
    setPointTransactions((prev) => [
      {
        id: `pt-adj-${Date.now()}`,
        customerId,
        invoiceId: null,
        type: 'ADJUST',
        pointsChange: delta,
        balanceAfter: nextBalance,
        description: reason,
        expiresAt: null,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const updateCustomerSkinNotes: SpaDemoContextValue['updateCustomerSkinNotes'] = (
    customerId,
    notes
  ) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, skinNotes: notes } : c))
    );
  };

  const verifyCustomerPhone: SpaDemoContextValue['verifyCustomerPhone'] = (customerId) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, phoneVerifyStatus: 'VERIFIED' } : c
      )
    );
  };

  const toggleServiceActive: SpaDemoContextValue['toggleServiceActive'] = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const upsertService: SpaDemoContextValue['upsertService'] = (service) => {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      return exists
        ? prev.map((s) => (s.id === service.id ? service : s))
        : [service, ...prev];
    });
  };

  const toggleProductStock: SpaDemoContextValue['toggleProductStock'] = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const upsertProduct: SpaDemoContextValue['upsertProduct'] = (product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [product, ...prev];
    });
  };

  return (
    <SpaDemoContext.Provider
      value={{
        settings,
        tiers,
        services,
        products,
        appointments,
        customers,
        invoices,
        pointTransactions,
        activeDemoCustomerId,
        setActiveDemoCustomerId,
        addAppointment,
        updateAppointmentStatus,
        completeInvoiceAndAwardPoints,
        voidInvoice,
        adjustCustomerPoints,
        updateCustomerSkinNotes,
        verifyCustomerPhone,
        toggleServiceActive,
        upsertService,
        toggleProductStock,
        upsertProduct,
        updateSettings: setSettings,
        updateTiers: setTiers,
      }}
    >
      {children}
    </SpaDemoContext.Provider>
  );
}

export function useSpaDemo() {
  const ctx = useContext(SpaDemoContext);
  if (!ctx) {
    throw new Error('useSpaDemo must be used within SpaDemoProvider');
  }
  return ctx;
}
