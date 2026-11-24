# BÁO CÁO NHẬN XÉT TOÀN DIỆN — DỰ ÁN MAI ĐINH SPA

> **Ngày đánh giá:** 24/11/2026
> **Phạm vi:** `documents/MDS.md`, `documents/codebase.md`, `documents/uxui.md` + toàn bộ khung `source/` (file cấu hình, 22 file hướng dẫn `*.md` trong từng thư mục, cấu hình công cụ AI).
> **Hiện trạng:** Dự án đang ở giai đoạn **thiết kế trên giấy** — chưa có dòng code nghiệp vụ, chưa có `schema.sql`, chưa cài `node_modules`. Đây là **thời điểm rẻ nhất để sửa sai**, nên báo cáo tập trung vào những lỗ hổng sẽ tốn kém nếu để đến lúc code xong mới phát hiện.

---

## MỤC LỤC
0. [Tóm tắt điều hành](#0-tóm-tắt-điều-hành)
1. [Ưu điểm](#1-ưu-điểm)
2. [Nhược điểm & Rủi ro (kèm hướng khắc phục)](#2-nhược-điểm--rủi-ro-kèm-hướng-khắc-phục)
   - 2A. Nghiệp vụ Đặt lịch
   - 2B. Nghiệp vụ Tích điểm & Hạng thành viên
   - 2C. Bảo mật & Dữ liệu cá nhân
   - 2D. Kiến trúc & Kỹ thuật
   - 2E. Hạ tầng & Chi phí "0đ"
   - 2F. UX/UI
   - 2G. Mâu thuẫn giữa các tài liệu
   - 2H. Vệ sinh Repository
3. [Đề xuất chỉnh sửa Database Schema](#3-đề-xuất-chỉnh-sửa-database-schema)
4. [Lộ trình điều chỉnh đề xuất](#4-lộ-trình-điều-chỉnh-đề-xuất)
5. [Checklist trước khi bắt đầu code](#5-checklist-trước-khi-bắt-đầu-code)
6. [Phụ lục](#6-phụ-lục)

---

## 0. Tóm tắt điều hành

**Đánh giá chung:** Bộ tài liệu thuộc loại **tốt hơn mặt bằng chung** của dự án cá nhân — phạm vi rõ ràng, có ranh giới "trong/ngoài phạm vi", mô hình dữ liệu tích điểm được nghĩ kỹ (tách `total_spent` / `points_balance`, sổ cái điểm), quy chuẩn thư mục và design system chi tiết. Tuy nhiên tài liệu đang **mạnh về "hình" (cấu trúc, màu sắc, tên file) hơn "lõi" (quy tắc biên, bảo mật, vận hành thực tế)**.

| Hạng mục | Điểm (/10) | Nhận xét ngắn |
| :--- | :---: | :--- |
| Phạm vi & mục tiêu | **8.5** | Rõ ràng, thực tế với spa 1 chi nhánh |
| Nghiệp vụ Đặt lịch | **6.0** | Thiếu kiểm soát sức chứa, ngày nghỉ, thông báo cho khách vãng lai |
| Nghiệp vụ Tích điểm | **7.0** | Ý tưởng tốt nhưng ví dụ tính tiền sai, thiếu quy tắc hủy/hoàn, hết hạn điểm |
| Bảo mật & Dữ liệu | **4.5** | Lỗ hổng chiếm quyền điểm qua SĐT; dữ liệu sức khỏe chưa xử lý theo luật mới |
| Kiến trúc kỹ thuật | **7.0** | Hợp lý; thiếu tầng truy vấn dữ liệu, chiến lược RLS, chống spam thực sự |
| Hạ tầng & chi phí | **5.5** | Giả định "0đ/tháng" vướng điều khoản Vercel Hobby và rủi ro không backup |
| UX/UI | **8.0** | Design system chi tiết; một số cặp màu không đạt độ tương phản |
| Tính nhất quán tài liệu | **6.0** | Nhiều chỗ mâu thuẫn tên file, tên hàm, mã màu, biến môi trường |

### 🔥 5 việc nên làm NGAY trước khi viết code
1. **Vá lỗ hổng liên kết điểm qua SĐT** (mục C-01) — hiện tại ai đăng ký bằng SĐT của người khác sẽ "thừa kế" toàn bộ điểm & lịch sử của họ.
2. **Sửa ví dụ BR-L04 và tách tiền Dịch vụ / Sản phẩm** trong hóa đơn (mục B-01) — đang giảm % hạng lên cả mỹ phẩm, trái với quy tắc đã ghi.
3. **Thêm kiểm soát sức chứa thật + ngày nghỉ** (mục A-01, A-03) — tránh khách đặt vào giờ đã kín hoặc ngày Tết.
4. **Giải quyết bài toán hosting thương mại & backup** (mục E-01, E-02).
5. **Đồng bộ lại 3 tài liệu** về một nguồn sự thật duy nhất (mục 2G) trước khi giao cho AI/người khác code theo.

---

## 1. Ưu điểm

### 1.1. Về định hướng sản phẩm
- **Phạm vi được khoanh vùng tỉnh táo.** Bảng "In-Scope / Out-of-Scope" loại bỏ đúng những thứ tốn kém nhưng ít giá trị với spa 1 chi nhánh: giỏ hàng, ship COD, cổng thanh toán, SMS OTP, đa chi nhánh. Đây là quyết định đúng — rất nhiều dự án tương tự chết vì ôm đồm e-commerce.
- **Quy trình "Chờ duyệt" phù hợp thực tế vận hành spa nhỏ.** Chủ spa vẫn giữ quyền kiểm soát lịch (vì có yếu tố kỹ thuật viên, giường, khách quen), trong khi khách vẫn có trải nghiệm đặt online.
- **Không bắt buộc tạo tài khoản để đặt lịch** → giảm ma sát chuyển đổi đáng kể.
- **SĐT làm định danh chính** phù hợp hành vi khách Việt (tra cứu tại quầy bằng SĐT là thói quen phổ biến).
- **Sản phẩm bán lẻ dạng "catalog + Zalo"** — đơn giản, đúng kênh bán hàng thực tế của spa Việt.

### 1.2. Về thiết kế nghiệp vụ tích điểm
- **Tách `total_spent` (xét hạng, chỉ tăng) và `points_balance` (ví tiêu)** — tránh được lỗi kinh điển "đổi quà xong bị tụt hạng". Đây là điểm sáng nhất của tài liệu.
- **Sổ cái điểm `point_transactions` có `balance_after`** — thiết kế kiểu kế toán, có khả năng đối soát.
- **Yêu cầu chạy trong Database Transaction** (`complete_appointment_and_loyalty`) — nhận thức đúng về tính toàn vẹn dữ liệu.
- **Snapshot giá & tên dịch vụ** vào `appointment_items` và `customer_name/phone` vào `appointments` — đổi giá sau này không làm sai lịch sử.
- **Cấu hình hạng/tỷ lệ điểm chỉnh được trong Admin** — linh hoạt cho chủ spa.

### 1.3. Về kỹ thuật
- **Stack hiện đại, phổ biến, tài liệu dồi dào** (Next.js App Router + Supabase + Tailwind + Zod), rất phù hợp phát triển cùng AI.
- **Zod dùng chung client/server**, chuẩn hóa `ActionResponse<T>` — giảm lỗi và đồng nhất cách xử lý lỗi.
- **Quy ước `'use server'` cho mọi tác vụ ghi + kiểm tra quyền ADMIN 2 lớp** (middleware + layout) — có ý thức bảo mật.
- **Telegram bọc `try/catch` để không làm hỏng đơn đặt lịch** — tư duy "tác vụ phụ không được làm sập tác vụ chính" là đúng.
- **Mỗi thư mục có file `*.md` hướng dẫn** — rất tốt cho việc code cùng AI agent, người mới vào dự án hiểu ngay mỗi file phải làm gì.
- **URL tiếng Việt không dấu** (`/dich-vu`, `/dat-lich`) — tốt cho SEO địa phương và dễ nhớ.

### 1.4. Về UX/UI
- **Design system được token hóa chi tiết** (màu nền, chữ, trạng thái, hạng; radius; shadow; type scale) — hiếm thấy ở dự án cá nhân.
- **Màu trạng thái lịch hẹn & màu hạng có ý nghĩa thị giác rõ ràng.**
- **Mobile-first, nút tối thiểu 44px** — đúng chuẩn chạm.
- **Phân biệt rõ `ServiceCard` (đặt lịch) và `ProductCard` (chỉ xem/Zalo)** — tránh gây hiểu nhầm có thể mua online.
- **Chiến lược UI-First với mock data** giúp chủ spa duyệt giao diện sớm, phát hiện sai lệch nghiệp vụ trước khi đầu tư backend.

---

## 2. Nhược điểm & Rủi ro (kèm hướng khắc phục)

**Ký hiệu mức độ:** 🔴 Nghiêm trọng (phải sửa trước khi code) · 🟠 Cao (sửa trước khi go-live) · 🟡 Trung bình · ⚪ Thấp / nên có

---

### 2A. Nghiệp vụ Đặt lịch

#### 🔴 A-01. Không có kiểm soát sức chứa thực sự
- **Hiện trạng:** `spa_settings` có `max_concurrent_bookings` nhưng không quy tắc nào dùng nó. BR-B04 chỉ "hiển thị cảnh báo khi trùng nhiều lịch CONFIRMED", và "trùng" được hiểu theo **giờ bắt đầu**, không theo **khoảng thời gian**.
- **Hệ quả:** Lịch 14:00 (90 phút) và lịch 15:00 thực tế chồng nhau nhưng hệ thống không thấy. Khách thấy mọi khung giờ đều "trống" → đặt nhiều vào giờ đã kín → chủ spa phải gọi từ chối hàng loạt → trải nghiệm tệ, chủ spa quá tải.
- **Khắc phục:**
  - Tính chồng lấn theo khoảng `[start_time, start_time + total_duration_minutes)` và nhân với `guest_count` (2 khách = chiếm 2 giường).
  - Trên `BookingPage`, **làm mờ/ẩn khung giờ đã đạt `max_concurrent_bookings`** (tính trên lịch `CONFIRMED` + có thể cả `PENDING`). Vẫn giữ bước duyệt, nhưng giảm số đơn phải từ chối.
  - Chặn khung giờ mà `start_time + duration > giờ đóng cửa` (hiện tại `19:30` + dịch vụ 90 phút vẫn hợp lệ).

#### 🟠 A-02. Khách vãng lai gần như không nhận được thông báo nào
- **Hiện trạng:** Email xác nhận chỉ gửi "nếu khách có Email", nhưng **form đặt lịch không có trường Email**. Khách vãng lai chỉ có thể tự vào `/tra-cuu-lich` kiểm tra.
- **Hệ quả:** Phần lớn khách (đặt nhanh, không đăng ký) không biết lịch đã được duyệt hay bị đổi giờ → tỷ lệ vắng mặt (NO_SHOW) cao, hoặc chủ spa phải gọi điện từng người.
- **Khắc phục (theo thứ tự chi phí tăng dần):**
  1. Thêm trường **Email (tùy chọn)** vào form đặt lịch.
  2. Trong Admin, nút **"Nhắn Zalo"** mở `https://zalo.me/<sđt>` kèm mẫu tin soạn sẵn ("Mai Đinh Spa xác nhận lịch MDS-xxx lúc 14:00 ngày…") → miễn phí, chủ spa bấm 1 lần.
  3. Màn hình đặt lịch thành công hiển thị **link tra cứu có sẵn mã** + nút "Lưu vào lịch điện thoại" (file `.ics`).
  4. Giai đoạn sau: Zalo ZNS (có phí theo tin) nếu lượng khách lớn.

#### 🟠 A-03. Thiếu quản lý ngày nghỉ / ngày lễ / giờ đặc biệt
- **Hiện trạng:** Chỉ có giờ mở/đóng cửa cố định hằng ngày.
- **Hệ quả:** Khách đặt được lịch vào mùng 1 Tết, ngày chủ spa đi vắng, hoặc ngày nghỉ hằng tuần.
- **Khắc phục:** Thêm bảng `closed_dates` (ngày, lý do) và cấu hình **giờ mở cửa theo thứ trong tuần**; lịch chọn ngày tự vô hiệu hóa các ngày này. Thêm giới hạn **đặt trước tối đa N ngày** và **tối thiểu trước X giờ**.

#### 🟡 A-04. Luồng trạng thái thiếu tình huống thực tế
- "Đổi giờ" là hành động của Admin nhưng **không có trạng thái/ghi nhận khách đã đồng ý giờ mới** — admin đổi giờ rồi duyệt luôn, khách không biết.
- Không có **quy định hủy lịch CONFIRMED** (trước bao nhiêu giờ thì khách tự hủy được?) — `member.md` có nhắc "trước giờ hẹn tối thiểu theo quy định" nhưng quy định đó chưa tồn tại.
- Không có **tự động chuyển NO_SHOW** hay **xử lý khách vắng mặt nhiều lần** (VD: 3 lần NO_SHOW → bắt buộc gọi xác nhận).
- Không có **nhắc lịch** cho chủ spa (VD: 7h sáng gửi Telegram danh sách khách hôm nay).
- **Khắc phục:** Bổ sung bảng quy tắc: `cancel_cutoff_hours`, `no_show_threshold`; thêm cột `no_show_count` vào `customers`; thêm trạng thái hoặc cờ `RESCHEDULE_PROPOSED`; lịch nhắc dùng Supabase `pg_cron` hoặc GitHub Actions (miễn phí).

#### 🟡 A-05. Chống spam BR-B05 quá yếu
- **Hiện trạng:** "1 SĐT không quá 3 lịch PENDING/ngày" — kẻ phá chỉ cần đổi SĐT là vượt qua; không có giới hạn theo IP, không có captcha.
- **Hệ quả:** Bảng `customers` bị rác (mỗi SĐT bịa tạo 1 hồ sơ), Telegram chủ spa bị spam.
- **Khắc phục:** Thêm **Cloudflare Turnstile** (miễn phí, không làm phiền người dùng) vào form đặt lịch và tra cứu; giới hạn theo IP (bảng đếm trong Postgres hoặc Upstash free tier); chỉ tạo bản ghi `customers` khi lịch được **CONFIRMED**, còn PENDING thì lưu snapshot tên/SĐT trong `appointments`.

#### 🟡 A-06. `guest_count` chưa rõ nghĩa
- 2 khách đi cùng thì làm cùng dịch vụ hay khác dịch vụ? Giá ước tính có nhân 2 không? Chiếm 2 giường không?
- **Khắc phục:** Hoặc quy ước rõ "mỗi khách làm cùng gói, giá × số khách", hoặc gắn `appointment_items` theo từng khách (`guest_index`). Với spa nhỏ, phương án 1 là đủ — nhưng phải ghi rõ vào tài liệu và hiển thị trên Phiếu tóm tắt.

#### ⚪ A-07. Mã lịch hẹn `MDS-241101` dễ trùng
- Định dạng trông giống `yyMMdd` → nhiều đơn cùng ngày sẽ trùng. Mã toàn số cũng dễ đoán.
- **Khắc phục:** Dùng 6 ký tự ngẫu nhiên base32 bỏ ký tự dễ nhầm (`0/O`, `1/I/L`), VD `MDS-7KQ4TX`; có vòng lặp thử lại khi trùng (`UNIQUE` đã đảm bảo).

---

### 2B. Nghiệp vụ Tích điểm & Hạng thành viên

#### 🔴 B-01. Ví dụ BR-L04 tính sai so với chính quy tắc đã ghi
- **Hiện trạng:** Bảng hạng ghi "Hạng Bạc giảm **5% dịch vụ**", nhưng ví dụ lấy tổng `700.000đ` (**dịch vụ + sản phẩm**) × 95% = `665.000đ` → tức là giảm cả mỹ phẩm.
- **Nguyên nhân gốc:** Schema gộp "mỹ phẩm/dịch vụ phát sinh" chung vào một cột `extra_retail_amount`, nên **không thể** tính đúng giảm giá chỉ trên dịch vụ.
- **Khắc phục:** Tách rõ trong hóa đơn:
  ```
  service_subtotal   = tổng dịch vụ (đặt trước + phát sinh)      → áp % hạng
  retail_subtotal    = tổng mỹ phẩm                             → KHÔNG áp % hạng
  tier_discount      = service_subtotal × discount_percent
  points_discount    = points_redeemed × point_redeem_value
  final_amount       = service_subtotal + retail_subtotal − tier_discount − points_discount
  ```
  Viết lại ví dụ cho khớp (VD: DV 500k + SP 200k, Bạc → giảm 25k → 675k, trừ 65 điểm → **610k**).

#### 🟠 B-02. Chưa định nghĩa các quy tắc biên của tiêu điểm
Cần chốt rõ (và đưa vào `spa_settings`):
| Câu hỏi | Gợi ý mặc định |
| :--- | :--- |
| Tối đa được trừ bao nhiêu % hóa đơn bằng điểm? | ≤ 50% |
| Có trừ điểm cho tiền mỹ phẩm không? | Có / Không (chủ spa chọn) |
| `final_amount` có được âm/bằng 0? | Không, kiểm tra ở cả Zod và SQL |
| Giảm theo hạng có cộng dồn với `sale_price` (giá khuyến mãi)? | Chọn mức có lợi hơn cho khách, **không cộng dồn** |
| Điểm thưởng tính theo hạng **trước** hay **sau** khi lên hạng ở chính hóa đơn đó? | Theo hạng **trước** (dễ giải thích) |
| Điểm có hết hạn không? | 12 tháng kể từ ngày tích (tránh nợ điểm tích lũy vô hạn) |
| Hạng có bị xét lại/hạ không? | Xét theo chi tiêu 12 tháng gần nhất, hoặc ghi rõ "hạng vĩnh viễn" |

#### 🟠 B-03. Không có quy trình hủy/sửa hóa đơn đã COMPLETED
- **Hiện trạng:** Chủ spa nhập sai `final_amount` (gõ thừa một số 0) → đã cộng điểm, đã cộng `total_spent`, có thể đã lên hạng. Chỉ có `ADJUST` điểm thủ công, **không có cách điều chỉnh `total_spent`** và hạng.
- **Khắc phục:** Thêm hành động **"Hủy hóa đơn" (VOID)** chạy trong transaction: ghi bút toán đảo (`REVERSAL`) vào sổ cái điểm, trừ lại `total_spent`, tính lại hạng, lưu `voided_at`, `voided_by`, `void_reason`. Không bao giờ sửa/xóa dòng ledger cũ.

#### 🟠 B-04. Bán lẻ không qua đặt lịch bị "lơ lửng"
- **Hiện trạng:** BR-L03 nói có thể "tạo Hóa đơn tại quầy cho khách mua lẻ", nhưng không có bảng hóa đơn riêng; `customer.md` lại hướng dùng `manualAdjustPointsAction` (loại `ADJUST`) cho mua lẻ → **không cộng `total_spent`**, khách mua mỹ phẩm nhiều vẫn không lên hạng, doanh thu dashboard thiếu.
- **Khắc phục:** Tách `invoices` (hóa đơn) khỏi `appointments` (lịch hẹn): mọi lần thu tiền đều là 1 `invoice`, có thể gắn hoặc không gắn `appointment_id`. Xem mục 3.

#### 🟡 B-05. Chưa đánh giá chi phí thực của chương trình ưu đãi
Ước tính tổng ưu đãi hiệu dụng (giảm giá + giá trị điểm tích lại, với `1 điểm = 1.000đ`):
| Hạng | Giảm giá DV | Hoàn điểm (trên tiền đã giảm) | **Tổng ưu đãi ≈** |
| :--- | :---: | :---: | :---: |
| Thành viên | 0% | 1% | **~1%** |
| Bạc | 5% | 2% × 95% | **~6.9%** |
| Vàng | 10% | 3% × 90% | **~12.7%** |
| Kim Cương | 15% | 5% × 85% | **~19.3%** |
- Hạng Kim Cương gần **20%** doanh thu dịch vụ — cần chủ spa xác nhận biên lợi nhuận chịu được. Ngoài ra "làm tròn xuống theo bội số 100.000đ" khiến hóa đơn 199.000đ chỉ được tính như 100.000đ — khách có thể thấy thiệt; cân nhắc tính tỷ lệ (`floor(final_amount × points_per_100k / 100000)`) — kết quả giống nhau nhưng nên ghi rõ công thức.

#### 🟡 B-06. Ưu đãi sinh nhật và "ưu tiên khung giờ cao điểm" chưa có cơ chế
- Hạng Vàng có "Ưu đãi tháng sinh nhật", Kim Cương có "Ưu tiên khung giờ cao điểm" — nhưng không có trường dữ liệu, job tự động hay logic nào thực thi. Hoặc định nghĩa cụ thể (VD: cron đầu tháng tự `ADJUST +50 điểm` cho khách sinh nhật tháng đó, có cờ chống cộng 2 lần trong năm), hoặc ghi rõ là "chủ spa áp dụng thủ công".

#### 🟡 B-07. Đổi cấu hình hạng không có quy tắc áp dụng lại
- Chủ spa sửa mốc Bạc từ 3tr → 5tr: khách đang Bạc với 4tr thì sao? Cần quy định và viết hàm `recalculate_all_tiers()`. Tốt nhất **không lưu cứng `tier_id`** mà tính từ `total_spent` (hoặc lưu nhưng luôn tính lại khi cấu hình thay đổi).

---

### 2C. Bảo mật & Dữ liệu cá nhân

#### 🔴 C-01. Lỗ hổng chiếm hồ sơ điểm bằng SĐT của người khác
- **Hiện trạng:** `registerMemberAction` và `linkPhoneAfterGoogleLoginAction` **tự động gắn `auth_user_id` vào hồ sơ có SĐT trùng** — không có bước xác minh người đăng ký thực sự sở hữu SĐT đó (vì đã bỏ OTP).
- **Kịch bản tấn công:** Người A biết SĐT của chị B (khách Kim Cương, 300 điểm). A đăng ký bằng Google + nhập SĐT của B → A xem được toàn bộ lịch sử hẹn, tổng chi tiêu, hạng của B; tài khoản thật của B sau này **không đăng ký được** vì `phone UNIQUE` đã bị chiếm. Tệ hơn, A có thể đặt lịch dưới hạng VIP của B.
- **Khắc phục (không tốn tiền OTP):**
  1. Khi SĐT đã tồn tại → **không tự gắn**; tạo yêu cầu liên kết ở trạng thái `PENDING_VERIFY`, hiển thị "Vui lòng xác nhận tại quầy hoặc nhập mã lịch hẹn gần nhất đã hoàn thành".
  2. Cho phép tự xác minh bằng **một mã lịch hẹn COMPLETED trước đó + SĐT** (chỉ chủ thật mới có).
  3. Hoặc chủ spa bấm "Xác nhận liên kết" trong Admin khi khách đến quầy.
  4. Thêm cột `phone_verified_at` vào `customers`; chỉ hồ sơ đã xác minh mới hiển thị lịch sử/điểm.

#### 🟠 C-02. Dữ liệu sức khỏe là dữ liệu nhạy cảm theo luật mới
- **Hiện trạng:** `skin_notes` (tình trạng da, dị ứng) và `customer_note` ("ghi chú sức khỏe") lưu tự do, không có cơ chế đồng ý, không có chính sách quyền riêng tư.
- **Bối cảnh pháp lý:** Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 và Nghị định 356/2025/NĐ-CP đã có hiệu lực từ **01/01/2026**, trong đó **tình trạng sức khỏe được xếp vào dữ liệu cá nhân nhạy cảm**, đòi hỏi phân quyền truy cập và biện pháp bảo mật riêng.
- **Khắc phục:**
  - Thêm trang **Chính sách bảo mật** (`/chinh-sach-bao-mat`) và **checkbox đồng ý** (không tick sẵn) trên form đặt lịch/đăng ký.
  - Lưu `consent_at`, `consent_version` trong `customers`.
  - `skin_notes` chỉ ADMIN đọc được (RLS), không bao giờ trả về phía member/client.
  - Có chức năng **xóa/ẩn danh hóa** dữ liệu khách khi được yêu cầu.
  - *Lưu ý: đây là gợi ý kỹ thuật, không phải tư vấn pháp lý — nên tham khảo chuyên gia nếu cần chắc chắn về nghĩa vụ cụ thể.*

#### 🟠 C-03. Chiến lược RLS & dùng Service Role chưa được định nghĩa
- **Hiện trạng:** Tài liệu nói "phân quyền bảo mật (RLS)" nhưng không có bảng ai được đọc/ghi gì. Đặt lịch của khách vãng lai (chưa đăng nhập) gần như chắc chắn phải dùng Service Role → **bỏ qua toàn bộ RLS**, mọi kiểm tra dồn vào Server Action.
- **Khắc phục:** Viết **ma trận RLS** ngay trong tài liệu (xem phụ lục 6.2). Với tác vụ khách vãng lai, ưu tiên **hàm Postgres `SECURITY DEFINER`** (VD: `create_booking(...)`, `lookup_booking(phone, code)`) có validate bên trong, và **thu hồi quyền INSERT trực tiếp** trên bảng — thay vì dùng Service Role rải rác.

#### 🟡 C-04. Tra cứu lịch hẹn có thể bị dò
- `lookupBookingAction(phone, code)` không giới hạn số lần → có thể dò mã. Cần rate limit + Turnstile, và chỉ trả về thông tin tối thiểu (giờ, trạng thái, tên dịch vụ — không trả SĐT/ghi chú).

#### 🟡 C-05. Vai trò ADMIN nằm trong bảng `customers`
- Chủ spa bị coi là một "khách hàng" (phải có `phone UNIQUE`, `tier_id`...). Middleware phải **query DB ở mọi request** để biết role → chậm và tốn quota.
- **Khắc phục:** Đưa role vào **JWT custom claims** (Supabase Custom Access Token Hook) hoặc bảng `staff` riêng. Đồng thời chuẩn bị role `STAFF` (lễ tân/kỹ thuật viên) — spa thực tế hiếm khi chỉ một người thao tác. Ghi `created_by` / `updated_by` trên mọi bảng nghiệp vụ để có nhật ký kiểm toán.

#### ⚪ C-06. Thiếu chống bấm 2 lần ở tầng SQL
- Phase 5 có nhắc "chống bấm cộng điểm 2 lần" nhưng chỉ ở dạng kiểm thử. Phải đảm bảo trong hàm SQL: `SELECT ... FOR UPDATE` trên lịch hẹn, kiểm tra `status = 'CONFIRMED'` trước khi chuyển; khóa dòng `customers` khi cập nhật `points_balance` để `balance_after` không lệch khi 2 giao dịch đồng thời.

---

### 2D. Kiến trúc & Kỹ thuật

#### 🟠 D-01. Thiếu "tầng truy vấn dữ liệu" → lời hứa UI-First khó thành hiện thực
- **Hiện trạng:** `uxui.md` hứa "chỉ cần thay `mock-data.ts` sang Supabase mà không sửa dòng giao diện nào", nhưng `app.md` lại để **route file trực tiếp gọi Supabase**. Không có lớp trung gian.
- **Khắc phục:** Thêm thư mục `src/lib/data/` (hoặc `src/queries/`) với các hàm đọc như `getFeaturedServices()`, `getAvailableSlots(date)`, `getCustomerDashboard(userId)`. Giai đoạn UI-First, các hàm này trả mock; giai đoạn sau chỉ đổi phần thân hàm. Route và Page không cần biết dữ liệu đến từ đâu. Đồng thời **sinh kiểu dữ liệu từ DB** bằng `supabase gen types typescript` thay vì viết tay `database.types.ts` (tránh lệch schema).

#### 🟠 D-02. Rủi ro biến cả trang thành Client Component
- Quy tắc "100% giao diện trang nằm trong `components/pages/*Page.tsx`" kết hợp với nhiều trang được ghi `'use client'` (ServicesPage, ProductsPage, AdminBookingsPage...) → dễ dẫn đến **cả trang là client**, mất lợi ích Server Components (SEO, bundle nhỏ, ít JS trên mobile).
- **Khắc phục:** Quy định: `*Page.tsx` mặc định là **Server Component**; chỉ các "đảo tương tác" (bộ lọc, form, modal) mới là client component con. Ví dụ `ServicesPage` (server) render danh sách + `<ServiceFilter />` (client). Lọc danh mục có thể dùng `searchParams` thay vì state để có URL chia sẻ được và SEO tốt hơn.

#### 🟠 D-03. Upload ảnh qua Route Handler sẽ vướng giới hạn kích thước
- Ảnh chụp điện thoại thường 3–8MB; hàm serverless trên Vercel có giới hạn kích thước body request (khoảng 4.5MB) → upload ảnh gốc sẽ lỗi.
- **Khắc phục:** Dùng **signed upload trực tiếp từ trình duyệt lên Cloudinary** (server chỉ ký chữ ký), hoặc nén/resize ảnh phía client trước khi gửi.

#### 🟡 D-04. Regex SĐT Việt Nam bị sai
- `/^(0[3|5|7|8|9])+([0-9]{8})$/`:
  - Trong `[...]`, dấu `|` là **ký tự thường** → chấp nhận cả `0|`.
  - Dấu `+` sau nhóm cho phép lặp → chấp nhận chuỗi dài hơn 10 số (VD `0303` + 8 số).
- **Khắc phục:** `/^0(3|5|7|8|9)\d{8}$/`, và **chuẩn hóa trước khi kiểm tra**: bỏ khoảng trắng/dấu chấm, đổi `+84`/`84` đầu thành `0`. Lưu DB ở một dạng duy nhất.

#### 🟡 D-05. Múi giờ chưa được xử lý
- `appointment_date DATE` + `start_time TIME` không có múi giờ; server Vercel chạy UTC → kiểm tra "không được nhỏ hơn hôm nay" sẽ sai từ 0h–7h sáng giờ Việt Nam. Quy định rõ: mọi tính toán ngày giờ nghiệp vụ dùng `Asia/Ho_Chi_Minh`; cân nhắc lưu thêm `starts_at TIMESTAMPTZ` để truy vấn chồng lấn dễ dàng.

#### 🟡 D-06. Thông báo Telegram làm chậm phản hồi người dùng
- `await fetch(telegram)` trong Server Action khiến khách chờ thêm. Dùng `after()` của Next.js (chạy sau khi đã trả phản hồi) cho Telegram/Email.

#### 🟡 D-07. `package.json` chưa khớp với tài liệu
- Thiếu: `resend`, `cloudinary` (nếu dùng SDK), `sonner`, `date-fns`, `react-day-picker` (cho calendar shadcn), `eslint` + cấu hình (script `lint` đang gọi `next lint` nhưng chưa có ESLint), `prettier`.
- Tài liệu nhắc **Drizzle ORM** và `DATABASE_URL` nhưng `package.json` và `.env.example` không có → cần **chốt một lựa chọn**: với quy mô này, khuyến nghị **Supabase Client + SQL migration thuần** (bỏ Drizzle) để bớt một lớp phức tạp.
- Chưa có `components.json` (shadcn chưa `init`).
- Khi nâng cấp lên Next.js 16 trong tương lai, cần kiểm tra lại thay đổi về `middleware` và `next lint` (một số API đã đổi tên/bị bỏ) — nên khóa phiên bản (`"next": "15.x"`) cho đến khi chủ động nâng cấp.

#### 🟡 D-08. Không có quản lý migration
- Chỉ có một file `schema.sql`. Sau lần chạy đầu, mọi thay đổi schema sẽ không có lịch sử. Dùng **Supabase CLI migrations** (`supabase/migrations/2026xxxx_*.sql`) ngay từ đầu.

#### ⚪ D-08b. Thiếu chiến lược kiểm thử, CI, giám sát lỗi
- Không có test nào được lên kế hoạch cho phần quan trọng nhất (tính tiền/điểm). Tối thiểu nên có: **unit test cho hàm tính hóa đơn** (Vitest), **test SQL cho hàm transaction**, **GitHub Actions** chạy `typecheck + lint + test`, và **Sentry** (free tier) để biết lỗi production.

#### ⚪ D-09. SEO kỹ thuật còn mỏng
- Ngoài `metadata`, nên có: `sitemap.ts`, `robots.ts`, **JSON-LD `DaySpa` / `HealthAndBeautyBusiness`** (tên, địa chỉ, giờ mở cửa, SĐT), Open Graph image cho từng dịch vụ, liên kết với **Google Business Profile** (kênh mang khách địa phương quan trọng nhất của spa — quan trọng hơn cả website).

---

### 2E. Hạ tầng & Chi phí "0đ"

#### 🟠 E-01. Vercel Hobby không dành cho mục đích thương mại
- Theo điều khoản của Vercel, gói Hobby chỉ dành cho mục đích cá nhân, phi thương mại; mọi sử dụng thương mại cần gói Pro hoặc Enterprise. Website của một spa đang kinh doanh là mục đích thương mại.
- **Hệ quả:** Rủi ro bị khóa dự án; giả định "0đ/tháng" trong MDS không đứng vững.
- **Khắc phục (chọn 1):**
  - Dùng Vercel Hobby cho giai đoạn phát triển/thử nghiệm, **ngân sách gói Pro** khi chạy thật.
  - Hoặc host trên **Cloudflare Workers/Pages** (qua OpenNext) — gói miễn phí không có điều khoản cấm thương mại tương tự (cần kiểm tra lại điều khoản tại thời điểm triển khai).
  - Hoặc VPS giá rẻ chạy `next start` (~100–150k/tháng).
  - Cập nhật lại mục 4.1 của MDS với chi phí thực tế.

#### 🟠 E-02. Supabase Free: tạm dừng khi ít hoạt động và không có backup tự động
- Gói Free sẽ **tạm dừng dự án sau khoảng 1 tuần ít hoạt động**, và **không có backup tự động / PITR**. Một spa nhỏ có thể có tuần vắng (Tết, nghỉ dài) → website đặt lịch "chết" mà không ai biết.
- **Khắc phục:**
  - **Backup tự động hằng ngày miễn phí:** GitHub Actions chạy `pg_dump` (hoặc `supabase db dump`) → lưu artifact/Google Drive.
  - Giữ dự án luôn "hoạt động": job ping định kỳ (cũng chính là job gửi Telegram tóm tắt lịch hằng ngày — một công đôi việc).
  - Khi doanh thu ổn định, cân nhắc Supabase Pro ($25/tháng) để có backup chính thức.

#### 🟡 E-03. Các giới hạn free tier khác cần ghi chú
- **Resend:** cần xác minh tên miền gửi thư (cần domain riêng), có giới hạn theo ngày — kiểm tra lại số liệu hiện hành.
- **Cloudinary:** gói free tính theo "credits" dùng chung cho lưu trữ + băng thông + biến đổi ảnh, không phải tách bạch "25GB lưu trữ & 25GB băng thông" như MDS ghi — cần kiểm tra lại.
- **Khuyến nghị:** Ảnh tĩnh ít thay đổi có thể dùng luôn **Supabase Storage** hoặc `next/image` + thư mục `public/` để bớt một nhà cung cấp.

---

### 2F. UX/UI

#### 🟠 F-01. Một số cặp màu không đạt độ tương phản tối thiểu (WCAG AA = 4.5:1 cho chữ thường)
| Màu chữ | Nền | Tỷ lệ | Dùng cho | Đánh giá |
| :--- | :--- | :---: | :--- | :---: |
| `#A88B5C` (vàng đồng) | `#F6F1E9` | **2.87** | Eyebrow 11–12px | ❌ |
| `#A88B5C` | `#FFFFFF` | **3.22** | Eyebrow trên thẻ trắng | ❌ |
| `#9A9086` (muted) | `#F6F1E9` | **2.78** | Placeholder, thời gian, chú thích | ❌ |
| `#B7791F` | `#FEF6E6` | **3.39** | Nhãn "Chờ duyệt" | ❌ |
| `#7A7269` | `#F2EFE9` | **4.12** | Nhãn "Đã hủy" | ⚠️ |
| `#6E665F` | `#F6F1E9` | 5.01 | Chữ phụ | ✅ |
| `#2F2A26` | `#F6F1E9` | 12.62 | Chữ chính | ✅ |
- Đặc biệt nhóm khách spa thường có người lớn tuổi; chữ vàng 11px trên nền kem sẽ rất khó đọc ngoài trời.
- **Khắc phục:** Thêm token `--accent-gold-text` đậm hơn (VD khoảng `#7E6638`) cho **chữ**, giữ `#A88B5C` cho icon/viền/trang trí. Tăng Eyebrow lên tối thiểu 12px + `font-weight: 600`. Làm đậm `--text-muted` (VD `#7A7067`). Kiểm tra lại toàn bộ cặp màu badge bằng công cụ contrast checker.

#### 🟠 F-02. Đánh giá "4.9 ★" và Testimonials chưa có nguồn dữ liệu
- Con số được viết cứng trong đặc tả; không có bảng `reviews`/`testimonials`. Hiển thị điểm đánh giá không có thật có thể gây hiểu lầm cho người tiêu dùng.
- **Khắc phục:** Lấy điểm và số lượt từ **Google Business Profile thật** (nhập tay định kỳ vào `spa_settings` cũng được), testimonials có bảng riêng do admin quản lý, có sự đồng ý của khách được trích dẫn.

#### 🟡 F-03. Nội dung cần cấu trúc nhưng schema để dạng TEXT
- `uxui.md` muốn **Timeline 6 bước**, **Đối tượng phù hợp**, **Thành phần chính**, **Làn da phù hợp**, **Hướng dẫn sử dụng** — nhưng schema chỉ có `content TEXT`. Hoặc dùng JSONB có cấu trúc (`steps: [{title, desc}]`, `suitable_for`, `ingredients`...), hoặc quy ước Markdown với heading cố định. Nếu không, admin nhập xong sẽ không ra được giao diện như thiết kế.

#### 🟡 F-04. Các khối nội dung không có chỗ quản trị
- MDS ghi Admin quản lý **Banner**, trang chủ có **Gallery Không gian**, **Testimonials**, Navbar có mục **GIỚI THIỆU** — nhưng không có bảng, không có màn hình admin, không có route `/gioi-thieu`. Cần quyết định: viết cứng (nhanh, chủ spa phải nhờ dev sửa) hay đưa vào CMS mini.

#### 🟡 F-05. Trải nghiệm "chờ duyệt" cần được thiết kế kỹ hơn
- Khách quen với đặt lịch "xác nhận ngay" (như các app đặt chỗ). Màn hình thành công nên nói rõ **thời gian phản hồi dự kiến** ("Spa sẽ xác nhận trong 30 phút trong giờ mở cửa"), và có **kênh liên hệ nhanh** nếu gấp. Với đơn đặt ngoài giờ, thông báo "sẽ xác nhận vào 8:30 sáng mai".

#### ⚪ F-06. Chi tiết nhỏ
- Lỗi chữ: `uxui.md` mục 6.3 có từ **"каталог"** (chữ Cyrillic) → sửa thành "catalog".
- "Hơn 85% khách hàng Spa xem trên điện thoại" chưa có nguồn — nên ghi là giả định, hoặc xác thực bằng Google Analytics sau khi chạy.
- Hai font Serif + Sans + Framer Motion trên mobile: chú ý tải font bằng `next/font` với subset `vietnamese`, chỉ lấy 2–3 weight; giới hạn animation khi người dùng bật `prefers-reduced-motion`.
- Admin dùng nhiều trên **điện thoại của chủ spa** — nên thiết kế màn hình duyệt lịch dạng thẻ trên mobile trước, bảng trên desktop sau (hiện mô tả thiên về bảng).

---

### 2G. Mâu thuẫn giữa các tài liệu

| # | Nội dung | Tài liệu A | Tài liệu B | Đề xuất |
| :-: | :--- | :--- | :--- | :--- |
| 1 | Mã màu thương hiệu | `app.md`: nền `#FAF7F2`, nâu `#3E2F28`, vàng `#C5A059` | `uxui.md`: nền `#F6F1E9`, nâu `#2F2A26`, vàng `#A88B5C` | Lấy `uxui.md` làm chuẩn, sửa `app.md` |
| 2 | Nút liên hệ nổi | MDS: `FloatingZaloButton.tsx` | codebase/uxui: `FloatingContact.tsx` | Thống nhất `FloatingContact.tsx` |
| 3 | Nút liên hệ nổi — nội dung | `layout.md`: 2 nút (Zalo, Gọi), góc dưới phải | `uxui.md`: 4 nút (Maps, Facebook, Zalo, Hotline), dọc mép phải | Chốt 1 phương án |
| 4 | Hàm đăng ký | `actions.md`: `registerMemberAction` | `auth.md` (pages): `registerAction` | Thống nhất 1 tên |
| 5 | Hàm liên kết SĐT | `actions.md`: `linkPhoneAfterGoogleLoginAction` | `auth.md` (pages): `linkPhoneProfileAction` | Thống nhất 1 tên |
| 6 | `ActionResponse` | `codebase.md`: không có `fieldErrors` | `types.md`: có `fieldErrors` | Dùng bản có `fieldErrors` |
| 7 | Biến Cloudinary | `.env.example`: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `lib.md`: `CLOUDINARY_CLOUD_NAME` | Chốt 1 tên |
| 8 | `DATABASE_URL` / Drizzle | MDS có | `.env.example`, `package.json` không có | Bỏ Drizzle hoặc bổ sung đủ |
| 9 | Màu badge CONFIRMED | `uxui.md`: xanh lá trà `#2A6F4E` | `shared.md`: "xanh dương/xanh ngọc" | Theo `uxui.md` |
| 10 | Menu Navbar | `uxui.md`: có GIỚI THIỆU | `layout.md`: không có; không có route `/gioi-thieu` | Thêm route hoặc dùng anchor `/#gioi-thieu` |
| 11 | Sections trang chủ | `uxui.md`: 6 section (có "3 cam kết") | `public.md`: 6 section khác thứ tự/nội dung | Chốt 1 danh sách |
| 12 | Cây thư mục `documents/` | MDS & codebase chỉ liệt kê 1–2 file | Thực tế có 3 file (+ report) | Cập nhật |
| 13 | Thiết lập ban đầu | MDS: bước "Thiết lập Supabase" là Phase 1 | uxui: UI-First với mock, Supabase làm sau | Viết lại roadmap thống nhất (mục 4) |

> **Đề xuất cách làm:** Chỉ định rõ **thứ tự ưu tiên nguồn sự thật**: `MDS.md` (nghiệp vụ & dữ liệu) > `uxui.md` (giao diện) > `codebase.md` (cấu trúc) > các `*.md` trong `source/` (chi tiết triển khai). Khi sửa tài liệu cấp trên, bắt buộc rà các tài liệu cấp dưới. Thêm một **file `CHANGELOG` hoặc mục "Lịch sử phiên bản"** cho tài liệu.

---

### 2H. Vệ sinh Repository

#### 🟡 H-01. Ba bản sao bộ skill AI `impeccable` trong `source/`
- `.agent/`, `.claude/`, `.gemini/` mỗi thư mục chứa gần như cùng một bộ skill (≈ 60 file, trong đó `live-browser.js` ~566KB × 3), cộng thêm `.claude/agents/`, `.agents/hooks.json`, `.impeccable/`.
- **Vấn đề:**
  - Làm phình repo, lẫn với mã nguồn ứng dụng; `tsconfig.json` có `"allowJs": true` và `include: ["**/*.ts"]` — cần đảm bảo các file JS/TS của tool **không bị đưa vào type-check/build**.
  - `.claude/settings.local.json` và `.impeccable/config.local.json` theo quy ước là **cấu hình cá nhân**, không nên commit; `.gitignore` hiện chưa loại trừ.
  - Hooks tự chạy script mỗi lần AI sửa file — tiện, nhưng cần hiểu rõ script làm gì (bảo mật chuỗi cung ứng).
- **Khắc phục:**
  - Chọn **một** công cụ AI chính, hoặc đặt bộ skill ở **thư mục gốc dự án / thư mục người dùng** thay vì trong `source/`.
  - Thêm vào `.gitignore`: `*.local.json`, `.impeccable/`, và (nếu không muốn chia sẻ) `.agent/ .gemini/ .claude/skills/`.
  - Thêm `"exclude": ["node_modules", ".agent", ".claude", ".gemini"]` vào `tsconfig.json`.

#### ⚪ H-02. Các file hướng dẫn `*.md` nằm lẫn trong `src/`
- Rất hữu ích lúc thiết kế, nhưng khi code xong nên **gom vào `documents/architecture/`** hoặc đổi thành `README.md` của từng thư mục để tránh lệch với code thật (tài liệu nằm cạnh code thường bị quên cập nhật). Có thể giữ trong giai đoạn đầu, đặt lịch rà soát sau mỗi phase.
- `.DS_Store` đang nằm ở thư mục gốc `MaiDinhSpa/` (ngoài `source/`) — nếu git init ở gốc thì cần `.gitignore` ở gốc.

---

## 3. Đề xuất chỉnh sửa Database Schema

Các thay đổi chính (không phải SQL hoàn chỉnh — là hướng thiết kế):

```sql
-- 1) Hóa đơn tách khỏi lịch hẹn: mọi lần thu tiền là 1 invoice
CREATE TABLE invoices (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_code       VARCHAR UNIQUE NOT NULL,
  customer_id        UUID REFERENCES customers(id),
  appointment_id     UUID UNIQUE REFERENCES appointments(id), -- NULL nếu khách mua lẻ
  service_subtotal   BIGINT NOT NULL DEFAULT 0 CHECK (service_subtotal >= 0),
  retail_subtotal    BIGINT NOT NULL DEFAULT 0 CHECK (retail_subtotal  >= 0),
  tier_code_snapshot VARCHAR NOT NULL,          -- hạng tại thời điểm thanh toán
  tier_discount      BIGINT NOT NULL DEFAULT 0,
  points_redeemed    INT    NOT NULL DEFAULT 0 CHECK (points_redeemed >= 0),
  points_discount    BIGINT NOT NULL DEFAULT 0,
  final_amount       BIGINT NOT NULL CHECK (final_amount >= 0),
  points_earned      INT    NOT NULL DEFAULT 0,
  status             VARCHAR NOT NULL DEFAULT 'PAID',   -- PAID | VOIDED
  voided_at TIMESTAMPTZ, voided_by UUID, void_reason TEXT,
  created_by UUID NOT NULL, created_at TIMESTAMPTZ DEFAULT now()
);

-- 2) Sổ cái điểm: thêm loại đảo bút toán, hết hạn, chống ghi trùng
ALTER TABLE point_transactions
  ADD COLUMN invoice_id UUID REFERENCES invoices(id),
  ADD COLUMN expires_at TIMESTAMPTZ,
  ADD CONSTRAINT uq_invoice_type UNIQUE (invoice_id, type);  -- 1 hóa đơn chỉ EARN/REDEEM 1 lần
-- type: EARN | REDEEM | ADJUST | REVERSAL | EXPIRE

-- 3) Khách hàng: xác minh SĐT, đồng ý dữ liệu, vắng mặt
ALTER TABLE customers
  ADD COLUMN phone_verified_at TIMESTAMPTZ,
  ADD COLUMN consent_at        TIMESTAMPTZ,
  ADD COLUMN consent_version   VARCHAR,
  ADD COLUMN no_show_count     INT NOT NULL DEFAULT 0;
-- role chuyển sang bảng staff hoặc JWT claims

-- 4) Lịch hẹn: thời điểm tuyệt đối để tính chồng lấn
ALTER TABLE appointments
  ADD COLUMN starts_at TIMESTAMPTZ NOT NULL,
  ADD COLUMN ends_at   TIMESTAMPTZ NOT NULL;
CREATE INDEX ON appointments (starts_at, ends_at) WHERE status IN ('PENDING','CONFIRMED');

-- 5) Ngày nghỉ & giờ mở cửa theo thứ
CREATE TABLE closed_dates (date DATE PRIMARY KEY, reason VARCHAR);
-- spa_settings.opening_hours = {"mon":["08:30","20:00"], ..., "sun":null}

-- 6) Nội dung cho trang chủ
CREATE TABLE testimonials (...);  -- tên hiển thị, nội dung, sao, ảnh, is_published, consent
CREATE TABLE banners (...);       -- ảnh, tiêu đề, link, thời gian hiển thị
```

**Bổ sung `spa_settings`:** `cancel_cutoff_hours`, `min_lead_time_minutes`, `max_advance_days`, `max_redeem_percent`, `points_expiry_months`, `allow_redeem_on_retail`, `tier_review_mode`.

---

## 4. Lộ trình điều chỉnh đề xuất

Gộp MDS (5 phase) và uxui (6 bước UI-First) thành một lộ trình thống nhất:

| Phase | Nội dung | Kết quả nghiệm thu |
| :--- | :--- | :--- |
| **0 — Chốt nghiệp vụ (1–2 buổi)** | Trả lời bảng câu hỏi B-02, A-04; sửa BR-L04; quyết định hosting (E-01); vá thiết kế C-01; đồng bộ 3 tài liệu (2G) | Tài liệu v1.1 được chủ spa ký duyệt |
| **1 — Nền móng** | Init Next.js, shadcn, ESLint/Prettier, design tokens (đã sửa contrast), `lib/data/*` trả mock, cấu trúc thư mục | `npm run dev` chạy, trang trống đúng màu/font |
| **2 — UI Public + Booking (mock)** | Trang chủ, Dịch vụ, Sản phẩm, Đặt lịch (có khung giờ bị khóa), Tra cứu | Chủ spa bấm thử trên điện thoại thật |
| **3 — UI Member + Admin (mock)** | Thẻ thành viên, Admin duyệt lịch, `CheckoutLoyaltyModal` với **hàm tính hóa đơn thuần (có unit test)** | Chủ spa thử 10 tình huống thanh toán mẫu, số khớp tay |
| **4 — Database & Auth** | Supabase migrations, RLS theo ma trận, hàm SQL `create_booking`, `complete_invoice`, `void_invoice`; Google/Email login; luồng liên kết SĐT có xác minh | Test SQL pass; đổi `lib/data/*` sang Supabase, UI không đổi |
| **5 — Thông báo & Vận hành** | Telegram (`after()`), Email, Turnstile + rate limit, cron nhắc lịch/backup/keep-alive, chính sách bảo mật & đồng ý | Đặt lịch thật → Telegram < 3 giây; backup chạy hằng ngày |
| **6 — Go-live** | SEO (sitemap, JSON-LD, Google Business Profile), Sentry, domain, kiểm thử trên iPhone/Android, nhập dữ liệu khách cũ | Ra mắt; theo dõi 2 tuần đầu |

---

## 5. Checklist trước khi bắt đầu code

**Nghiệp vụ**
- [ ] Sửa ví dụ BR-L04; tách tiền Dịch vụ / Sản phẩm
- [ ] Chốt quy tắc: trần trừ điểm, hết hạn điểm, xét/hạ hạng, cộng dồn khuyến mãi, hủy lịch, NO_SHOW
- [ ] Quy định kiểm soát sức chứa theo khoảng thời gian × số khách
- [ ] Ngày nghỉ, giờ mở cửa theo thứ, đặt trước tối thiểu/tối đa
- [ ] Quy trình hủy hóa đơn (VOID) & hóa đơn bán lẻ
- [ ] Chủ spa xác nhận chi phí ưu đãi các hạng (bảng B-05)

**Bảo mật & pháp lý**
- [ ] Liên kết SĐT có xác minh (không tự gắn)
- [ ] Ma trận RLS; hàm `SECURITY DEFINER` cho tác vụ khách vãng lai
- [ ] Turnstile + rate limit cho đặt lịch & tra cứu
- [ ] Chính sách bảo mật + checkbox đồng ý; `skin_notes` chỉ ADMIN đọc
- [ ] Role trong JWT claims / bảng staff

**Kỹ thuật & hạ tầng**
- [ ] Quyết định hosting (Vercel Pro / Cloudflare / VPS)
- [ ] Backup DB tự động hằng ngày + keep-alive
- [ ] Bỏ hoặc cài đủ Drizzle; thống nhất biến môi trường
- [ ] Sửa regex SĐT + chuẩn hóa `+84`
- [ ] Thêm tầng `lib/data/`; sinh types từ Supabase
- [ ] Supabase CLI migrations thay vì 1 file `schema.sql`
- [ ] Upload ảnh trực tiếp lên Cloudinary (signed)
- [ ] ESLint, Prettier, Vitest, GitHub Actions, Sentry
- [ ] Dọn bộ skill AI trùng lặp, cập nhật `.gitignore` & `tsconfig.exclude`

**Giao diện**
- [ ] Sửa các cặp màu không đạt contrast
- [ ] Cấu trúc hóa nội dung dịch vụ/sản phẩm (JSONB hoặc Markdown chuẩn)
- [ ] Quyết định nguồn cho Testimonials, Gallery, Banner, trang Giới thiệu
- [ ] Sửa lỗi chữ "каталог"

---

## 6. Phụ lục

### 6.1. Bảng tóm tắt toàn bộ phát hiện

| Mã | Mức | Tiêu đề |
| :-- | :-: | :-- |
| A-01 | 🔴 | Không kiểm soát sức chứa theo khoảng thời gian |
| B-01 | 🔴 | Ví dụ BR-L04 sai; schema không tách DV/SP |
| C-01 | 🔴 | Chiếm hồ sơ điểm bằng SĐT người khác |
| A-02 | 🟠 | Khách vãng lai không nhận thông báo |
| A-03 | 🟠 | Thiếu ngày nghỉ/ngày lễ |
| B-02 | 🟠 | Thiếu quy tắc biên khi tiêu điểm |
| B-03 | 🟠 | Không thể hủy/sửa hóa đơn đã hoàn thành |
| B-04 | 🟠 | Bán lẻ không cộng chi tiêu |
| C-02 | 🟠 | Dữ liệu sức khỏe nhạy cảm chưa xử lý |
| C-03 | 🟠 | Chưa có chiến lược RLS / Service Role |
| D-01 | 🟠 | Thiếu tầng truy vấn dữ liệu |
| D-02 | 🟠 | Nguy cơ cả trang là Client Component |
| D-03 | 🟠 | Upload ảnh vướng giới hạn body |
| E-01 | 🟠 | Vercel Hobby cấm thương mại |
| E-02 | 🟠 | Supabase Free tạm dừng, không backup |
| F-01 | 🟠 | Màu chữ không đạt contrast |
| F-02 | 🟠 | Điểm đánh giá viết cứng |
| A-04 → A-06, B-05 → B-07, C-04, C-05, D-04 → D-08, E-03, F-03 → F-05, H-01 | 🟡 | Xem chi tiết ở các mục tương ứng |
| A-07, C-06, D-08b, D-09, F-06, H-02 | ⚪ | Nên có |

### 6.2. Gợi ý ma trận RLS

| Bảng | Khách (anon) | Thành viên (authenticated) | ADMIN |
| :--- | :--- | :--- | :--- |
| `services`, `products`, `categories` | Đọc bản `is_active` | Đọc bản `is_active` | Toàn quyền |
| `membership_tiers`, `spa_settings` (phần công khai) | Đọc | Đọc | Toàn quyền |
| `customers` | ✗ | Đọc/sửa **dòng của mình** (trừ `skin_notes`, `role`, `total_spent`, `points_balance`) | Toàn quyền |
| `appointments`, `appointment_items` | ✗ (chỉ qua hàm `create_booking`, `lookup_booking`) | Đọc **của mình**; hủy qua hàm | Toàn quyền |
| `invoices`, `point_transactions` | ✗ | Đọc **của mình** | Ghi chỉ qua hàm SQL transaction; không UPDATE/DELETE ledger |

### 6.3. Công thức kiểm tra độ tương phản
Tỷ lệ tương phản tính theo công thức độ chói tương đối của WCAG 2.x; ngưỡng AA: **4.5:1** cho chữ thường, **3:1** cho chữ lớn (≥ 24px, hoặc ≥ 18.66px đậm) và thành phần đồ họa.

### 6.4. Nguồn tham khảo
- Vercel — Fair Use Guidelines (mục Commercial usage) & Hobby Plan: https://vercel.com/docs/plans/hobby
- Supabase — Pricing (Free plan: tạm dừng sau 1 tuần ít hoạt động, không có backup tự động): https://supabase.com/pricing
- Supabase — Project Pausing: https://supabase.com/docs/guides/platform/free-project-pausing
- Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 (hiệu lực 01/01/2026) và Nghị định 356/2025/NĐ-CP: https://luatvietnam.vn/tin-van-ban-moi/thong-tin-ve-suc-khoe-la-du-lieu-ca-nhan-nhay-cam-186-106394-article.html

---
*Báo cáo được lập dựa trên trạng thái tài liệu ngày 24/11/2026. Các số liệu về gói miễn phí của nhà cung cấp có thể thay đổi — nên kiểm tra lại trước khi chốt hạ tầng.*
