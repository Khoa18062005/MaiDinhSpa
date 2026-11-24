# Hướng dẫn Thư mục `src/app/api/`

Trong kiến trúc Next.js 15, phần lớn nghiệp vụ được xử lý gọn qua `src/actions/` (Server Actions). Thư mục `src/app/api/` chỉ chứa các HTTP Route Handlers đặc thù cần URL cố định cho bên thứ ba gọi vào hoặc truyền file nhị phân.

---

## Danh sách các file cần tạo trong `src/app/api/`

### 1. `auth/callback/route.ts` → Endpoint: `GET /api/auth/callback`
- **Nhiệm vụ:** Nhận mã xác thực (`code`) trả về sau khi khách bấm **"Đăng nhập bằng Google"** từ Supabase OAuth.
- Đổi `code` lấy phiên đăng nhập (`exchangeCodeForSession`).
- Kiểm tra bảng `customers`:
  - Nếu người dùng đã có hồ sơ đầy đủ SĐT → chuyển hướng về `/tai-khoan`.
  - Nếu người dùng đăng nhập lần đầu chưa có SĐT → chuyển hướng sang `/cap-nhat-sdt` để nhập SĐT đồng bộ điểm thưởng.

### 2. `upload/route.ts` → Endpoint: `POST /api/upload`
- **Nhiệm vụ:** Nhận file hình ảnh từ trình quản trị của Chủ Spa khi đăng Dịch vụ / Mỹ phẩm mới.
- Kiểm tra quyền `ADMIN` trước khi cho phép upload.
- Chuyển ảnh lên **Cloudinary** (tự động nén sang định dạng `.webp`, giới hạn kích thước chiều ngang tối đa `1200px` để tiết kiệm dung lượng Free 25GB) và trả về `secure_url`.
