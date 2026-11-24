# Hướng dẫn Thư mục `src/`

Thư mục `src/` là trung tâm mã nguồn của dự án **Mai Đinh Spa**, chứa 5 tầng con (`app/`, `components/`, `actions/`, `lib/`, `types/`) và 1 file bảo vệ ở cấp ngoài cùng.

---

## File nằm trực tiếp tại `src/`

### `middleware.ts`
**Nhiệm vụ:** Làm "người gác cổng" chạy tự động trước mọi request vào trang web (kết hợp cùng `@supabase/ssr`).
- Làm mới phiên đăng nhập (refresh auth token cookie) cho người dùng đã đăng nhập.
- **Bảo vệ phân hệ Thành viên (`/tai-khoan/*`):** Nếu người dùng chưa đăng nhập → tự động chuyển hướng về `/dang-nhap?redirect=/tai-khoan`. Nếu đã đăng nhập bằng Google lần đầu nhưng hồ sơ `customers.phone` còn trống → chuyển hướng sang `/cap-nhat-sdt` để bổ sung SĐT tích điểm.
- **Bảo vệ phân hệ Chủ Spa (`/admin/*`):** Kiểm tra quyền trong bảng `customers.role === 'ADMIN'`. Nếu là khách thường hoặc chưa đăng nhập → chặn ngay và đẩy về trang chủ `/`.
- **Tránh đăng nhập lại (`/dang-nhap`, `/dang-ky`):** Nếu đã đăng nhập rồi thì tự động chuyển thẳng vào `/tai-khoan` (hoặc `/admin` nếu là Chủ Spa).
