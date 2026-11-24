# Hướng dẫn Thư mục `src/actions/` (Tầng Xử lý Nghiệp vụ Server)

> **Quy tắc bắt buộc:** Mọi file trong thư mục này phải mở đầu bằng dòng `'use server';`. Các hàm này chạy hoàn toàn trên máy chủ (thay thế cho một Backend API tách rời) và trả về định dạng chuẩn `ActionResponse<T>`.

---

## Danh sách 6 file Server Actions cần tạo tại đây

### 1. `auth.actions.ts`
- `loginWithEmailAction(data)`: Đăng nhập bằng Email & Mật khẩu qua Supabase Auth.
- `registerMemberAction(data)`: Tạo tài khoản Supabase Auth → Tìm trong bảng `customers` theo `phone`:
  - Nếu SĐT đã tồn tại (khách cũ từng đặt lịch vãng lai hoặc được Chủ Spa tạo hồ sơ tại quầy): Gắn `auth_user_id` vào đúng dòng khách hàng đó để **bảo toàn 100% lịch sử chi tiêu và điểm tích lũy cũ**.
  - Nếu SĐT mới hoàn toàn: Tạo dòng `customers` mới với hạng mặc định `MEMBER`.
- `linkPhoneAfterGoogleLoginAction(data)`: Bổ sung SĐT & Ngày sinh cho tài khoản vừa đăng nhập Google lần đầu (áp dụng cùng quy tắc gộp điểm khách cũ như trên).
- `logoutAction()`: Đăng xuất và xóa phiên làm việc.

### 2. `booking.actions.ts`
- `createBookingAction(data)`:
  - Kiểm tra dữ liệu bằng `bookingSchema` + kiểm tra chống spam (không quá 3 lịch `PENDING` trong ngày cho cùng 1 SĐT).
  - Tự động tìm hoặc tạo hồ sơ `customers` theo SĐT.
  - Tạo bản ghi `appointments` với trạng thái mặc định `PENDING` + lưu danh sách dịch vụ vào `appointment_items`.
  - Gọi `sendNewBookingTelegramAlert()` báo ngay về điện thoại Chủ Spa.
- `lookupBookingAction(phone, bookingCode)`: Cho khách vãng lai kiểm tra trạng thái lịch hẹn.
- `cancelMyBookingAction(appointmentId)`: Cho thành viên tự xin hủy lịch khi đang `PENDING` (hoặc trước giờ hẹn quy định).
- `approveOrUpdateBookingStatusAction(appointmentId, newStatus, newTime?, adminNote?)` *(Chỉ `ADMIN`)*:
  - Chủ Spa bấm Duyệt (`CONFIRMED`), Đổi giờ hoặc Hủy (`CANCELLED` / `NO_SHOW`).
  - Nếu chuyển sang `CONFIRMED` và khách có Email → gọi `sendBookingConfirmedEmail()`.

### 3. `loyalty.actions.ts`
- `completeAppointmentAndLoyaltyAction(payload)` *(Chỉ `ADMIN`)*:
  - Xử lý trọn gói khi khách thanh toán tại quầy:
    1. Kiểm tra số dư `points_balance` đủ nếu khách có dùng điểm giảm giá (`points_redeemed > 0`).
    2. Tính số điểm mới `points_earned` dựa trên `final_amount` (số tiền thực thu cuối cùng) và hệ số `points_per_100k` của hạng hiện tại.
    3. Gọi hàm Transaction trên PostgreSQL: Chuyển lịch sang `COMPLETED` → Ghi dòng trừ điểm `REDEEM` (nếu có) → Ghi dòng cộng điểm `EARN` vào `point_transactions` → Cộng `final_amount` vào `total_spent` → Tự động nâng `tier_id` nếu `total_spent` vượt mốc hạng mới!
    4. Gọi `revalidatePath('/admin/lich-hen')` và `revalidatePath('/tai-khoan')`.

### 4. `customer.actions.ts` *(Chỉ `ADMIN`)*
- `updateCustomerSkinNotesAction(customerId, skinNotes)`: Lưu ghi chú tình trạng da / dị ứng của khách.
- `manualAdjustPointsAction(customerId, pointsChange, reason)`: Chủ Spa cộng điểm quà tặng sinh nhật, cộng điểm mua lẻ mỹ phẩm không qua đặt lịch, hoặc điều chỉnh sai sót (ghi loại `ADJUST` vào `point_transactions`).

### 5. `catalog.actions.ts` *(Chỉ `ADMIN`)*
- `upsertCategoryAction`, `toggleCategoryActiveAction`
- `upsertServiceAction`, `toggleServiceStatusAction`
- `upsertProductAction`, `toggleProductStockAction`

### 6. `settings.actions.ts` *(Chỉ `ADMIN`)*
- `updateSpaSettingsAction(settings)`: Cập nhật giờ mở/đóng cửa, số giường tối đa, hotline, link Zalo, tỷ lệ quy đổi điểm.
- `updateMembershipTiersAction(tiers)`: Cập nhật mốc chi tiêu lên hạng, hệ số điểm và `%` ưu đãi của 4 hạng thành viên.
