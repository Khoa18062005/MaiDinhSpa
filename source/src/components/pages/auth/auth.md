# Hướng dẫn Thư mục `src/components/pages/auth/`

Thư mục này chứa giao diện các trang Đăng nhập, Đăng ký và Cập nhật Số điện thoại thành viên của **Mai Đinh Spa**.

---

## Danh sách 3 file giao diện trang cần tạo tại đây

### 1. `LoginPage.tsx` (Trang Đăng nhập)
- **Chỉ thị:** `'use client'`
- **Giao diện & Chức năng:**
  - Nút nổi bật **"Đăng nhập nhanh bằng Google"** (1 chạm qua Supabase OAuth, miễn phí và tiện nhất trên điện thoại).
  - Form đăng nhập bằng `Email` + `Mật khẩu` (kiểm lỗi bằng `loginSchema` từ `@/lib/validations/auth.schema`).
  - Đường dẫn chuyển sang trang Đăng ký `/dang-ky` nếu chưa có tài khoản.

### 2. `RegisterPage.tsx` (Trang Đăng ký Thành viên Thân thiết)
- **Chỉ thị:** `'use client'`
- **Giao diện & Chức năng:**
  - Nút **"Đăng ký nhanh bằng Google"** hoặc Form điền: `Họ và tên`, `Số điện thoại` (10 số VN), `Email`, `Mật khẩu`, `Ngày sinh` (tùy chọn để nhận quà tháng sinh nhật).
  - Gọi `registerAction` trong `@/actions/auth.actions`. Nếu SĐT này trước đây đã từng làm dịch vụ vãng lai tại Mai Đinh Spa, hệ thống tự động nối lịch sử điểm cũ vào tài khoản mới!

### 3. `UpdatePhonePage.tsx` (Trang Bổ sung SĐT sau khi Google Login)
- **Chỉ thị:** `'use client'`
- **Giao diện & Chức năng:**
  - Khi khách lần đầu bấm "Đăng nhập bằng Google", Google chỉ trả về Tên + Email chứ không có Số điện thoại.
  - Trang này yêu cầu khách nhập **Số điện thoại** (chìa khóa để Chủ Spa tra cứu tích điểm tại quầy) và **Ngày sinh**, sau đó gọi `linkPhoneProfileAction` để hoàn tất mở thẻ thành viên.
