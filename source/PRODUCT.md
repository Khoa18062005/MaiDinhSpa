# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Khách hàng nữ & khách chăm sóc sức khỏe địa phương (Guest & Thành viên):** Xem dịch vụ/bảng giá trên điện thoại, đặt lịch hẹn giữ chỗ trước mà không cần thanh toán cọc, tra cứu trạng thái duyệt lịch, và theo dõi hạng thẻ cùng điểm tích lũy sau mỗi lần trải nghiệm tại Mai Đinh Spa.
- **Chủ Mai Đinh Spa (Admin / Lễ tân tại quầy):** Vận hành cơ sở 01 chi nhánh duy nhất; nhận thông báo lịch mới, kiểm duyệt hoặc dời khung giờ hẹn dựa trên sức chứa giường thực tế, chốt hóa đơn thanh toán tại quầy (tách bạch dịch vụ & mỹ phẩm mua lẻ), áp dụng ưu đãi hạng, trừ điểm thưởng và quản lý hồ sơ chăm sóc da khách hàng.

## Product Purpose

Xây dựng nền tảng web chính thức cho **Mai Đinh Spa** kết hợp trang giới thiệu dịch vụ & danh mục mỹ phẩm trưng bày, hệ thống đặt lịch hẹn có kiểm duyệt sức chứa theo thời gian thực, và chương trình tích điểm phân hạng thành viên minh bạch để tăng tỷ lệ khách quay lại định kỳ.

## Positioning

Trải nghiệm đặt lịch Spa 1 chi nhánh không rào cản (không ép tạo tài khoản, không thu cọc online, kiểm soát chồng lấn khung giờ theo thời lượng liệu trình) kết hợp sổ cái tích điểm tách bạch tuyệt đối giữa **Tổng chi tiêu xét hạng trọn đời (`total_spent`)** và **Ví điểm thưởng tiêu dùng (`points_balance`)** — giúp khách đổi điểm giảm giá trực tiếp tại quầy mà không bao giờ bị tụt hạng.

## Operating Context

- Khách hàng đặt lịch trên web → đơn vào trạng thái `PENDING` (Chờ duyệt) → Chủ Spa nhận tin báo Telegram, đối chiếu sức chứa giường và bấm `CONFIRMED` (kèm gửi xác nhận Email / nhắn Zalo 1 chạm).
- Khách đến trải nghiệm xong và thanh toán trực tiếp tại quầy → Chủ Spa lập hóa đơn (`invoices`), tách tiền dịch vụ (áp dụng ưu đãi hạng) và tiền mỹ phẩm bán lẻ, trừ điểm thưởng (tối đa 50% hóa đơn) và cộng điểm mới vào sổ cái.
- Sản phẩm mỹ phẩm trên web chỉ phục vụ tra cứu công dụng, thành phần và giá niêm yết tại Spa kèm nút liên hệ tư vấn Zalo/Hotline (không có giỏ hàng hay giao vận COD).

## Capabilities and Constraints

- **01 chi nhánh duy nhất** của Mai Đinh Spa.
- **Không dùng SMS OTP trả phí:** Xác thực thành viên qua Google OAuth hoặc Email; liên kết hồ sơ tích điểm cũ theo SĐT bắt buộc qua bước xác minh mã lịch hẹn/hóa đơn cũ hoặc xác nhận trực tiếp tại quầy (`PENDING_VERIFY`) để chống chiếm đoạt điểm.
- **Tuân thủ bảo vệ dữ liệu cá nhân:** Ghi chú tình trạng da/dị ứng (`skin_notes`) chỉ hiển thị nội bộ cho Admin; biểu mẫu đặt lịch và đăng ký có xác nhận đồng ý chính sách bảo mật rõ ràng.
- **Tầng dữ liệu tách rời (`src/lib/data/`):** Giai đoạn giao diện vận hành đầy đủ trên dữ liệu mô phỏng (được gắn nhãn minh họa rõ ràng) trước khi chuyển sang Supabase PostgreSQL.

## Brand Commitments

- Thương hiệu: **Mai Đinh Spa** — chăm sóc sắc đẹp, trị liệu thư giãn & tái tạo năng lượng.
- Thẩm mỹ đã chốt theo mẫu tham chiếu của chủ dự án: Nền kem sữa ấm dịu mắt (`#F6F1E9`), chữ & nút hành động chính màu nâu Espresso đậm (`#2B2521`), điểm nhấn vàng đồng trầm, thanh điều hướng viên thuốc nổi ở đầu trang (`Floating Pill Navbar`), bố cục Hero bất đối xứng và cụm nút liên hệ nhanh dọc mép phải.

## Evidence on Hand

- Đặc tả nghiệp vụ và kiến trúc: `documents/MDS.md`, `documents/codebase.md`, `documents/uxui.md`, và báo cáo kiểm toán `documents/report.md`.
- Lưu ý trung thực nội dung: Chưa có bộ ảnh chụp thực tế tại cơ sở và chưa đồng bộ số liệu Google Business Profile thật — mọi con số đánh giá, cảm nhận khách hàng và hình ảnh không gian trong bản dựng giao diện phải được gắn nhãn dữ liệu minh họa rõ ràng, không ngụy tạo thành tuyên bố thực tế.

## Product Principles

1. **Giảm tối đa ma sát đặt hẹn, giữ trọn quyền điều phối cho Chủ Spa:** Khách đặt trong 60 giây trên di động; hệ thống tự khóa khung giờ kín giường hoặc lố giờ đóng cửa trước khi gửi về Chủ Spa duyệt.
2. **Kế toán điểm minh bạch như ngân hàng:** Mọi biến động điểm đều có bút toán sổ cái và hỗ trợ đảo bút toán (`VOID`) khi nhập nhầm hóa đơn tại quầy.
3. **Sang trọng trên trang khách, chuẩn xác trên trang vận hành:** Khu vực công khai truyền tải sự thư thái của không gian Spa; khu vực Thành viên và Admin ưu tiên tốc độ thao tác một chạm trên cả điện thoại lẫn máy tính quầy lễ tân.

## Accessibility & Inclusion

- Mọi cặp màu chữ, phụ đề, placeholder và nhãn trạng thái trên nền kem ấm phải đạt chuẩn tương phản tối thiểu **WCAG AA (≥ 4.5:1)** để khách hàng nữ mọi độ tuổi dễ đọc dưới ánh sáng ngoài trời.
- Vùng chạm nút bấm tối thiểu `44×44px` trên thiết bị di động; tôn trọng cài đặt `prefers-reduced-motion` của trình duyệt.
