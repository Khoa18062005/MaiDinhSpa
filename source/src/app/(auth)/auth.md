# Hướng dẫn Thư mục `src/app/(auth)/`

Nhóm Route Group `(auth)` định tuyến cho các màn hình Đăng nhập, Đăng ký và Bổ sung thông tin định danh thành viên (tiết kiệm 100% chi phí SMS OTP nhờ dùng Google OAuth & Email của Supabase).

---

## Danh sách các file cần tạo trong `src/app/(auth)/`

### 1. `layout.tsx`
- Khung giao diện tối giản canh giữa màn hình kèm Logo Mai Đinh Spa bấm quay về Trang chủ (ẩn thanh menu lớn và footer dài để khách tập trung đăng nhập).

### 2. `dang-nhap/page.tsx` → URL: `/dang-nhap`
- Khai báo `metadata = { title: 'Đăng nhập Thành viên | Mai Đinh Spa' }`.
- Render `<LoginPage />` từ `@/components/pages/auth/LoginPage`.

### 3. `dang-ky/page.tsx` → URL: `/dang-ky`
- Khai báo `metadata = { title: 'Đăng ký Thành viên Thân thiết | Mai Đinh Spa' }`.
- Render `<RegisterPage />` từ `@/components/pages/auth/RegisterPage`.

### 4. `cap-nhat-sdt/page.tsx` → URL: `/cap-nhat-sdt`
- Dùng cho trường hợp khách bấm **"Đăng nhập nhanh bằng Google"** lần đầu tiên (lúc này mới có Email chứ chưa có SĐT).
- Yêu cầu nhập Số điện thoại (để gộp điểm cũ tại quầy nếu từng đến Spa) và Ngày sinh (nhận ưu đãi sinh nhật).
- Render `<UpdatePhonePage />` từ `@/components/pages/auth/UpdatePhonePage`.
