# QUY CHUẨN THIẾT KẾ UX/UI & LỘ TRÌNH DỰNG FULL GIAO DIỆN — MAI ĐINH SPA

> **Mục đích tài liệu:** Quy định thống nhất hệ thống nhận diện thị giác (Tone màu, Font chữ, Độ bo góc, Đổ bóng, Bố cục Component) lấy cảm hứng từ phong cách **Warm Editorial Luxury Spa** và lộ trình triển khai **Full Giao diện 19 màn hình (UI-First)** cho dự án **Mai Đinh Spa**.  
> **Tài liệu liên quan:** [MDS.md](./MDS.md) (Nghiệp vụ) | [codebase.md](./codebase.md) (Cấu trúc thư mục)

---

## MỤC LỤC
1. [Triết lý Thiết kế & Cảm hứng Chủ đạo](#1-triết-lý-thiết-kế--cảm-hứng-chủ-đạo)
2. [Hệ thống Bảng màu Thương hiệu (Color Palette)](#2-hệ-thống-bảng-màu-thương-hiệu-color-palette)
3. [Hệ thống Chữ viết (Typography System)](#3-hệ-thống-chữ-viết-typography-system)
4. [Quy chuẩn Hình khối, Bo góc & Hiệu ứng (Spacing, Radius & Motion)](#4-quy-chuẩn-hình-khối-bo-góc--hiệu-ứng-spacing-radius--motion)
5. [Đặc tả Thiết kế các Thành phần Đặc trưng (Signature Components)](#5-đặc-tả-thiết-kế-các-thành-phần-đặc-trưng-signature-components)
6. [Đặc tả Giao diện Chi tiết 4 Phân hệ (19 Màn hình)](#6-đặc-tả-giao-diện-chi-tiết-4-phân-hệ-19-màn-hình)
7. [Chiến lược UI-First & Lộ trình 6 Bước Triển khai Full Giao diện](#7-chiến-lược-ui-first--lộ-trình-6-bước-triển-khai-full-giao-diện)

---

## 1. Triết lý Thiết kế & Cảm hứng Chủ đạo

Giao diện **Mai Đinh Spa** theo đuổi phong cách **Warm Organic & Editorial Luxury** (Sang trọng ấm áp, tinh tế và thư giãn):
- **Không dùng nền trắng lạnh công nghiệp (`#FFFFFF` toàn trang) hay đen gắt (`#000000`):** Toàn bộ nền trang phủ tông **Kem sữa ấm (Warm Alabaster)** kết hợp các khối thẻ bo tròn lớn (**Bento Soft Cards**), mang lại cảm giác dịu mắt, thư thái ngay giây đầu tiên khách mở web.
- **Tối giản nhưng có điểm nhấn đắt giá:** Kết hợp giữa tiêu đề **chữ có chân (Serif)** thanh lịch kiểu tạp chí làm đẹp và nội dung **chữ không chân (Sans-serif)** hiện đại, gọn gàng kèm sắc **Vàng đồng trầm (Muted Champagne Gold)**.
- **Ưu tiên trải nghiệm Điện thoại (Mobile-First):** Hơn 85% khách hàng Spa xem dịch vụ và đặt lịch trên điện thoại; mọi nút bấm đều có dạng viên thuốc (`Pill Button`) cao tối thiểu `44px` dễ chạm bằng một ngón tay.

---

## 2. Hệ thống Bảng màu Thương hiệu (Color Palette)

Toàn bộ biến màu dưới đây sẽ được khai báo tập trung trong `src/app/globals.css` để dùng thống nhất trên toàn bộ 19 màn hình:

### 2.1. Màu Nền & Bề mặt (Background & Surfaces)

| Tên Token CSS | Mã Hex | Vai trò sử dụng trong giao diện |
| :--- | :--- | :--- |
| `--bg-canvas` | `#F6F1E9` | **Nền tổng thể toàn trang web** (Kem sữa ấm dịu mắt). |
| `--bg-surface-soft` | `#FAF7F2` | **Nền khối thẻ mềm** (Khối giới thiệu Hero bên trái, thẻ giá trị cốt lõi, nền phụ). |
| `--bg-surface-card` | `#FFFFFF` | **Nền thẻ nổi bật** (Thanh Pill Navbar, Thanh đánh giá 5 sao, Thẻ Dịch vụ/Sản phẩm, Bảng Admin). |
| `--bg-pill-active` | `#EAE2D6` | **Nền mục Menu đang chọn** (Active tab dạng viên thuốc trên Navbar & Bộ lọc danh mục). |
| `--border-subtle` | `#E6DDD0` | **Đường viền mảnh** của thẻ, ô nhập liệu Input và nút bấm phụ (Secondary Button). |

### 2.2. Màu Chữ & Điểm nhấn Thương hiệu (Text & Brand Accents)

| Tên Token CSS | Mã Hex | Vai trò sử dụng trong giao diện |
| :--- | :--- | :--- |
| `--text-primary` | `#2F2A26` | **Nâu Espresso đậm** — Dùng cho Tiêu đề lớn, chữ chính và **Nền nút CTA chính (`Đặt Lịch Ngay`)**. |
| `--text-secondary` | `#6E665F` | **Nâu xám ấm** — Dùng cho đoạn văn mô tả dịch vụ, công dụng mỹ phẩm, phụ đề. |
| `--text-muted` | `#9A9086` | **Nâu nhạt** — Dùng cho placeholder ô nhập liệu, chú thích nhỏ, thời gian. |
| `--accent-gold` | `#A88B5C` | **Vàng đồng trầm** — Dùng cho dòng chữ Eyebrow in hoa, ngôi sao đánh giá `★`, icon điểm nhấn. |
| `--accent-gold-light` | `#F4ECE0` | **Nền vàng kem nhạt** — Làm nền cho nhãn thời lượng dịch vụ (VD: `60 phút`) hoặc ưu đãi. |

### 2.3. Màu Trạng thái Lịch hẹn & Hạng Thành viên (Status & Loyalty Tiers)

| Đối tượng | Nhãn hiển thị | Màu nền (Bg) | Màu chữ / Viền (Text) | Ý nghĩa thị giác |
| :--- | :--- | :--- | :--- | :--- |
| **Lịch `PENDING`** | Chờ Spa duyệt | `#FEF6E6` | `#B7791F` | Vàng hổ phách ấm — Nhắc Chủ Spa xử lý ngay |
| **Lịch `CONFIRMED`** | Đã xác nhận | `#EBF5F0` | `#2A6F4E` | Xanh lá trà — Cảm giác an tâm, đã giữ chỗ |
| **Lịch `COMPLETED`** | Hoàn thành | `#E6EFEA` | `#1E563B` | Xanh ngọc đậm — Đã thanh toán & cộng điểm |
| **Lịch `CANCELLED`** | Đã hủy | `#F2EFE9` | `#7A7269` | Xám trung tính nhẹ nhàng |
| **Lịch `NO_SHOW`** | Vắng mặt | `#FCECEB` | `#B83B33` | Đỏ đất trầm — Cảnh báo khách bỏ hẹn |
| **Hạng `MEMBER`** | Thành viên mới | `#FAF6F0` | `#6E665F` | Thẻ kem thanh lịch mở đầu hành trình |
| **Hạng `SILVER`** | Hạng Bạc | `#EEF0F2` | `#4A5568` | Ánh xám bạc tinh tế (Giảm 5%) |
| **Hạng `GOLD`** | Hạng Vàng | `#FBF3DC` | `#9C7426` | Vàng Champagne sang trọng (Giảm 10%) |
| **Hạng `VIP`** | Kim Cương | `#2F2A26` | `#E3C383` | Thẻ đen nâu Espresso chữ vàng kim quyền lực (Giảm 12%) |

### 2.4. Bộ sưu tập 6 Bảng màu Thương hiệu Tùy chọn (Live Switchable Themes)

Hệ thống được tích hợp sẵn bộ chuyển đổi trực tiếp góc dưới bên trái màn hình (`ThemePaletteSwitcher.tsx`) kèm thanh trượt điều chỉnh độ đậm sắc nền (`--p-color-amount`), cho phép Chủ Spa xem thử và đổi tức thì giữa **6 thế giới màu sắc** (tất cả đều đạt chuẩn tương phản WCAG AA ≥ 4.5:1):

| Mã Theme (`data-theme`) | Tên Bảng màu | Nền trang (`canvas`) | Nút & Mực chính (`action`) | Điểm nhấn (`accent`) | Cá tính & Định vị phù hợp |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `alabaster-espresso` | **1. Kem Sữa & Nâu Espresso** *(Mặc định)* | `#F6F1E9` | `#2B2521` | `#745B2F` | Ấm áp, sang trọng kiểu tạp chí làm đẹp cổ điển (mẫu tham chiếu gốc). |
| `herbal-celadon` | **2. Ngọc Thảo Mộc & Rêu Rừng** | `#F1F5F0` | `#1B3B2B` | `#235D3E` | Tươi mát, thư thái hơi thở lá bồ kết, sả chanh & gội dưỡng sinh Đông y. |
| `blush-camellia` | **3. Phấn Hoa Trà & Mận Trầm** | `#FAF2F0` | `#3F2128` | `#7D424D` | Mềm mại, nữ tính cao cấp chuẩn thẩm mỹ viện Hàn – Pháp. |
| `kyoto-matcha` | **4. Trà Gạo Rang & Gỗ Tuyết Tùng** | `#F4F3EB` | `#283623` | `#5B4D20` | Tối giản, tĩnh mịch phong cách thiền trà & đá nóng Onsen Nhật Bản. |
| `clinical-cobalt` | **5. Sứ Trắng & Xanh Khoáng Chất** | `#F1F5F9` | `#1A324A` | `#1E4E79` | Tinh khiết, chuẩn phòng khám da liễu & phục hồi công nghệ cao B5/Peptide. |
| `velvet-oud` | **6. Đêm Trầm Hương & Vàng Kim** *(Dark)* | `#181512` | `#DFC084` | `#E2C182` | Không gian VIP ánh nến trầm mặc, chữ kem ngà & nút vàng Champagne. |

---

## 3. Hệ thống Chữ viết (Typography System)

Sử dụng cặp đôi Google Fonts hỗ trợ **100% tiếng Việt có dấu mượt mà**, khai báo trong `src/app/layout.tsx`:

1. **Font Tiêu đề Nghệ thuật (`--font-serif`): `Playfair Display` (hoặc `Cormorant Garamond`)**
   - Dùng cho: Tiêu đề Hero chính, Tiêu đề lớn của từng Section (*Dịch Vụ Nổi Bật*, *Không Gian Thư Giãn*), Tên gói dịch vụ trong trang chi tiết, Con số điểm xếp hạng `4.9`.
   - Quy tắc: `font-weight: 500` hoặc `600`, `line-height: 1.15 - 1.25`, không viết in hoa toàn bộ để giữ nét mềm mại của chữ có chân.
2. **Font Nội dung & Giao diện (`--font-sans`): `Plus Jakarta Sans` (hoặc `Be Vietnam Pro`)**
   - Dùng cho: Toàn bộ đoạn văn mô tả, Menu điều hướng, Nút bấm, Form đặt lịch, Bảng giá VNĐ và toàn bộ khu vực Admin Portal.
3. **Thang kích thước chữ chuẩn (Type Scale):**
   - **Eyebrow Label (Nhãn dẫn nhập trên tiêu đề):** Sans-serif, IN HOA, `11px - 12px`, `letter-spacing: 0.2em`, màu `#A88B5C`, đi kèm vạch ngang mảnh dài `32px` phía trước (VD: `─── LÀM ĐẸP - THƯ GIÃN - TÁI TẠO NĂNG LƯỢNG`).
   - **Hero Title (H1):** Serif, `36px` (Mobile) → `52px` (Desktop).
   - **Section Title (H2):** Serif, `28px` (Mobile) → `38px` (Desktop).
   - **Card Title (H3):** Serif hoặc Sans SemiBold, `18px - 20px`.
   - **Body Text:** Sans Regular, `15px - 16px`, `line-height: 1.7` (dễ đọc, thoáng mắt).

---

## 4. Quy chuẩn Hình khối, Bo góc & Hiệu ứng (Spacing, Radius & Motion)

Để giữ đúng tinh thần mềm mại như mẫu thiết kế tham chiếu:
- **Độ bo góc (Border Radius):**
  - Khối Bento lớn (Hero Card, Banner, Ảnh lớn): `rounded-[28px]` (`28px`).
  - Thẻ Dịch vụ, Thẻ Sản phẩm, Thẻ Thành viên điện tử, Modal: `rounded-2xl` hoặc `rounded-3xl` (`20px - 24px`).
  - Thanh Navbar nổi, Nút bấm (Primary/Secondary), Nhãn trạng thái (Badge), Nút lọc danh mục: **Bo tròn viên thuốc tuyệt đối `rounded-full` (`9999px`)**.
  - Ô nhập liệu Form (Input, Select, Textarea): `rounded-xl` (`12px`), chiều cao chuẩn `h-12` (`48px`) tạo cảm giác cao cấp, thoáng đãng.
- **Đổ bóng (Soft Shadows):**
  - Không dùng bóng đen đậm. Chỉ dùng bóng nâu ấm siêu mịn: `shadow-[0_8px_30px_rgb(47,42,38,0.05)]`.
- **Họa tiết trang trí nền (Subtle Watermark):**
  - Các khối thẻ mềm (`#FAF7F2`) có thể điểm xuyết đường tròn mảnh `1px` màu `#EAE2D6` ở góc thẻ tạo chiều sâu tinh tế.
- **Chuyển động (Framer Motion):**
  - Mọi hiệu ứng xuất hiện khi cuộn trang dùng chuyển động êm chậm (`duration: 0.5s`, `ease: 'easeOut'`), thẻ dịch vụ khi rê chuột nổi nhẹ lên `-4px` và ảnh bên trong phóng nhẹ `scale-[1.03]`.

---

## 5. Đặc tả Thiết kế các Thành phần Đặc trưng (Signature Components)

### 5.1. Thanh Điều hướng Viên thuốc Nổi (`Navbar.tsx`)
- **Kiểu dáng:** Nằm tách rời mép trên `16px` (`sticky top-4 z-50`), khung trắng `#FFFFFF`, bo tròn `rounded-full`, viền mảnh `#EFE9DF`, đổ bóng mịn, căn giữa màn hình.
- **Bố cục trên Máy tính (Cân đối với Logo Mai Đinh Spa ở trung tâm):**
  - Cụm trái: `TRANG CHỦ` (khi đang chọn có nền pill `#EAE2D6`) · `GIỚI THIỆU` · `DỊCH VỤ` · `SẢN PHẨM`
  - Chính giữa: **Logo Mai Đinh Spa** (huy hiệu vàng đồng tinh tế)
  - Cụm phải: `ĐẶT LỊCH` · `TRA CỨU` · Nút `THÀNH VIÊN` (hoặc hiển thị Tên + Hạng nếu đã đăng nhập)
- **Bố cục trên Điện thoại:** Thanh pill gọn gàng gồm Logo bên trái + Nút `Đặt Lịch` nhỏ ở giữa + Nút Menu 3 gạch mở ngăn kéo mượt mà bên phải.

### 5.2. Khối Mở đầu Bất đối xứng (Bento Split Hero Section)
- Chia lưới 12 cột trên Desktop (`grid-cols-1 lg:grid-cols-12 gap-6`):
  - **Khối chữ bên trái (5 cột):** Nền `#FAF7F2`, `rounded-[28px]`, padding rộng `p-8 lg:p-12`, chứa dòng Eyebrow vàng đồng → Tiêu đề lớn Serif tôn vinh vẻ đẹp tự nhiên tại Mai Đinh Spa → Đoạn giới thiệu ngắn gọn ấm áp → Cụm 2 nút viên thuốc:
    - Nút chính: `Đặt Lịch Ngay →` (Nền `#2F2A26`, chữ trắng, hover chuyển nâu đồng).
    - Nút phụ: `Gói Dịch Vụ` (Nền trong suốt, viền `#D8CFC2`, chữ `#2F2A26`).
  - **Khối hình ảnh & Đánh giá bên phải (7 cột):**
    - Phần trên: Ảnh thực tế không gian đón khách & trị liệu tại Mai Đinh Spa (`rounded-[28px]`, tỷ lệ hài hòa).
    - Phần dưới (ngay sát dưới ảnh): Thanh ngang trắng `rounded-2xl` hiển thị điểm uy tín **`4.9 ★★★★★`** kèm số lượt khách hài lòng và 1 câu trích dẫn cảm nhận tiêu biểu của khách hàng.

### 5.3. Cụm Liên hệ Nhanh Nổi Bên Phải (`FloatingContact.tsx`)
- Xếp dọc gọn gàng sát mép phải màn hình gồm các nút tròn `42px` đổ bóng nhẹ:
  1. Chỉ đường **Google Maps** tới Mai Đinh Spa.
  2. **Facebook Fanpage**.
  3. **Zalo Tư vấn** (nổi bật cho khách hỏi sản phẩm bán lẻ).
  4. **Gọi Hotline** trực tiếp.

### 5.4. Thiết kế Thẻ Dịch vụ vs Thẻ Sản phẩm (Phân biệt rõ nghiệp vụ)
- **`ServiceCard.tsx` (Có đặt lịch):** Ảnh bo góc → Nhãn thời lượng (`⏱ 60 phút`) → Tên dịch vụ → Mô tả ngắn 2 dòng → Giá tiền màu nâu đậm + Nút viên thuốc **`Đặt lịch →`**.
- **`ProductCard.tsx` (Chỉ xem, không giỏ hàng):** Ảnh mỹ phẩm nền sáng → Thương hiệu & Dung tích (`50ml`) → Tên sản phẩm → Nhãn trạng thái `● Có sẵn tại Spa` + Giá tham khảo → Nút **`Xem chi tiết`** (bên trong trang chi tiết là nút **Nhắn Zalo tư vấn**, hoàn toàn không có icon giỏ hàng).

---

## 6. Đặc tả Giao diện Chi tiết 4 Phân hệ (19 Màn hình)

### Phân hệ 1: Giao diện Khách hàng (`src/components/pages/public/`)
1. **`HomePage.tsx`:**
   - Section 1: Bento Split Hero + Thanh đánh giá 4.9 sao.
   - Section 2: 3 Thẻ Cam kết Giá trị cốt lõi (Mỹ phẩm chính hãng dịu nhẹ · Chăm sóc cá nhân hóa tận tâm · Chuẩn vệ sinh & Không gian yên tĩnh).
   - Section 3: Dịch vụ Chăm sóc Nổi bật (Tab lọc nhanh + Lưới 6 thẻ dịch vụ chủ lực + Nút xem toàn bộ bảng giá).
   - Section 4: Sản phẩm Chăm sóc Da Trưng bày tại Spa (Lưới 4 sản phẩm tiêu biểu).
   - Section 5: Banner Đặc quyền Thẻ Thành viên Mai Đinh Spa (Giới thiệu tích điểm lên hạng giảm tới 15%, mời đăng ký miễn phí).
   - Section 6: Hình ảnh Không gian & Cảm nhận Khách hàng + Khối Đặt lịch nhanh cuối trang.
2. **`ServicesPage.tsx` & `ServiceDetailPage.tsx`:**
   - Thanh bộ lọc dạng viên thuốc ngang (`Tất cả`, `Chăm sóc da mặt`, `Gội đầu dưỡng sinh`, `Massage cổ vai gáy`, `Triệt lông / Liệu trình chuyên sâu`).
   - Trang chi tiết trình bày rõ: Giá, Thời lượng, Đối tượng phù hợp, **Timeline các bước thực hiện** (Bước 1 → Bước 6) tạo sự chuyên nghiệp và tin tưởng tuyệt đối.
3. **`ProductsPage.tsx` & `ProductDetailPage.tsx`:**
   - Trưng bày như một cuốn каталог mỹ phẩm cao cấp tại Spa: Lọc theo công dụng (*Cấp ẩm, Phục hồi, Chống nắng, Làm sạch*), trang chi tiết nêu rõ Thành phần chính, Làn da phù hợp và nút **Liên hệ Zalo / Hotline để được Chủ Spa soi da & tư vấn**.
4. **`BookingPage.tsx` (Trải nghiệm Đặt lịch 3 Bước Mượt mà):**
   - Giao diện chia 2 cột: Cột trái là 3 bước chọn (1. Chọn một hoặc nhiều dịch vụ → 2. Chọn ngày trên lịch & ô khung giờ dạng lưới nút bấm `09:00`, `09:30`... → 3. Nhập Họ tên, SĐT, Số khách, Ghi chú); Cột phải là **Phiếu Tóm tắt Lịch hẹn (Sticky Summary)** tự cộng tổng thời gian & chi phí dự kiến, ghi rõ *"Miễn phí đặt trước — Chờ Mai Đinh Spa xác nhận"*.
   - Màn hình Hoàn tất: Hiển thị phiếu báo thành công sang trọng kèm **Mã lịch hẹn `MDS-xxxxxx`** và nút sao chép mã.
5. **`BookingLookupPage.tsx`:**
   - Khung tra cứu gọn gàng giữa trang: Nhập SĐT + Mã lịch hẹn → Hiển thị tiến trình trạng thái trực quan (`Đã gửi yêu cầu` → `Chủ Spa đã duyệt` → `Hoàn thành`).

### Phân hệ 2: Giao diện Tài khoản (`src/components/pages/auth/`)
6. **`LoginPage.tsx`, `RegisterPage.tsx`, `UpdatePhonePage.tsx`:**
   - Khung thẻ bo góc `rounded-[28px]` nền trắng đặt trên nền kem ấm `#F6F1E9`, có hình ảnh hoa lá/spa nghệ thuật bên cạnh (trên Desktop).
   - Ưu tiên nút **"Tiếp tục với Google"** ở vị trí đầu tiên, bên dưới là đường kẻ mảnh *"hoặc dùng Email"* cùng các ô nhập liệu bo góc mềm mại.

### Phân hệ 3: Giao diện Thành viên Thân thiết (`src/components/pages/member/`)
7. **`MemberDashboardPage.tsx`:**
   - Điểm nhấn trung tâm là **Chiếc Thẻ Thành Viên Điện Tử (Digital Card)** tỷ lệ giống thẻ ngân hàng cao cấp, đổ màu chuyển sắc theo đúng hạng của khách (`Member`, `Bạc`, `Vàng`, `Kim Cương`), in nổi Tên thành viên, SĐT và Số điểm khả dụng.
   - Ngay bên dưới là **Thanh tiến trình lên hạng** trực quan và danh sách đặc quyền ưu đãi tương ứng.
8. **`MemberBookingsPage.tsx` & `PointHistoryPage.tsx`:**
   - Thiết kế dạng danh sách thẻ sạch sẽ trên mobile và bảng thoáng trên desktop; màu sắc cộng điểm (`+` xanh lá trà) và đổi điểm (`-` vàng đồng) rõ ràng, dễ hiểu.

### Phân hệ 4: Giao diện Quản trị Chủ Spa (`src/components/pages/admin/`)
- **Tone màu Admin:** Giữ chung bảng màu kem ấm - nâu Espresso đồng bộ thương hiệu nhưng tăng diện tích nền trắng `#FFFFFF` để Chủ Spa nhìn bảng số liệu suốt nhiều giờ vẫn thoáng, rõ nét và thao tác cực nhanh:
9. **`AdminDashboardPage.tsx`:** 4 thẻ KPI lớn trên đầu + Danh sách lịch `Chờ duyệt` có nút **Duyệt 1 chạm** ngay tại chỗ.
10. **`AdminBookingsPage.tsx`:** Bộ lọc trạng thái bằng tab viên thuốc, cảnh báo trùng khung giờ bằng nhãn màu hổ phách, và Popup **`CheckoutLoyaltyModal`** tính tiền thực thu — chiết khấu hạng — trừ điểm — cộng điểm tự động trên cùng 1 khung nhìn.
11. **`AdminCustomersPage.tsx`, `AdminServicesPage.tsx`, `AdminProductsPage.tsx`, `AdminSettingsPage.tsx`:** Đồng bộ bảng dữ liệu sạch sẽ, thanh tìm kiếm tức thời theo SĐT và cửa sổ trượt/popup thêm sửa dịch vụ, mỹ phẩm trực quan.

---

## 7. Chiến lược UI-First & Lộ trình 6 Bước Triển khai Full Giao diện

Để bạn có thể **nhìn thấy, bấm thử và duyệt toàn bộ 19 màn hình trên trình duyệt nhanh nhất** mà chưa bị vướng vào việc tạo tài khoản Supabase hay cấu hình API Key phức tạp:

> **Nguyên tắc triển khai UI-First:**
> - Tạo 1 file dữ liệu mẫu chuẩn thực tế tại `src/lib/mock-data.ts` (chứa sẵn danh sách dịch vụ thật của Spa, mỹ phẩm mẫu, 4 hạng thành viên, các đơn đặt lịch mẫu và lịch sử điểm mẫu).
> - Toàn bộ các trang và nút bấm (Đặt lịch, Tra cứu, Duyệt lịch, Tính điểm tại quầy, Chuyển hạng thành viên) đều tương tác mượt mà trên trình duyệt. Khi giao diện đã ưng ý 100%, chỉ cần thay nguồn dữ liệu từ `mock-data.ts` sang Supabase trong Giai đoạn sau mà **không phải đập đi sửa lại bất kỳ dòng giao diện nào**!

### Lộ trình 6 Bước Code Giao diện Tuần tự

| Bước | Hạng mục triển khai | Các file được hoàn thiện | Kết quả kiểm tra trên Trình duyệt |
| :--- | :--- | :--- | :--- |
| **Bước 1** | **Cài đặt thư viện, Design Tokens & Khung Layout chung** | `globals.css`, `app/layout.tsx`, `lib/mock-data.ts`, `components/ui/*`, `Navbar.tsx`, `Footer.tsx`, `FloatingContact.tsx` | Lên đúng nền kem ấm `#F6F1E9`, font chữ Serif/Sans sang trọng, thanh Pill Navbar nổi và cụm nút Zalo/Maps bên phải. |
| **Bước 2** | **Trang chủ Landing Page chuẩn mẫu tham chiếu** | `HomePage.tsx`, `ServiceCard.tsx`, `ProductCard.tsx`, `(public)/page.tsx` | Hoàn thiện trọn vẹn Landing Page từ Bento Split Hero, đánh giá 4.9 sao, 3 cam kết, Dịch vụ/Sản phẩm nổi bật đến khối Thành viên. |
| **Bước 3** | **Các trang Dịch vụ, Sản phẩm trưng bày** | `ServicesPage.tsx`, `ServiceDetailPage.tsx`, `ProductsPage.tsx`, `ProductDetailPage.tsx` + các route tương ứng | Lọc danh mục mượt mà, xem chi tiết quy trình dịch vụ và chi tiết mỹ phẩm kèm nút tư vấn Zalo (không giỏ hàng). |
| **Bước 4** | **Luồng Đặt lịch hẹn Chờ duyệt & Tra cứu lịch** | `BookingPage.tsx`, `BookingLookupPage.tsx`, `(public)/dat-lich`, `(public)/tra-cuu-lich` | Chọn nhiều dịch vụ, chọn ngày & khung giờ trực quan, xem phiếu tóm tắt chi phí dự kiến, nhận mã đơn `MDS-xxxxxx` và tra cứu trạng thái. |
| **Bước 5** | **Khu vực Đăng nhập & Cổng Thành viên Thân thiết** | `LoginPage`, `RegisterPage`, `UpdatePhonePage`, `MemberSidebar`, `MemberDashboardPage`, `MemberBookingsPage`, `PointHistoryPage` | Trải nghiệm đăng nhập, ngắm Thẻ thành viên điện tử đổi màu theo 4 hạng, thanh tiến trình chi tiêu và sổ cái lịch sử điểm. |
| **Bước 6** | **Khu vực Quản trị Chủ Mai Đinh Spa (Admin Portal)** | `AdminSidebar`, `AdminDashboardPage`, `AdminBookingsPage`, `CheckoutLoyaltyModal`, `AdminCustomersPage`, `AdminServicesPage`, `AdminProductsPage`, `AdminSettingsPage` | Chủ Spa bấm duyệt lịch, thử nghiệm Popup thanh toán tại quầy (nhập tiền thực thu + trừ điểm + xem điểm cộng mới) và quản lý toàn bộ Spa. |
