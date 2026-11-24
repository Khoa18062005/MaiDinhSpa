# Hướng dẫn Thư mục `src/components/shared/`

Thư mục này chứa các component mang tính nghiệp vụ riêng của **Mai Đinh Spa** được tái sử dụng ở từ **2 màn hình trở lên**.

---

## Danh sách 5 file component dùng chung cần tạo tại đây

### 1. `ServiceCard.tsx`
- Hiển thị thẻ thông tin 1 Dịch vụ: Ảnh đại diện, Tên dịch vụ, Thời lượng (VD: `60 phút`), Giá tiền (định dạng `150.000đ`), mô tả ngắn 2 dòng và nút **"Đặt lịch"**. Dùng chung tại `HomePage` và `ServicesPage`.

### 2. `ProductCard.tsx`
- Hiển thị thẻ thông tin 1 Mỹ phẩm bán lẻ: Ảnh sản phẩm, Thương hiệu, Tên sản phẩm, Giá tham khảo, nhãn *Còn hàng tại Spa* và nút **"Xem chi tiết"** *(không có giỏ hàng)*. Dùng chung tại `HomePage` và `ProductsPage`.

### 3. `MembershipTierBadge.tsx`
- Nhãn hiển thị đẹp mắt cho 4 hạng thành viên (`Thành viên`, `Hạng Bạc`, `Hạng Vàng`, `Kim Cương`) với màu sắc và biểu tượng riêng. Dùng ở cả `Navbar`, `MemberDashboardPage`, `AdminBookingsPage` và `AdminCustomersPage`.

### 4. `BookingStatusBadge.tsx`
- Nhãn màu chuẩn hóa cho 5 trạng thái lịch hẹn:
  - `PENDING`: Vàng ấm (*Chờ Spa xác nhận*)
  - `CONFIRMED`: Xanh dương/xanh ngọc (*Đã xác nhận lịch*)
  - `COMPLETED`: Xanh lá (*Đã hoàn thành*)
  - `CANCELLED`: Xám (*Đã hủy*)
  - `NO_SHOW`: Đỏ nhạt (*Khách vắng mặt*)

### 5. `CheckoutLoyaltyModal.tsx`
- Popup quan trọng nhất dành cho Chủ Spa khi bấm hoàn tất thanh toán tại quầy:
  - Tự động lấy tổng tiền dịch vụ đã đặt + ô nhập thêm **Tiền mỹ phẩm/dịch vụ phát sinh tại quầy**.
  - Tự động gợi ý mức giảm giá `%` theo hạng hiện tại của khách.
  - Hiển thị số điểm khả dụng trong ví khách → Chủ Spa nhập số điểm khách muốn dùng để trừ thẳng tiền hóa đơn.
  - Hiển thị xem trước: **Tổng thực thu cuối cùng** và **Số điểm thưởng mới khách sẽ nhận được**, sau đó gọi `completeAppointmentAndLoyaltyAction`.
