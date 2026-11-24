# Hướng dẫn Thư mục `src/lib/`

Thư mục `src/lib/` chứa các tiện ích dùng chung và các thư mục con kết nối dịch vụ nền (`supabase/`, `validations/`, `notifications/`).

---

## Các file nằm trực tiếp tại `src/lib/`

### 1. `cloudinary.ts`
- Cấu hình SDK Cloudinary bằng `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (chỉ chạy phía Server).
- Cung cấp hàm `uploadImageToCloudinary(fileBuffer, folder)` để lưu ảnh vào thư mục `maidinhspa/services` hoặc `maidinhspa/products` kèm cờ nén tự động `format: 'webp', quality: 'auto'`.

### 2. `constants.ts`
- Khai báo các hằng số cố định dùng chung toàn dự án:
  - `APPOINTMENT_STATUS`: `'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'` kèm tên tiếng Việt hiển thị.
  - `TIER_CODES`: `'MEMBER' | 'SILVER' | 'GOLD' | 'VIP'`.
  - `DEFAULT_TIME_SLOTS`: Hàm sinh mảng khung giờ đặt lịch (VD: `['08:30', '09:00', ..., '19:30']`) từ giờ mở cửa và đóng cửa.

### 3. `utils.ts`
- `cn(...inputs)`: Hàm gộp class Tailwind CSS chuẩn (kết hợp `clsx` + `tailwind-merge`).
- `formatVND(amount: number)`: Định dạng tiền tệ Việt Nam chuẩn đẹp (VD: `350000` → `'350.000đ'`).
- `formatVNDate(dateStr: string)`: Định dạng ngày tháng chuẩn Việt Nam (`DD/MM/YYYY`).
- `generateBookingCode()`: Sinh mã đặt lịch ngắn gọn dễ đọc qua điện thoại (VD: `MDS-241189`).
