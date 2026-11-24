# Hướng dẫn Thư mục `src/components/ui/`

Thư mục này dành riêng cho các thành phần giao diện nguyên tử (Atomic UI Components) được sinh tự động từ bộ thư viện **shadcn/ui** (không viết logic nghiệp vụ Spa trực tiếp vào các file này).

---

## Cách cài đặt và thêm các file UI chuẩn vào thư mục này

Đứng tại thư mục `source/`, chạy lệnh khởi tạo lần đầu:
```bash
npx shadcn@latest init
```

Sau đó tải toàn bộ các thành phần cần dùng cho dự án Mai Đinh Spa bằng 1 câu lệnh:
```bash
npx shadcn@latest add button input label textarea select dialog calendar popover badge card table tabs switch sonner
```

## Các file sẽ được tạo tự động trong `src/components/ui/`
- `button.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `select.tsx`, `switch.tsx`: Dùng cho các biểu mẫu Đặt lịch và Quản trị.
- `calendar.tsx`, `popover.tsx`: Bộ lịch chọn ngày hẹn trực quan.
- `dialog.tsx`: Khung cửa sổ Popup duyệt lịch và chốt hóa đơn tích điểm.
- `card.tsx`, `badge.tsx`, `tabs.tsx`, `table.tsx`: Khung thẻ, nhãn trạng thái, thanh chuyển tab và bảng dữ liệu Admin.
- `sonner.tsx`: Hiển thị thông báo nhỏ góc màn hình (Toast) khi đặt lịch hoặc lưu cài đặt thành công.
