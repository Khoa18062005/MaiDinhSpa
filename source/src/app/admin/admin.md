# Hướng dẫn Thư mục `src/app/admin/`

Thư mục này định tuyến khu vực **Admin Portal** dành riêng cho **Chủ Mai Đinh Spa** (được bảo vệ nghiêm ngặt bởi `middleware.ts` — chỉ tài khoản có `role === 'ADMIN'` mới truy cập được).

---

## Danh sách các file cần tạo trong `src/app/admin/`

### 1. `layout.tsx`
- Kiểm tra lại quyền `ADMIN` trên Server (phòng vệ 2 lớp).
- Bọc khung giao diện quản trị gồm `<AdminSidebar />` bên trái (hoặc Drawer trên điện thoại để Chủ Spa duyệt lịch bằng smartphone dễ dàng) + khu vực nội dung `{children}` bên phải.

### 2. `page.tsx` → URL: `/admin`
- Tổng hợp số liệu nhanh trong ngày/tháng: Số lịch đang chờ duyệt (`PENDING`), danh sách khách sắp đến hôm nay (`CONFIRMED`), doanh thu thực thu tháng này, tổng thành viên mới.
- Render `<AdminDashboardPage />` từ `@/components/pages/admin/AdminDashboardPage`.

### 3. `lich-hen/page.tsx` → URL: `/admin/lich-hen`
- Truy vấn danh sách lịch hẹn theo bộ lọc ngày và trạng thái (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`).
- Render `<AdminBookingsPage />` từ `@/components/pages/admin/AdminBookingsPage`.

### 4. `khach-hang/page.tsx` → URL: `/admin/khach-hang`
- Truy vấn danh sách khách hàng thành viên & vãng lai, tìm kiếm nhanh theo Số điện thoại.
- Render `<AdminCustomersPage />` từ `@/components/pages/admin/AdminCustomersPage`.

### 5. `dich-vu/page.tsx` → URL: `/admin/dich-vu`
- Truy vấn toàn bộ danh mục và dịch vụ (kể cả dịch vụ đang tạm ẩn).
- Render `<AdminServicesPage />` từ `@/components/pages/admin/AdminServicesPage`.

### 6. `san-pham/page.tsx` → URL: `/admin/san-pham`
- Truy vấn toàn bộ sản phẩm bán lẻ trưng bày.
- Render `<AdminProductsPage />` từ `@/components/pages/admin/AdminProductsPage`.

### 7. `cai-dat/page.tsx` → URL: `/admin/cai-dat`
- Truy vấn bảng `spa_settings` và `membership_tiers`.
- Render `<AdminSettingsPage />` từ `@/components/pages/admin/AdminSettingsPage`.
