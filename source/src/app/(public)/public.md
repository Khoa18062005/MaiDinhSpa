# Hướng dẫn Thư mục `src/app/(public)/`

Nhóm Route Group `(public)` chứa toàn bộ các đường dẫn công khai dành cho khách hàng ghé thăm website **Mai Đinh Spa** (cặp ngoặc tròn `(public)` giúp gom nhóm gọn gàng mà không xuất hiện chữ `/public` trên thanh địa chỉ trình duyệt).

---

## Danh sách các file cần tạo trong `src/app/(public)/`

### 1. `layout.tsx`
- Bọc khung giao diện khách hàng dùng chung: `<Navbar />` ở đầu trang + `{children}` ở giữa + `<FloatingContact />` (nút Zalo/Hotline nổi) + `<Footer />` ở cuối trang.

### 2. `page.tsx` → URL: `/`
- Lấy danh sách Dịch vụ nổi bật (`is_featured = true`), Sản phẩm nổi bật (`is_featured = true`) và thông tin cấu hình Spa từ Supabase.
- Render `<HomePage />` từ `@/components/pages/public/HomePage`.

### 3. `dich-vu/page.tsx` → URL: `/dich-vu`
- Khai báo `metadata = { title: 'Bảng giá & Dịch vụ | Mai Đinh Spa' }`.
- Lấy danh mục dịch vụ và toàn bộ dịch vụ đang hoạt động (`is_active = true`).
- Render `<ServicesPage />` từ `@/components/pages/public/ServicesPage`.

### 4. `dich-vu/[slug]/page.tsx` → URL: `/dich-vu/[slug]`
- Sinh `generateMetadata` động theo tên dịch vụ để chuẩn SEO Google khi chia sẻ link từng gói dịch vụ.
- Tìm dịch vụ theo `slug` (nếu không có gọi `notFound()`).
- Render `<ServiceDetailPage />` từ `@/components/pages/public/ServiceDetailPage`.

### 5. `san-pham/page.tsx` → URL: `/san-pham`
- Khai báo `metadata = { title: 'Sản phẩm Chăm sóc tại Spa | Mai Đinh Spa' }`.
- Lấy danh mục mỹ phẩm và các sản phẩm bán lẻ trưng bày.
- Render `<ProductsPage />` từ `@/components/pages/public/ProductsPage`.

### 6. `san-pham/[slug]/page.tsx` → URL: `/san-pham/[slug]`
- Sinh `generateMetadata` động theo tên sản phẩm.
- Render `<ProductDetailPage />` từ `@/components/pages/public/ProductDetailPage`.

### 7. `dat-lich/page.tsx` → URL: `/dat-lich`
- Lấy danh sách dịch vụ đang mở, cấu hình giờ làm việc `spa_settings`, và thông tin tài khoản (nếu khách đã đăng nhập để tự điền sẵn Họ tên + SĐT).
- Nhận query param tùy chọn `?service=slug-dich-vu` để tự tích chọn sẵn dịch vụ khách vừa bấm từ trang trước.
- Render `<BookingPage />` từ `@/components/pages/public/BookingPage`.

### 8. `tra-cuu-lich/page.tsx` → URL: `/tra-cuu-lich`
- Khai báo `metadata = { title: 'Tra cứu Lịch hẹn | Mai Đinh Spa' }`.
- Render `<BookingLookupPage />` từ `@/components/pages/public/BookingLookupPage`.
