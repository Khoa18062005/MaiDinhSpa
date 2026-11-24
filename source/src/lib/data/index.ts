import {
  Appointment,
  Category,
  ClosedDate,
  Customer,
  Invoice,
  MembershipTier,
  PointTransaction,
  Product,
  Service,
  SpaSettings,
  Testimonial,
} from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_CATEGORIES,
  MOCK_CLOSED_DATES,
  MOCK_CUSTOMERS,
  MOCK_INVOICES,
  MOCK_MEMBERSHIP_TIERS,
  MOCK_POINT_TRANSACTIONS,
  MOCK_PRODUCTS,
  MOCK_SERVICES,
  MOCK_SPA_SETTINGS,
  MOCK_TESTIMONIALS,
} from './mock-db';

/**
 * Tầng truy vấn trung gian (Data Access Layer - khắc phục D-01 trong report.md).
 * Giai đoạn UI-First trả dữ liệu mô phỏng tức thì; Giai đoạn 4 chỉ cần thay thân hàm
 * sang Supabase PostgreSQL mà không phải sửa bất kỳ file Route hay Component nào.
 */

export async function getSpaSettings(): Promise<SpaSettings> {
  return MOCK_SPA_SETTINGS;
}

export async function getMembershipTiers(): Promise<MembershipTier[]> {
  return [...MOCK_MEMBERSHIP_TIERS].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getServiceCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES.filter((c) => c.type === 'SERVICE' && c.isActive);
}

export async function getProductCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES.filter((c) => c.type === 'PRODUCT' && c.isActive);
}

export async function getActiveServices(): Promise<Service[]> {
  return MOCK_SERVICES.filter((s) => s.isActive);
}

export async function getAllServicesForAdmin(): Promise<Service[]> {
  return MOCK_SERVICES;
}

export async function getFeaturedServices(): Promise<Service[]> {
  return MOCK_SERVICES.filter((s) => s.isActive && s.isFeatured);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return MOCK_SERVICES.find((s) => s.slug === slug && s.isActive) ?? null;
}

export async function getActiveProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.isActive);
}

export async function getAllProductsForAdmin(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS.filter((p) => p.isActive && p.isFeatured);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((p) => p.slug === slug && p.isActive) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return MOCK_TESTIMONIALS;
}

export async function getClosedDates(): Promise<ClosedDate[]> {
  return MOCK_CLOSED_DATES;
}

export async function getInitialAppointments(): Promise<Appointment[]> {
  return MOCK_APPOINTMENTS;
}

export async function getCustomers(): Promise<Customer[]> {
  return MOCK_CUSTOMERS;
}

export async function getDemoCurrentMember(): Promise<Customer> {
  return MOCK_CUSTOMERS[0];
}

export async function getMemberAppointments(customerId: string): Promise<Appointment[]> {
  return MOCK_APPOINTMENTS.filter((a) => a.customerId === customerId);
}

export async function getMemberPointTransactions(customerId: string): Promise<PointTransaction[]> {
  return MOCK_POINT_TRANSACTIONS.filter((t) => t.customerId === customerId);
}

export async function getInvoices(): Promise<Invoice[]> {
  return MOCK_INVOICES;
}
