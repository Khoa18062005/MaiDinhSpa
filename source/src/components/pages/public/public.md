# Hướng dẫn Thư mục `src/components/pages/public/`

Thư mục này chứa **100% giao diện trang dành cho Khách hàng** của **Mai Đinh Spa** (được import vào các file mỏng tương ứng bên `src/app/(public)/`).

---

## Danh sách 7 file giao diện trang cần tạo tại đây

### 1. `HomePage.tsx` (Trang chủ Landing Page)
- **Props nhận vào:** `{ featuredServices, featuredProducts, spaInfo }`
- **Các khu vực hiển thị từ trên xuống:**
  1. **Hero Section:** Ảnh không gian Mai Đinh Spa ấm cúng, tiêu đề thương hiệu, nút CTA chính **"Đặt lịch hẹn ngay"** dẫn sang `/dat-lich`.
  2. **Giới thiệu ngắn (About Mai Đinh Spa):** Câu chuyện thương hiệu, cam kết mỹ phẩm chính hãng & đội ngũ kỹ thuật viên tận tâm.
  3. **Dịch vụ nổi bật:** Lưới thẻ `<ServiceCard />` (hiển thị giá, thời lượng phút, nút đặt lịch nhanh).
  4. **Sản phẩm nổi bật tại Spa:** Lưới thẻ `<ProductCard />` *(chỉ xem thông tin & bấm tư vấn Zalo, không có giỏ hàng)*.
  5. **Quyền lợi Thành viên Thân thiết:** Khối giới thiệu chương trình tích điểm 4 hạng (Member → Bạc → Vàng → Kim Cương) kèm nút **"Đăng ký thành viên miễn phí"**.
  6. **Cảm nhận khách hàng (Testimonials) & Không gian Spa.**

### 2. `ServicesPage.tsx` (Danh sách Dịch vụ & Bảng giá)
- **Props nhận vào:** `{ categories, services }`
- **Chức năng giao diện (`'use client'`):**
  - Thanh tab lọc nhanh theo nhóm dịch vụ (*Tất cả, Chăm sóc da, Gội đầu dưỡng sinh, Trị liệu cổ vai gáy...*) + ô tìm kiếm tên dịch vụ.
  - Hiển thị danh sách `<ServiceCard />` kèm nút **"Đặt lịch dịch vụ này"** (chuyển sang `/dat-lich?service=slug`).

### 3. `ServiceDetailPage.tsx` (Chi tiết 1 Dịch vụ)
- **Props nhận vào:** `{ service, relatedServices }`
- **Nội dung:** Ảnh lớn, Giá niêm yết / Giá ưu đãi, Thời lượng thực hiện (VD: `75 phút`), Mô tả chi tiết các bước quy trình chuẩn tại Mai Đinh Spa, nút **"Đặt lịch hẹn ngay"** và danh sách dịch vụ gợi ý liên quan.

### 4. `ProductsPage.tsx` (Danh mục Sản phẩm Bán lẻ Trưng bày)
- **Props nhận vào:** `{ categories, products }`
- **Chức năng giao diện (`'use client'`):**
  - Lọc theo nhóm công dụng / thương hiệu.
  - Hiển thị lưới `<ProductCard />` kèm trạng thái *Còn hàng tại Spa* / *Tạm hết hàng* (tuyệt đối không có nút thêm vào giỏ hàng).

### 5. `ProductDetailPage.tsx` (Chi tiết 1 Sản phẩm)
- **Props nhận vào:** `{ product, spaZaloUrl, spaPhone }`
- **Nội dung:** Bộ ảnh sản phẩm, thương hiệu, dung tích, giá bán tại quầy, thành phần & hướng dẫn sử dụng, cùng 2 nút hành động: **"Nhắn Zalo tư vấn"** và **"Gọi Hotline giữ hàng tại Spa"**.

### 6. `BookingPage.tsx` (Màn hình Đặt lịch hẹn Chờ duyệt)
- **Props nhận vào:** `{ services, spaSettings, currentCustomer }`
- **Chức năng giao diện (`'use client'` + `react-hook-form` + `zod`):**
  - **Bước 1:** Chọn 1 hoặc nhiều dịch vụ (tự động cộng tổng thời lượng dự kiến và tổng tiền ước tính).
  - **Bước 2:** Chọn Ngày hẹn trên lịch và Khung giờ bắt đầu (ví dụ `09:00`, `09:30`... trong giờ mở cửa của Spa) + Số lượng khách đi cùng.
  - **Bước 3:** Nhập Họ tên, Số điện thoại (tự điền sẵn nếu `currentCustomer` đã đăng nhập), Lời nhắn ghi chú.
  - Hiển thị rõ dòng thông báo: *"Đặt lịch giữ chỗ miễn phí — Mai Đinh Spa sẽ xác nhận lịch hẹn của bạn trong ít phút."*
  - Bấm gửi → gọi `createBookingAction` trong `@/actions/booking.actions` → hiện màn hình đặt thành công kèm **Mã lịch hẹn** (VD: `MDS-241101`).

### 7. `BookingLookupPage.tsx` (Tra cứu Trạng thái Lịch hẹn)
- **Chức năng giao diện (`'use client'`):**
  - Dành cho khách vãng lai chưa tạo tài khoản: Nhập **Số điện thoại** + **Mã lịch hẹn** để kiểm tra xem Chủ Spa đã chuyển từ `Chờ duyệt` sang `Đã xác nhận` hay chưa.
