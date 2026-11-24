# Hướng dẫn Thư mục `src/components/pages/admin/`

Thư mục này chứa toàn bộ **6 màn hình Quản trị Vận hành** dành riêng cho **Chủ Mai Đinh Spa** (tối ưu dùng tốt trên cả Máy tính tại quầy lễ tân lẫn Điện thoại cá nhân của Chủ Spa).

---

## Danh sách 6 file giao diện trang cần tạo tại đây

### 1. `AdminDashboardPage.tsx` (Tổng quan Vận hành trong Ngày)
- **Nội dung:**
  - 4 thẻ chỉ số chính: **Lịch đang chờ duyệt (`PENDING`)**, **Lịch hẹn hôm nay (`CONFIRMED`)**, **Doanh thu thực thu trong tháng**, **Tổng số thành viên**.
  - Danh sách nhanh các đơn `PENDING` mới nhất để Chủ Spa bấm **"Duyệt ngay"** chỉ với 1 chạm.

### 2. `AdminBookingsPage.tsx` (Quản lý Duyệt Lịch & Chốt Hóa đơn Tích điểm)
- **Nội dung (`'use client'`):**
  - Bộ lọc theo Ngày hẹn, Trạng thái và tìm theo SĐT / Mã đơn.
  - Nút **"Tạo lịch thủ công"** (khi khách gọi điện hoặc đến trực tiếp không qua web).
  - Các hành động trên từng dòng lịch hẹn:
    - Nếu `PENDING`: Nút **Duyệt lịch (`CONFIRMED`)** (cảnh báo nếu khung giờ đó đang trùng nhiều khách), **Đổi giờ hẹn**, hoặc **Từ chối/Hủy**.
    - Nếu `CONFIRMED`: Nút **"Hoàn thành & Tích điểm"** → Mở `<CheckoutLoyaltyModal />` để nhập tiền thực thu tại quầy (dịch vụ + mỹ phẩm mua thêm), áp dụng giảm giá hạng thành viên, trừ điểm thưởng nếu khách muốn dùng, và chốt cộng điểm tự động!

### 3. `AdminCustomersPage.tsx` (Hồ sơ Khách hàng & Tích điểm tại Quầy)
- **Nội dung (`'use client'`):**
  - Ô tìm kiếm tức thời bằng **Số điện thoại** hoặc Tên khách.
  - Xem chi tiết từng khách: Hạng hiện tại, Tổng chi tiêu tích lũy (`total_spent`), Số dư điểm (`points_balance`), Lịch sử đến Spa.
  - Ô cập nhật **Ghi chú chuyên môn (`skin_notes`)**: Lưu tình trạng da, loại tinh dầu yêu thích, lưu ý dị ứng.
  - Nút **"Điều chỉnh / Tặng điểm"** (dùng khi tặng điểm sinh nhật hoặc khách ghé mua lẻ mỹ phẩm không đặt lịch trước).

### 4. `AdminServicesPage.tsx` (Quản lý Dịch vụ & Bảng giá)
- **Nội dung (`'use client'`):**
  - Bảng danh sách dịch vụ + Modal Thêm mới / Chỉnh sửa dịch vụ (Tên, Nhóm danh mục, Giá niêm yết, Giá khuyến mãi, Thời lượng phút, Upload ảnh lên Cloudinary, Bật/Tắt hiển thị nổi bật trên Trang chủ, Tạm ẩn dịch vụ).

### 5. `AdminProductsPage.tsx` (Quản lý Sản phẩm Bán lẻ Trưng bày)
- **Nội dung (`'use client'`):**
  - Bảng danh sách mỹ phẩm + Modal Thêm mới / Chỉnh sửa sản phẩm (Tên, Thương hiệu, Dung tích, Giá tham khảo, Công dụng, Upload ảnh, Công tắc gạt nhanh *Còn hàng tại Spa* / *Tạm hết hàng*).

### 6. `AdminSettingsPage.tsx` (Cấu hình Spa & Công thức Tích điểm)
- **Nội dung (`'use client'`):**
  - **Tab 1 — Thông tin & Giờ mở cửa:** Địa chỉ, Hotline, Link Zalo, Giờ mở/đóng cửa, Số khách tối đa nhận cùng 1 khung giờ.
  - **Tab 2 — Hạng thành viên & Tích điểm:** Chỉnh sửa mốc tiền lên hạng (`min_spent`), số điểm cộng trên mỗi `100.000đ` (`points_per_100k`), `%` giảm giá từng hạng và giá trị quy đổi `1 điểm = bao nhiêu VNĐ`.
