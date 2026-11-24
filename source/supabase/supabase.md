# Hướng dẫn Thư mục `supabase/`

Thư mục này lưu trữ toàn bộ kịch bản SQL khởi tạo Cơ sở dữ liệu PostgreSQL trên Supabase cho **Mai Đinh Spa**.

---

## Danh sách các file cần tạo trong `supabase/`

### 1. `schema.sql`
**Nhiệm vụ:** Khởi tạo cấu trúc 9 bảng dữ liệu, khóa ngoại, Index tìm kiếm nhanh, phân quyền bảo mật (RLS) và Stored Procedure / Function cộng trừ điểm an toàn.
- **9 Bảng cần định nghĩa:**
  1. `membership_tiers`: Cấu hình 4 hạng thành viên (`MEMBER`, `SILVER`, `GOLD`, `VIP`), mốc chi tiêu `min_spent`, tỷ lệ tích điểm `points_per_100k`, chiết khấu `discount_percent`.
  2. `customers`: Hồ sơ khách hàng, định danh chính qua `phone` (Unique), liên kết tùy chọn `auth_user_id` tới `auth.users`, lưu độc lập `total_spent` (xét hạng) và `points_balance` (ví điểm tiêu dùng).
  3. `categories`: Phân nhóm Dịch vụ (`SERVICE`) và Sản phẩm (`PRODUCT`).
  4. `services`: Bảng giá dịch vụ, thời lượng `duration_minutes`, cờ `is_featured`.
  5. `products`: Danh mục mỹ phẩm bán lẻ chỉ trưng bày (`in_stock`, không có giỏ hàng).
  6. `appointments`: Đơn đặt lịch hẹn (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`) và thông tin chốt tiền thực thu tại quầy (`final_amount`, `points_redeemed`, `points_earned`).
  7. `appointment_items`: Các dịch vụ con nằm trong một lần đặt lịch.
  8. `point_transactions`: Sổ cái bất biến ghi lại mọi giao dịch cộng/trừ điểm (`EARN`, `REDEEM`, `ADJUST`) kèm `balance_after`.
  9. `spa_settings`: Cấu hình giờ mở cửa, số khách tối đa mỗi khung giờ, tỷ lệ quy đổi điểm (`1 điểm = 1.000đ`).
- **Hàm SQL quan trọng nên viết sẵn (`complete_appointment_and_loyalty`):**
  - Chạy trong 1 Transaction duy nhất: Cập nhật trạng thái lịch hẹn sang `COMPLETED` → Trừ `points_redeemed` (nếu có) → Cộng `final_amount` vào `total_spent` → Cộng `points_earned` vào `points_balance` → Ghi dòng lịch sử vào `point_transactions` → Kiểm tra `total_spent` để tự động cập nhật `tier_id` lên hạng cao hơn nếu đủ điều kiện.

### 2. `seed.sql`
**Nhiệm vụ:** Nạp dữ liệu mẫu ban đầu để chạy thử ngay sau khi tạo bảng.
- Tạo sẵn 4 hạng thành viên mặc định: Thành viên mới (`0đ`), Bạc (`3.000.000đ`), Vàng (`10.000.000đ`), Kim Cương (`25.000.000đ`).
- Tạo sẵn cấu hình `spa_settings` (Mở cửa `08:30` – `20:00`, bước nhảy `30 phút`, `1 điểm = 1.000đ`).
- Tạo sẵn 4–6 dịch vụ nổi bật (Gội đầu dưỡng sinh, Chăm sóc da chuyên sâu, Massage cổ vai gáy...) và 4–6 sản phẩm mỹ phẩm mẫu của Mai Đinh Spa.
