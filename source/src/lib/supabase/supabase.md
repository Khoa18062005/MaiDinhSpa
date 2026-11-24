# Hướng dẫn Thư mục `src/lib/supabase/`

Thư mục này quản lý việc khởi tạo kết nối tới **Supabase (PostgreSQL + Auth)** theo chuẩn `@supabase/ssr` dành cho Next.js 15 App Router.

---

## Danh sách 3 file cần tạo tại đây

### 1. `client.ts`
- Dùng hàm `createBrowserClient` từ `@supabase/ssr` với `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Chỉ gọi trong các Client Components (`'use client'`), ví dụ khi kích hoạt luồng chuyển hướng Đăng nhập bằng Google (`signInWithOAuth`).

### 2. `server.ts`
- Dùng hàm `createServerClient` kết hợp `cookies()` từ `next/headers`.
- Dùng trong toàn bộ các file Route (`src/app/.../page.tsx`) và Server Actions (`src/actions/*.actions.ts`) để đọc dữ liệu và kiểm tra người dùng hiện tại đang đăng nhập.

### 3. `admin.ts`
- Dùng `createClient` từ `@supabase/supabase-js` với khóa đặc quyền `SUPABASE_SERVICE_ROLE_KEY` (tắt lưu session).
- **Tuyệt đối chỉ gọi bên trong Server Actions** cho các tác vụ hệ thống cần bỏ qua RLS (ví dụ: gộp hồ sơ khách vãng lai cũ vào tài khoản thành viên mới hoặc xử lý nâng hạng tự động).
