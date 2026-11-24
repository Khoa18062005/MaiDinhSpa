# Hướng dẫn Thư mục `src/app/` (Tầng Định tuyến Thin Routes)

> **Quy tắc vàng:** Các file trong `src/app/` **chỉ** dùng để khai báo đường dẫn URL, cấu hình SEO (`metadata`), lấy dữ liệu Server ban đầu rồi gọi component tương ứng từ `src/components/pages/` ra hiển thị. Không viết giao diện dài dòng tại đây.

---

## Các file gốc nằm trực tiếp trong `src/app/`

### 1. `globals.css`
- Nạp Tailwind CSS (`@import "tailwindcss";`).
- Khai báo bộ biến màu nhận diện thương hiệu **Mai Đinh Spa** (tông màu Kem ấm `#FAF7F2`, Nâu trầm `#3E2F28`, Vàng đồng `#C5A059`, Xanh lá dịu cho trạng thái xác nhận).

### 2. `layout.tsx` (Root Layout)
- Khai báo thẻ `<html>` (`lang="vi"`) và `<body>`.
- Tải font chữ tiếng Việt sang trọng từ `next/font/google` (gợi ý: **Playfair Display** hoặc **Cormorant Garamond** cho tiêu đề Spa + **Plus Jakarta Sans** hoặc **Be Vietnam Pro** cho nội dung).
- Khai báo `metadata` mặc định toàn trang (Tên thương hiệu Mai Đinh Spa, mô tả chuẩn SEO, ảnh chia sẻ OpenGraph).

### 3. `not-found.tsx`
- Giao diện thân thiện khi khách truy cập đường dẫn không tồn tại (404), có nút quay về Trang chủ `/` hoặc Đặt lịch `/dat-lich`.
