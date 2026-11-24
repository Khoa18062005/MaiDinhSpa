# TÀI LIỆU ĐẶC TẢ NGHIỆP VỤ & HƯỚNG DẪN KỸ THUẬT — MAI ĐINH SPA (MDS)

> **Tên dự án:** Hệ thống Website Giới thiệu, Đặt lịch hẹn & Chăm sóc Thành viên **Mai Đinh Spa**  
> **Phiên bản:** 1.0  
> **Mô hình vận hành:** 01 Chi nhánh duy nhất  
> **Định hướng kỹ thuật:** Next.js Fullstack + Supabase + Vercel (Tối ưu chi phí vận hành 0đ/tháng)

---

## MỤC LỤC
1. [Tổng quan & Phạm vi Dự án](#1-tổng-quan--phạm-vi-dự-án)
2. [Phân tích Tác nhân (Actors)](#2-phân-tích-tác-nhân-actors)
3. [Đặc tả Nghiệp vụ Cốt lõi (Business Requirements)](#3-đặc-tả-nghiệp-vụ-cốt-lõi-business-requirements)
4. [Kiến trúc Kỹ thuật & Tech Stack Tiết kiệm Chi phí](#4-kiến-trúc-kỹ-thuật--tech-stack-tiết-kiệm-chi-phí)
5. [Thiết kế Cơ sở Dữ liệu (Database Schema)](#5-thiết-kế-cơ-sở-dữ-liệu-database-schema)
6. [Sơ đồ Trang & Cấu trúc Thư mục Source Code](#6-sơ-đồ-trang--cấu-trúc-thư-mục-source-code)
7. [Hướng dẫn Chuẩn bị Dịch vụ & Biến Môi trường](#7-hướng-dẫn-chuẩn-bị-dịch-vụ--biến-môi-trường)
8. [Lộ trình Triển khai (Implementation Roadmap)](#8-lộ-trình-triển-khai-implementation-roadmap)

---

## 1. Tổng quan & Phạm vi Dự án

### 1.1. Mục tiêu hệ thống
Xây dựng website chính thức cho **Mai Đinh Spa** với giao diện sang trọng, chuẩn SEO trên Google, tối ưu trải nghiệm trên điện thoại di động, giúp:
- Quảng bá thương hiệu, không gian, bảng giá dịch vụ và danh mục sản phẩm bán lẻ của Spa.
- Cho phép khách hàng đặt lịch hẹn trực tuyến nhanh chóng và chủ Spa duyệt lịch tập trung.
- Giữ chân khách hàng quay lại thông qua hệ thống **Tài khoản Thành viên & Tích điểm Phân hạng (Loyalty System)**.

### 1.2. Phạm vi chức năng (Scope Matrix)

| Hạng mục | Trong phạm vi (In-Scope) | Ngoài phạm vi (Out-of-Scope) |
| :--- | :--- | :--- |
| **Chi nhánh** | Quản lý tập trung cho **01 chi nhánh duy nhất** của Mai Đinh Spa. | Quản lý chuỗi đa chi nhánh, điều chuyển nhân sự giữa các cơ sở. |
| **Sản phẩm bán lẻ** | Trưng bày danh mục, hình ảnh, công dụng, giá bán và nút liên hệ tư vấn (Zalo/Hotline). | Giỏ hàng (Cart), đặt hàng ship COD, tính phí vận chuyển. |
| **Đặt lịch hẹn** | Khách gửi yêu cầu đặt lịch → Trạng thái `Chờ duyệt` → Chủ Spa xác nhận hoặc đổi giờ. | Tự động chốt lịch không qua kiểm duyệt của Chủ Spa. |
| **Thanh toán** | Đặt lịch miễn phí 100% trên web; khách thanh toán trực tiếp tại quầy sau khi làm dịch vụ. | Cổng thanh toán trực tuyến (VNPay/Momo/Thẻ), thu tiền cọc trước trên web. |
| **Thành viên & Tích điểm** | Đăng ký/Đăng nhập tài khoản, tích điểm khi hoàn tất hóa đơn tại Spa, phân hạng thành viên, đổi điểm trừ tiền tại quầy. | SMS OTP trả phí (thay bằng Google Login & Email miễn phí). |

---

## 2. Phân tích Tác nhân (Actors)

1. **Khách vãng lai (Guest):**
   - Xem trang chủ Landing Page, chi tiết các dịch vụ và sản phẩm bán lẻ.
   - Đặt lịch hẹn nhanh bằng Họ tên + Số điện thoại (không bắt buộc tạo tài khoản).
   - Tra cứu trạng thái lịch hẹn bằng Số điện thoại + Mã lịch hẹn.
2. **Khách hàng Thành viên (Member):**
   - Bao gồm toàn bộ quyền của Khách vãng lai.
   - Đăng ký / Đăng nhập tài khoản (Google 1 chạm hoặc Email/Mật khẩu).
   - Đặt lịch hẹn tự động điền sẵn thông tin cá nhân & hiển thị hạng thành viên cho Chủ Spa biết.
   - Xem **Thẻ thành viên điện tử**: Hạng hiện tại, tiến trình lên hạng tiếp theo, số dư điểm thưởng, lịch sử hẹn và lịch sử cộng/trừ điểm.
3. **Chủ Spa / Quản trị viên (Admin):**
   - Nhận thông báo tức thời qua Telegram khi có khách đăng ký lịch hẹn mới.
   - Duyệt / Từ chối / Đổi giờ lịch hẹn; tạo lịch hẹn thủ công cho khách gọi điện hoặc đến trực tiếp.
   - Xác nhận **Hoàn thành lịch hẹn**, nhập tổng tiền thực thu tại quầy (bao gồm dịch vụ phát sinh + mỹ phẩm mua thêm) để hệ thống tự động tích điểm & xét hạng.
   - Thực hiện trừ điểm thưởng cho khách ngay trên màn hình thanh toán tại quầy.
   - Quản trị nội dung: Dịch vụ, Sản phẩm bán lẻ, Banner, Giờ mở cửa, Cấu hình tỷ lệ tích điểm & Hạng thành viên.

---

## 3. Đặc tả Nghiệp vụ Cốt lõi (Business Requirements)

### 3.1. Module Landing Page & Danh mục (Public Web)
- **Trang chủ (Landing Page):**
  - *Hero Section:* Hình ảnh không gian Mai Đinh Spa, thông điệp thương hiệu, nút kêu gọi hành động (CTA) **"Đặt lịch hẹn ngay"**.
  - *Giới thiệu (About Us):* Câu chuyện thương hiệu, thế mạnh tay nghề, cam kết chất lượng.
  - *Dịch vụ nổi bật:* Hiển thị các gói dịch vụ chủ lực kèm **Giá niêm yết**, **Thời lượng thực hiện (phút)** và nút **"Đặt lịch"**.
  - *Sản phẩm bán lẻ nổi bật:* Hiển thị hình ảnh, tên sản phẩm, giá tham khảo, nhãn *"Bán tại Spa"* (chỉ xem chi tiết & bấm nút **"Tư vấn qua Zalo"** — không có nút Thêm vào giỏ hàng).
  - *Đánh giá khách hàng (Testimonials) & Không gian Spa (Gallery).*
  - *Chân trang (Footer):* Địa chỉ Mai Đinh Spa (nhúng Google Maps), Giờ mở cửa, Hotline, Zalo, Fanpage.
- **Trang Danh sách & Chi tiết Dịch vụ (`/dich-vu`, `/dich-vu/[slug]`):** Lọc theo nhóm dịch vụ (VD: *Chăm sóc da, Gội đầu dưỡng sinh, Massage trị liệu...*), mô tả quy trình các bước thực hiện.
- **Trang Danh sách & Chi tiết Sản phẩm (`/san-pham`, `/san-pham/[slug]`):** Lọc theo thương hiệu/công dụng, hiển thị thành phần, hướng dẫn sử dụng và nút liên hệ tư vấn.

---

### 3.2. Module Đặt lịch hẹn & Duyệt lịch (Booking Workflow)

#### Quy trình luồng trạng thái lịch hẹn
```mermaid
flowchart LR
    A["Khách gửi form đặt lịch"] --> B["PENDING (Chờ Chủ Spa duyệt)"]
    B -->|Chủ Spa đồng ý| C["CONFIRMED (Đã xác nhận)"]
    B -->|Hết chỗ / Khách báo hủy| D["CANCELLED (Đã hủy)"]
    C -->|Khách đến làm xong & Thanh toán| E["COMPLETED (Hoàn thành + Tích điểm)"]
    C -->|Quá giờ hẹn khách không đến| F["NO_SHOW (Vắng mặt)"]
    C -->|Khách xin hủy trước giờ hẹn| D
```

#### Quy tắc nghiệp vụ (Business Rules - Booking)
- **BR-B01 (Thông tin đặt lịch):** Khách chọn 1 hoặc nhiều dịch vụ → Chọn Ngày hẹn → Chọn Khung giờ (ví dụ mỗi nấc 30 phút trong giờ mở cửa của Spa) → Chọn số lượng khách đi cùng (mặc định 1 người) → Nhập Họ tên, Số điện thoại, Ghi chú sức khỏe/yêu cầu riêng.
- **BR-B02 (Không thu tiền trước):** Form đặt lịch hiển thị rõ *"Đặt lịch giữ chỗ miễn phí — Thanh toán trực tiếp tại Mai Đinh Spa sau khi trải nghiệm dịch vụ"*.
- **BR-B03 (Chờ duyệt):** Mọi lịch đặt từ website đều mang trạng thái mặc định `PENDING`. Hệ thống gửi tin nhắn Telegram về máy Chủ Spa trong vòng < 3 giây.
- **BR-B04 (Kiểm soát quá tải):** Khi Chủ Spa xem một lịch `PENDING`, màn hình Admin sẽ hiển thị cảnh báo nếu khung giờ đó đã có nhiều lịch `CONFIRMED` trùng nhau để Chủ Spa chủ động gọi khách thương lượng giờ khác trước khi bấm duyệt.
- **BR-B05 (Chống spam):** Một số điện thoại không được tạo quá 3 lịch hẹn đang ở trạng thái `PENDING` trong cùng một ngày.

---

### 3.3. Module Tài khoản & Tích điểm Hạng Thành viên (Loyalty & Membership)

#### A. Cơ chế Định danh & Đồng bộ Điểm qua Số điện thoại
- **BR-L01 (Đăng ký tiết kiệm 0đ OTP):** Hỗ trợ đăng ký/đăng nhập qua **Google OAuth** hoặc **Email + Mật khẩu**. Sau khi đăng nhập lần đầu, hệ thống yêu cầu bổ sung **Số điện thoại** (duy nhất) và **Ngày sinh**.
- **BR-L02 (Liên kết Khách vãng lai → Thành viên):**
  - Hồ sơ tích điểm tại Spa có thể được gắn với **Số điện thoại** ngay cả khi khách chưa đăng ký tài khoản web (Chủ Spa tạo hồ sơ khách tại quầy).
  - Khi khách đăng ký tài khoản web và xác nhận Số điện thoại trùng khớp (hoặc Chủ Spa bấm liên kết trên Admin), toàn bộ lịch sử chi tiêu và điểm tích lũy trước đó được giữ nguyên.

#### B. Tách bạch 2 loại chỉ số điểm (Tránh lỗi tụt hạng khi đổi quà)
Hệ thống lưu trữ độc lập 2 trường dữ liệu cho mỗi khách hàng:
1. **`total_spent` (Tổng chi tiêu tích lũy - VNĐ):** Chỉ cộng dồn tăng lên mỗi khi hoàn thành hóa đơn. Dùng làm căn cứ duy nhất để **xét thăng hạng thành viên**. Khi khách dùng điểm để giảm giá hóa đơn, `total_spent` **không bị trừ đi**.
2. **`points_balance` (Số dư điểm khả dụng - Điểm):** Tăng lên khi hoàn thành hóa đơn và giảm xuống khi khách dùng điểm trừ tiền tại quầy.

#### C. Bảng cấu hình Hạng Thành viên mặc định (Chủ Spa có thể chỉnh sửa trong Admin)

| Mã hạng | Tên hạng | Mốc chi tiêu tích lũy (`total_spent`) | Tỷ lệ tích điểm | Ưu đãi mặc định trên Dịch vụ |
| :--- | :--- | :--- | :--- | :--- |
| `MEMBER` | **Thành viên mới** | Từ `0đ` | `100.000đ` = **1 điểm** | Tích điểm tiêu chuẩn |
| `SILVER` | **Hạng Bạc** | Từ `3.000.000đ` | `100.000đ` = **2 điểm** | Giảm **5%** dịch vụ |
| `GOLD` | **Hạng Vàng** | Từ `10.000.000đ` | `100.000đ` = **3 điểm** | Giảm **10%** dịch vụ + Ưu đãi tháng sinh nhật |
| `VIP` | **Hạng Kim Cương** | Từ `25.000.000đ` | `100.000đ` = **5 điểm** | Giảm **15%** dịch vụ + Ưu tiên khung giờ cao điểm |

- **Quy đổi khi tiêu điểm (Redeem Rate):** Mặc định `1 điểm = 1.000đ` trừ trực tiếp vào hóa đơn lần sau (Chủ Spa có thể thay đổi tỷ lệ này trong phần Cài đặt).

#### D. Quy tắc Cộng điểm & Trừ điểm an toàn
- **BR-L03 (Thời điểm cộng điểm):** Điểm và Tổng chi tiêu **CHỈ** được cộng khi Chủ Spa chuyển lịch hẹn sang `COMPLETED` (hoặc tạo Hóa đơn tại quầy cho khách mua lẻ sản phẩm/không đặt trước).
- **BR-L04 (Tính điểm trên số tiền thực thu):**
  - Giả sử tổng hóa đơn dịch vụ + sản phẩm mua thêm là `700.000đ`.
  - Khách Hạng Bạc được giảm 5% dịch vụ còn `665.000đ`, và khách dùng thêm `65 điểm` (`65.000đ`) để trừ tiếp → **Số tiền thực thu cuối cùng (`final_amount`) = `600.000đ`**.
  - Hệ thống trừ `65 điểm` khỏi ví, cộng `600.000đ` vào `total_spent`, và cộng điểm thưởng mới tính trên `600.000đ` (làm tròn xuống theo bội số 100.000đ).
- **BR-L05 (Sổ cái điểm - Point Ledger):** Mọi biến động điểm (`EARN` - tích điểm, `REDEEM` - tiêu điểm, `ADJUST` - chủ Spa điều chỉnh tay/tặng điểm sinh nhật) bắt buộc phải ghi thành 1 dòng lịch sử trong bảng `point_transactions` kèm lý do rõ ràng, chạy trong **Database Transaction** để không bao giờ lệch số dư.

---

## 4. Kiến trúc Kỹ thuật & Tech Stack Tiết kiệm Chi phí

### 4.1. Bảng tổng hợp Tech Stack ("0đ Server / tháng")

| Tầng công nghệ | Lựa chọn | Vai trò trong dự án Mai Đinh Spa | Gói miễn phí (Free Tier) |
| :--- | :--- | :--- | :--- |
| **Fullstack Framework** | **Next.js 15 (App Router) + TypeScript** | Render giao diện chuẩn SEO (SSR/SSG) + Xử lý API Backend/Server Actions chung 1 project. | Mã nguồn mở (0đ) |
| **Giao diện (UI/UX)** | **Tailwind CSS + shadcn/ui + Framer Motion** | Thiết kế giao diện Spa thanh lịch, responsive mượt trên Mobile, Admin Dashboard gọn gàng. | Mã nguồn mở (0đ) |
| **Form & Validation** | **React Hook Form + Zod** | Kiểm tra dữ liệu đầu vào chặt chẽ ở cả trình duyệt và server. | Mã nguồn mở (0đ) |
| **Database & Auth** | **Supabase (PostgreSQL + Auth)** | Lưu trữ dữ liệu quan hệ, đăng nhập Google/Email, phân quyền bảo mật (RLS). | Free 500MB DB + 50.000 MAU |
| **ORM** | **Drizzle ORM** (hoặc Supabase Client) | Tương tác Database an toàn kiểu dữ liệu (Type-safe), quản lý Migration dễ dàng. | Mã nguồn mở (0đ) |
| **Lưu trữ Hình ảnh** | **Cloudinary** | Lưu trữ và tự động nén ảnh Dịch vụ / Sản phẩm sang chuẩn WebP siêu nhẹ. | Free 25GB lưu trữ & băng thông |
| **Thông báo Chủ Spa** | **Telegram Bot API** | Bắn tin nhắn báo lịch hẹn mới về điện thoại Chủ Spa ngay lập tức. | Miễn phí hoàn toàn (0đ) |
| **Thông báo Email** | **Resend** | Gửi email xác nhận khi lịch hẹn được Chủ Spa duyệt. | Free 3.000 email/tháng |
| **Hosting & Deploy** | **Vercel** | Tự động build & deploy từ GitHub, cấp sẵn chứng chỉ bảo mật HTTPS/SSL. | Free gói Hobby (0đ) |

> **Chi phí thực tế:** Toàn bộ hạ tầng kỹ thuật = **0đ/tháng**. Chỉ phát sinh phí mua tên miền riêng (VD: `maidinhspa.vn` hoặc `maidinhspa.com` khoảng 250.000đ – 350.000đ/năm) khi chính thức ra mắt.

### 4.2. Sơ đồ Kiến trúc Hệ thống
```mermaid
flowchart TD
    Guest["Khách hàng (Mobile / Desktop)"] --> NextApp["Next.js App Router (Vercel)"]
    Admin["Chủ Mai Đinh Spa (Admin UI)"] --> NextApp
    NextApp --> SupaAuth["Supabase Auth (Google / Email)"]
    NextApp --> SupaDB["Supabase PostgreSQL (Lịch hẹn, Thành viên, Điểm)"]
    NextApp --> Cloud["Cloudinary CDN (Ảnh Dịch vụ & Mỹ phẩm)"]
    NextApp --> Tele["Telegram Bot (Báo lịch chờ duyệt cho Chủ Spa)"]
    NextApp --> Resend["Resend Email (Báo duyệt lịch & Điểm thưởng cho Khách)"]
```

---

## 5. Thiết kế Cơ sở Dữ liệu (Database Schema)

### Sơ đồ Quan hệ Thực thể (ERD)
```mermaid
erDiagram
    MEMBERSHIP_TIERS ||--o{ CUSTOMERS : "xếp hạng"
    CUSTOMERS ||--o{ APPOINTMENTS : "đặt lịch"
    CUSTOMERS ||--o{ POINT_TRANSACTIONS : "lịch sử điểm"
    APPOINTMENTS ||--|{ APPOINTMENT_ITEMS : "bao gồm"
    SERVICES ||--o{ APPOINTMENT_ITEMS : "được chọn"
    CATEGORIES ||--o{ SERVICES : "phân loại"
    CATEGORIES ||--o{ PRODUCTS : "phân loại"
    APPOINTMENTS ||--o{ POINT_TRANSACTIONS : "phát sinh điểm"
```

### Chi tiết các Bảng cốt lõi (PostgreSQL)

#### 1. `membership_tiers` (Cấu hình Hạng thành viên)
- `id` (UUID, PK)
- `code` (VARCHAR, Unique): `MEMBER`, `SILVER`, `GOLD`, `VIP`
- `name` (VARCHAR): Tên hiển thị (VD: *Hạng Vàng*)
- `min_spent` (BIGINT): Mốc tổng chi tiêu tối thiểu để đạt hạng (VNĐ)
- `points_per_100k` (INT): Số điểm cộng cho mỗi 100.000đ thực thu
- `discount_percent` (NUMERIC): Phần trăm giảm giá dịch vụ (0 – 100)
- `benefits_desc` (TEXT): Mô tả quyền lợi hiển thị trên thẻ thành viên
- `sort_order` (INT): Thứ tự cấp bậc

#### 2. `customers` (Hồ sơ Khách hàng & Thành viên)
- `id` (UUID, PK)
- `auth_user_id` (UUID, Nullable, Unique): Liên kết tới `auth.users` của Supabase (Null nếu khách mới đặt vãng lai chưa tạo tài khoản; có giá trị khi khách đã đăng ký tài khoản)
- `phone` (VARCHAR(15), Unique, Indexed): Số điện thoại định danh duy nhất tại Spa
- `full_name` (VARCHAR)
- `email` (VARCHAR, Nullable)
- `birthday` (DATE, Nullable)
- `role` (VARCHAR): `CUSTOMER` | `ADMIN`
- `tier_id` (UUID, FK → `membership_tiers.id`)
- `total_spent` (BIGINT, Default `0`): Tổng chi tiêu tích lũy xét hạng (chỉ tăng)
- `points_balance` (INT, Default `0`): Số dư điểm thưởng hiện tại (dùng để tiêu)
- `skin_notes` (TEXT, Nullable): Ghi chú chuyên môn của Chủ Spa (tình trạng da, dị ứng, sở thích)
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### 3. `categories` (Danh mục Dịch vụ & Sản phẩm)
- `id` (UUID, PK)
- `name` (VARCHAR)
- `slug` (VARCHAR, Unique)
- `type` (VARCHAR): `SERVICE` | `PRODUCT`
- `sort_order` (INT)
- `is_active` (BOOLEAN, Default `true`)

#### 4. `services` (Dịch vụ tại Spa)
- `id` (UUID, PK)
- `category_id` (UUID, FK → `categories.id`)
- `name` (VARCHAR)
- `slug` (VARCHAR, Unique)
- `short_desc` (VARCHAR): Mô tả ngắn hiển thị ngoài thẻ
- `content` (TEXT): Nội dung chi tiết, quy trình các bước
- `price` (BIGINT): Giá niêm yết (VNĐ)
- `sale_price` (BIGINT, Nullable): Giá khuyến mãi nếu có
- `duration_minutes` (INT): Thời lượng thực hiện (VD: 60, 90)
- `thumbnail_url` (TEXT)
- `is_featured` (BOOLEAN): Hiển thị nổi bật ngoài Landing Page
- `is_active` (BOOLEAN, Default `true`)
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### 5. `products` (Sản phẩm bán lẻ — Chỉ trưng bày)
- `id` (UUID, PK)
- `category_id` (UUID, FK → `categories.id`)
- `name` (VARCHAR)
- `slug` (VARCHAR, Unique)
- `brand` (VARCHAR, Nullable): Thương hiệu mỹ phẩm
- `volume` (VARCHAR, Nullable): Dung tích / Quy cách (VD: *50ml*)
- `short_desc` (VARCHAR)
- `content` (TEXT): Công dụng, thành phần, cách dùng
- `price` (BIGINT): Giá tham khảo tại Spa (VNĐ)
- `thumbnail_url` (TEXT)
- `gallery_urls` (JSONB): Mảng ảnh chi tiết
- `is_featured` (BOOLEAN): Hiển thị nổi bật ngoài Landing Page
- `in_stock` (BOOLEAN, Default `true`): Trạng thái *Còn hàng tại Spa* / *Tạm hết hàng*
- `is_active` (BOOLEAN, Default `true`)
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### 6. `appointments` (Đơn Đặt lịch hẹn & Hóa đơn tại quầy)
- `id` (UUID, PK)
- `booking_code` (VARCHAR, Unique): Mã ngắn dễ đọc (VD: `MDS-241101`)
- `customer_id` (UUID, FK → `customers.id`)
- `customer_name` (VARCHAR): Tên người đặt tại thời điểm đặt
- `customer_phone` (VARCHAR): SĐT liên hệ
- `appointment_date` (DATE): Ngày hẹn
- `start_time` (TIME): Giờ bắt đầu (VD: `14:30`)
- `total_duration_minutes` (INT): Tổng thời lượng dự kiến
- `guest_count` (INT, Default `1`): Số lượng khách đi cùng
- `customer_note` (TEXT, Nullable): Lời nhắn của khách
- `admin_note` (TEXT, Nullable): Ghi chú nội bộ của Chủ Spa
- `status` (VARCHAR): `PENDING` | `CONFIRMED` | `COMPLETED` | `CANCELLED` | `NO_SHOW`
- `estimated_amount` (BIGINT): Tổng tiền dịch vụ ước tính lúc đặt
- `extra_retail_amount` (BIGINT, Default `0`): Tiền khách mua thêm mỹ phẩm/dịch vụ phát sinh tại quầy
- `discount_amount` (BIGINT, Default `0`): Tiền giảm giá theo hạng thành viên / ưu đãi
- `points_redeemed` (INT, Default `0`): Số điểm khách dùng để trừ tiền ở lần hẹn này
- `points_discount_amount` (BIGINT, Default `0`): Số tiền quy đổi từ điểm đã dùng
- `final_amount` (BIGINT, Default `0`): **Số tiền thực thu cuối cùng tại quầy**
- `points_earned` (INT, Default `0`): Số điểm cộng thêm sau khi hoàn thành
- `confirmed_at`, `completed_at`, `created_at` (TIMESTAMPTZ)

#### 7. `appointment_items` (Chi tiết các Dịch vụ trong 1 Lịch hẹn)
- `id` (UUID, PK)
- `appointment_id` (UUID, FK → `appointments.id` ON DELETE CASCADE)
- `service_id` (UUID, FK → `services.id`)
- `service_name` (VARCHAR): Lưu cứng tên dịch vụ tại thời điểm đặt
- `price` (BIGINT): Đơn giá tại thời điểm đặt
- `duration_minutes` (INT)
- `quantity` (INT, Default `1`)

#### 8. `point_transactions` (Sổ cái Lịch sử Biến động Điểm)
- `id` (UUID, PK)
- `customer_id` (UUID, FK → `customers.id`)
- `appointment_id` (UUID, Nullable, FK → `appointments.id`)
- `type` (VARCHAR): `EARN` (Tích điểm) | `REDEEM` (Tiêu điểm) | `ADJUST` (Điều chỉnh tay / Tặng quà)
- `points_change` (INT): Số dương (`+15`) hoặc số âm (`-50`)
- `balance_after` (INT): Số dư điểm ngay sau giao dịch
- `description` (VARCHAR): Diễn giải (VD: *Tích điểm hóa đơn MDS-241101*)
- `created_by` (UUID, Nullable): ID Admin thực hiện
- `created_at` (TIMESTAMPTZ)

#### 9. `spa_settings` (Cấu hình Hệ thống Mai Đinh Spa)
- `key` (VARCHAR, PK) & `value` (JSONB):
  - Thông tin Spa: Tên, Địa chỉ, SĐT Hotline, Link Zalo, Link Facebook, Tọa độ bản đồ.
  - Giờ làm việc: Giờ mở cửa (`08:30`), Giờ đóng cửa (`20:00`), Khoảng cách mỗi khung giờ (`30 phút`), Số giường tối đa (`max_concurrent_bookings`).
  - Quy đổi điểm: `point_redeem_value` (mặc định `1000` VNĐ / 1 điểm).

---

## 6. Sơ đồ Trang & Cấu trúc Thư mục Source Code

Toàn bộ mã nguồn ứng dụng đặt trong thư mục `source/` theo mô hình **Thin Route Pattern**:
- `src/app/`: Chỉ làm nhiệm vụ định tuyến đường dẫn URL, khai báo SEO (`metadata`) và gọi dữ liệu ban đầu (mỗi file chỉ dài 5–15 dòng).
- `src/components/pages/`: Chứa **100% giao diện trang hoàn chỉnh** (giống hệt thói quen tổ chức `pages/` bên ReactJS), giúp bạn tìm và sửa giao diện cực nhanh tại một nơi duy nhất.

```text
MaiDinhSpa/
├── documents/
│   └── MDS.md                         # Tài liệu đặc tả & hướng dẫn gốc (file này)
└── source/                            # Mã nguồn ứng dụng Next.js Fullstack
    ├── supabase/
    │   ├── schema.sql                 # Khởi tạo 9 bảng DB & hàm cộng/trừ điểm
    │   └── seed.sql                   # Dữ liệu mẫu (4 hạng thành viên + dịch vụ/sản phẩm)
    ├── src/
    │   ├── app/                       # CHỈ ĐỊNH TUYẾN URL & SEO (File siêu mỏng, import từ components/pages)
    │   │   ├── (public)/              # Nhóm URL Khách hàng (/, /dich-vu, /san-pham, /dat-lich, /tra-cuu-lich)
    │   │   ├── (auth)/                # Nhóm URL Tài khoản (/dang-nhap, /dang-ky, /cap-nhat-sdt)
    │   │   ├── tai-khoan/             # Nhóm URL Thành viên (/tai-khoan, /tai-khoan/lich-hen, /tai-khoan/lich-su-diem)
    │   │   ├── admin/                 # Nhóm URL Chủ Spa (/admin, /admin/lich-hen, /admin/khach-hang, ...)
    │   │   └── api/                   # Route Handlers (Auth callback, Upload ảnh)
    │   ├── components/
    │   │   ├── pages/                 # TẤT CẢ GIAO DIỆN TRANG NẰM TẬP TRUNG TẠI ĐÂY
    │   │   │   ├── public/            # HomePage.tsx, ServicesPage.tsx, ServiceDetailPage.tsx,
    │   │   │   │                      # ProductsPage.tsx, ProductDetailPage.tsx, BookingPage.tsx, BookingLookupPage.tsx
    │   │   │   ├── auth/              # LoginPage.tsx, RegisterPage.tsx, UpdatePhonePage.tsx
    │   │   │   ├── member/            # MemberDashboardPage.tsx, MemberBookingsPage.tsx, PointHistoryPage.tsx
    │   │   │   └── admin/             # AdminDashboardPage.tsx, AdminBookingsPage.tsx, AdminCustomersPage.tsx,
    │   │   │                          # AdminServicesPage.tsx, AdminProductsPage.tsx, AdminSettingsPage.tsx
    │   │   ├── ui/                    # Các thành phần lẻ từ shadcn/ui (Button, Input, Dialog, Calendar...)
    │   │   ├── layout/                # Navbar.tsx, Footer.tsx, AdminSidebar.tsx, FloatingZaloButton.tsx
    │   │   └── shared/                # ServiceCard.tsx, ProductCard.tsx, MembershipCard.tsx
    │   ├── actions/                   # Server Actions xử lý ngầm (auth, booking, loyalty, catalog)
    │   ├── lib/
    │   │   ├── supabase/              # Khởi tạo Supabase Client (Browser & Server)
    │   │   ├── notifications/         # Hàm gửi Telegram cho Chủ Spa & Email Resend cho Khách
    │   │   └── validations/           # Các bộ kiểm lỗi Zod (Booking, Auth, Profile)
    │   └── types/                     # Định nghĩa TypeScript interfaces toàn cục
    ├── public/                        # Logo Mai Đinh Spa, hình ảnh tĩnh, favicon
    ├── .env.example                   # Mẫu các biến môi trường cần cấu hình
    └── package.json
```

---

## 7. Hướng dẫn Chuẩn bị Dịch vụ & Biến Môi trường

Trước hoặc trong quá trình code, bạn chỉ cần đăng ký các tài khoản miễn phí sau để lấy khóa kết nối điền vào file `source/.env.local`:

1. **Supabase (Database & Auth - Miễn phí):**
   - Tạo project tại `https://supabase.com` (chọn Region gần Việt Nam nhất là **Singapore - ap-southeast-1** để tốc độ truy vấn nhanh nhất).
   - Bật nhà cung cấp đăng nhập **Email** và **Google** trong mục *Authentication → Providers*.
2. **Cloudinary (Lưu trữ ảnh - Miễn phí):**
   - Đăng ký tại `https://cloudinary.com`, lấy `Cloud Name`, `API Key`, `API Secret` (hoặc tạo 1 Unsigned Upload Preset cho trang Admin).
3. **Telegram Bot (Báo lịch mới về điện thoại Chủ Spa - Miễn phí):**
   - Mở ứng dụng Telegram, tìm `@BotFather` → Gõ `/newbot` để lấy `TELEGRAM_BOT_TOKEN`.
   - Thêm Bot vào nhóm nhận thông báo của Chủ Spa và lấy `TELEGRAM_CHAT_ID`.
4. **Resend (Gửi Email thông báo - Miễn phí):**
   - Đăng ký tại `https://resend.com` để lấy `RESEND_API_KEY`.

### Mẫu file `.env.local`
```env
# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres"

# Cloudinary (Lưu & tối ưu ảnh Dịch vụ/Sản phẩm)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Notifications (Telegram cho Chủ Spa & Resend Email cho Khách)
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
TELEGRAM_CHAT_ID="your-telegram-chat-id"
RESEND_API_KEY="re_your_resend_api_key"
```

---

## 8. Lộ trình Triển khai (Implementation Roadmap)

Để kiểm soát chất lượng tốt nhất và có sản phẩm chạy thử sớm, dự án được chia làm **5 giai đoạn (Phases)** tuần tự:

- **Giai đoạn 1 — Khởi tạo Dự án & Database (Foundation):**
  - Khởi tạo Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui trong thư mục `source/`.
  - Thiết lập kết nối Supabase, chạy script SQL khởi tạo toàn bộ 9 bảng Database, phân quyền bảo mật (RLS) và nạp dữ liệu mẫu (4 hạng thành viên + dịch vụ/sản phẩm mẫu của Mai Đinh Spa).
- **Giai đoạn 2 — Xây dựng Landing Page & Danh mục Dịch vụ / Sản phẩm (Public UI):**
  - Thiết kế bộ nhận diện màu sắc sang trọng cho Mai Đinh Spa.
  - Hoàn thiện Trang chủ Landing Page, Trang Dịch vụ, Trang Sản phẩm trưng bày (kèm nút liên hệ Zalo/Hotline) và tối ưu chuẩn SEO.
- **Giai đoạn 3 — Hệ thống Tài khoản & Đặt lịch hẹn Chờ duyệt (Auth & Booking):**
  - Xây dựng Đăng nhập/Đăng ký (Google & Email), trang cập nhật Số điện thoại định danh.
  - Xây dựng luồng Đặt lịch hẹn trực tuyến (cho cả Guest & Member), trang Tra cứu lịch hẹn và tích hợp bắn thông báo Telegram về máy Chủ Spa.
- **Giai đoạn 4 — Trang Quản trị Chủ Spa & Lõi Tích điểm Thành viên (Admin & Loyalty Core):**
  - Xây dựng Admin Portal: Duyệt/Hủy/Đổi giờ lịch hẹn, Quản lý Dịch vụ & Sản phẩm (Upload ảnh Cloudinary).
  - Xây dựng màn hình **Hoàn thành lịch hẹn & Thanh toán tại quầy**: Tính tự động chiết khấu theo hạng, cho phép trừ điểm thưởng, ghi nhận tổng thực thu và chạy Transaction cộng điểm + tự động nâng hạng thành viên.
  - Hoàn thiện trang **Thẻ Thành viên Điện tử** cho khách hàng theo dõi hạng và sổ cái điểm.
- **Giai đoạn 5 — Kiểm thử Nghiệp vụ & Deploy lên Vercel (Go-Live):**
  - Kiểm thử toàn bộ các tình huống biên (khách vãng lai tạo tài khoản sau vẫn nhận đủ điểm cũ, chống bấm cộng điểm 2 lần, hiển thị mượt trên iPhone/Android).
  - Đưa mã nguồn lên GitHub, kết nối Vercel và cấu hình tên miền chính thức cho Mai Đinh Spa.
