# Hướng dẫn Thư mục `src/types/`

Thư mục này chứa toàn bộ định nghĩa kiểu dữ liệu TypeScript dùng chung để trình soạn thảo gợi ý code chính xác và bắt lỗi sớm.

---

## Danh sách 2 file cần tạo tại đây

### 1. `database.types.ts`
- Định nghĩa các interface khớp 1-1 với 9 bảng trong PostgreSQL Supabase:
  - `MembershipTier`
  - `Customer`
  - `Category`
  - `Service`
  - `Product`
  - `Appointment`
  - `AppointmentItem`
  - `PointTransaction`
  - `SpaSettings`

### 2. `index.ts`
- Định nghĩa các kiểu dữ liệu kết hợp (Joined Types) và chuẩn phản hồi của Server Actions:
  - `ActionResponse<T = void>`: `{ success: boolean; message?: string; data?: T; fieldErrors?: Record<string, string[]> }`
  - `CustomerWithTier`: Hồ sơ khách hàng kèm chi tiết đối tượng `tier: MembershipTier`.
  - `AppointmentWithDetails`: Đơn lịch hẹn kèm mảng `items: AppointmentItem[]` và thông tin `customer?: CustomerWithTier`.
