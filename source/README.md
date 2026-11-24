# Thư mục gốc `source/` — Mai Đinh Spa

Đây là thư mục gốc chứa toàn bộ mã nguồn Fullstack Next.js của **Mai Đinh Spa**.

## Các file cấu hình tại thư mục gốc
- `package.json`: Khai báo các thư viện cốt lõi (Next.js 15, React 19, Tailwind CSS v4, Supabase, React Hook Form, Zod, Framer Motion, Lucide Icons).
- `tsconfig.json`: Cấu hình TypeScript và bí danh đường dẫn `@/*` trỏ vào `./src/*`.
- `next.config.ts`: Cấu hình Next.js, đã cấp phép sẵn tên miền ảnh `res.cloudinary.com`.
- `postcss.config.mjs`: Bộ biên dịch Tailwind CSS v4.
- `.env.example`: Bản mẫu các khóa môi trường; hãy nhân bản thành `.env.local` và điền thông tin thật khi kết nối dịch vụ.

## Lệnh khởi chạy khi bắt đầu code
```bash
cd source
npm install
npm run dev
```
