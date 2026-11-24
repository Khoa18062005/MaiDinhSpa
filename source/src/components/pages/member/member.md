# Hướng dẫn Thư mục `src/components/pages/member/`

Thư mục này chứa giao diện khu vực **Chăm sóc Thành viên Thân thiết (Member Portal)** khi khách hàng đã đăng nhập.

---

## Danh sách 3 file giao diện trang cần tạo tại đây

### 1. `MemberDashboardPage.tsx` (Thẻ Thành viên Điện tử & Tổng quan)
- **Props nhận vào:** `{ customer, currentTier, nextTier, upcomingAppointments }`
- **Giao diện & Chức năng:**
  - **Thẻ Thành viên Điện tử (Digital Loyalty Card):** Thiết kế sang trọng đổi màu theo hạng (`Member` kem nhạt, `Bạc` ánh bạc, `Vàng` ánh kim, `Kim Cương` nâu đen viền vàng đồng), hiển thị Tên khách, Số điện thoại, Hạng hiện tại và **Số dư điểm thưởng khả dụng** (VD: `120 điểm = 120.000đ`).
  - **Thanh tiến trình thăng hạng (Tier Progress Bar):** Hiển thị `Tổng chi tiêu tích lũy` hiện tại và số tiền còn thiếu để chạm mốc hạng tiếp theo (VD: *"Chi tiêu thêm 850.000đ để lên Hạng Vàng - Giảm 10% mọi dịch vụ"*).
  - Khối hiển thị danh sách quyền lợi của hạng hiện tại & lịch hẹn sắp tới gần nhất.

### 2. `MemberBookingsPage.tsx` (Lịch sử Đặt lịch hẹn của Tôi)
- **Props nhận vào:** `{ appointments }`
- **Giao diện & Chức năng (`'use client'`):**
  - Hiển thị danh sách các lần đặt lịch kèm nhãn trạng thái `<BookingStatusBadge />` (`Chờ duyệt`, `Đã xác nhận`, `Hoàn thành`, `Đã hủy`).
  - Với các lịch đang ở trạng thái `PENDING` (hoặc `CONFIRMED` trước giờ hẹn tối thiểu theo quy định), cho phép khách bấm nút **"Xin hủy lịch"** (gọi `cancelMyBookingAction`).
  - Với lịch đã `COMPLETED`, hiển thị số tiền đã thanh toán và số điểm đã được cộng ở lần ghé Spa đó.

### 3. `PointHistoryPage.tsx` (Sổ cái Lịch sử Cộng / Trừ Điểm)
- **Props nhận vào:** `{ transactions, pointsBalance }`
- **Giao diện:**
  - Bảng lịch sử minh bạch từng giao dịch từ bảng `point_transactions`: Thời gian, Nội dung (VD: *Tích điểm hóa đơn MDS-241101* hoặc *Đổi điểm giảm giá tại quầy*), Biến động (`+15 điểm` màu xanh / `-50 điểm` màu cam) và Số dư sau giao dịch.
