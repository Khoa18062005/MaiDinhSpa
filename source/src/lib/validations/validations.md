# Hướng dẫn Thư mục `src/lib/validations/`

Thư mục này định nghĩa các bộ kiểm tra dữ liệu đầu vào bằng thư viện **Zod** (dùng chung cho cả `react-hook-form` ở giao diện lẫn kiểm tra bảo mật ở `src/actions/`).

---

## Danh sách 3 file Schema cần tạo tại đây

### 1. `auth.schema.ts`
- Quy tắc kiểm tra Số điện thoại Việt Nam chuẩn: `/^(0[3|5|7|8|9])+([0-9]{8})$/` (đúng 10 chữ số, bắt đầu bằng đầu số nhà mạng VN).
- `loginSchema`: Kiểm tra `email` hợp lệ, `password` tối thiểu 6 ký tự.
- `registerSchema`: Kiểm tra `fullName` (2–80 ký tự), `phone`, `email`, `password`, `birthday` (tùy chọn).
- `updatePhoneSchema`: Kiểm tra `phone` và `birthday` khi bổ sung sau Google Login.

### 2. `booking.schema.ts`
- `createBookingSchema`:
  - `serviceIds`: Mảng UUID ít nhất 1 dịch vụ (`min(1, 'Vui lòng chọn ít nhất 1 dịch vụ')`).
  - `appointmentDate`: Ngày hẹn định dạng `YYYY-MM-DD`, không được nhỏ hơn ngày hôm nay.
  - `startTime`: Định dạng `HH:mm` nằm trong khung giờ mở cửa của Mai Đinh Spa.
  - `guestCount`: Số nguyên từ `1` đến `5`.
  - `customerName`: Bắt buộc nhập.
  - `customerPhone`: Đúng chuẩn 10 số Việt Nam.
  - `customerNote`: Tối đa 500 ký tự.
- `completeLoyaltyCheckoutSchema`: Kiểm tra `extraRetailAmount >= 0`, `pointsRedeemed >= 0`, `finalAmount >= 0`.

### 3. `catalog.schema.ts`
- `serviceSchema`: Kiểm tra tên dịch vụ, `slug`, `price >= 0`, `durationMinutes >= 10`.
- `productSchema`: Kiểm tra tên sản phẩm, `slug`, `price >= 0`, thương hiệu, dung tích.
