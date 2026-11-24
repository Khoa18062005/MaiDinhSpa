# Hướng dẫn Thư mục `src/lib/notifications/`

Thư mục này chứa các hàm gửi thông báo tự động hoàn toàn miễn phí cho **Chủ Mai Đinh Spa** và **Khách hàng**.

---

## Danh sách 2 file cần tạo tại đây

### 1. `telegram.ts`
- Sử dụng `fetch` tiêu chuẩn gọi tới `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage` (không cần cài thêm thư viện nặng).
- Hàm `sendNewBookingTelegramAlert(booking)`:
  - Định dạng tin nhắn HTML rõ nét gửi về điện thoại Chủ Spa:
    - Mã đơn (`MDS-xxxxxx`)
    - Họ tên & Số điện thoại khách (bấm vào gọi được ngay trên điện thoại)
    - Hạng thành viên hiện tại của khách (nếu là khách quen VIP để Spa tiếp đón chu đáo)
    - Ngày & Giờ hẹn + Danh sách dịch vụ đăng ký + Ghi chú của khách
    - Đường link dẫn thẳng vào `/admin/lich-hen` để Chủ Spa bấm **Duyệt lịch**.
- Lưu ý thiết kế an toàn: Bọc trong `try/catch` để nếu mạng Telegram chập chờn hoặc chưa điền Token lúc chạy thử dưới máy cá nhân thì đơn đặt lịch vẫn lưu vào Database bình thường.

### 2. `email.ts`
- Gọi API của **Resend** (gói miễn phí 3.000 email/tháng).
- `sendBookingConfirmedEmail(toEmail, booking)`: Gửi thư báo *"Mai Đinh Spa xác nhận lịch hẹn của bạn vào lúc..."* khi Chủ Spa bấm Duyệt.
- `sendPointsEarnedEmail(toEmail, summary)`: Gửi thông báo cảm ơn sau khi khách trải nghiệm xong kèm số điểm thưởng vừa cộng và tổng điểm hiện có.
