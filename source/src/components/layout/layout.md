# Hướng dẫn Thư mục `src/components/layout/`

Thư mục này chứa các thanh điều hướng và khung bố cục bao ngoài dùng cố định xuyên suốt các trang.

---

## Danh sách 5 file component cần tạo tại đây

### 1. `Navbar.tsx`
- Thanh điều hướng trên cùng cho khách hàng: Logo **Mai Đinh Spa**, các liên kết (`Trang chủ`, `Dịch vụ`, `Sản phẩm`, `Tra cứu lịch`), nút nổi bật **"Đặt lịch hẹn"** và nút **"Tài khoản / Đăng nhập"** (nếu đã đăng nhập thì hiện tên khách + hạng thành viên). Có menu trượt (Drawer) gọn đẹp trên điện thoại.

### 2. `Footer.tsx`
- Chân trang: Giới thiệu ngắn Mai Đinh Spa, Địa chỉ chi nhánh duy nhất kèm khung bản đồ Google Maps, Giờ mở cửa hàng ngày, Hotline & Liên kết Fanpage/Zalo.

### 3. `FloatingContact.tsx`
- Cụm nút tròn nổi cố định ở góc dưới bên phải màn hình khách hàng: Nút **Chat Zalo tư vấn** và nút **Gọi điện nhanh** trên di động.

### 4. `MemberSidebar.tsx`
- Thanh điều hướng của khu vực `/tai-khoan`: Chuyển đổi giữa *Thẻ thành viên*, *Lịch hẹn của tôi*, *Lịch sử điểm* và nút *Đăng xuất*.

### 5. `AdminSidebar.tsx`
- Thanh điều hướng bên trái (và menu rút gọn trên mobile) cho khu vực `/admin` của Chủ Spa, có hiển thị số lượng đơn `Chờ duyệt` màu đỏ nổi bật bên cạnh mục *Lịch hẹn*.
