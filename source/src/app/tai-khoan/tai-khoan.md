# Hướng dẫn Thư mục `src/app/tai-khoan/`

Thư mục này định tuyến khu vực **Member Portal** dành cho khách hàng đã đăng nhập tài khoản thành viên của **Mai Đinh Spa**.

---

## Danh sách các file cần tạo trong `src/app/tai-khoan/`

### 1. `layout.tsx`
- Lấy thông tin thành viên đang đăng nhập trên Server (Họ tên, SĐT, Hạng thành viên hiện tại).
- Hiển thị khung gồm `<Navbar />` + `<MemberSidebar />` (menu chuyển đổi giữa Thẻ thành viên, Lịch hẹn của tôi, Lịch sử điểm) + `{children}`.

### 2. `page.tsx` → URL: `/tai-khoan`
- Truy vấn thông tin hồ sơ `customers`, chi tiết hạng hiện tại và hạng kế tiếp trong `membership_tiers`.
- Render `<MemberDashboardPage />` từ `@/components/pages/member/MemberDashboardPage`.

### 3. `lich-hen/page.tsx` → URL: `/tai-khoan/lich-hen`
- Truy vấn toàn bộ danh sách `appointments` của thành viên này (sắp xếp mới nhất lên đầu, kèm chi tiết dịch vụ `appointment_items`).
- Render `<MemberBookingsPage />` từ `@/components/pages/member/MemberBookingsPage`.

### 4. `lich-su-diem/page.tsx` → URL: `/tai-khoan/lich-su-diem`
- Truy vấn sổ cái biến động điểm `point_transactions` của thành viên (`EARN`, `REDEEM`, `ADJUST`).
- Render `<PointHistoryPage />` từ `@/components/pages/member/PointHistoryPage`.
