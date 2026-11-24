---
name: Mai Đinh Spa
description: Hệ thống nhận diện giao diện Warm Botanical Sanctuary cho Mai Đinh Spa
colors:
  espresso-primary: "#2B2521"
  burnished-brass: "#745B2F"
  champagne-ornament: "#B59461"
  botanical-sage: "#1F5C3E"
  warm-alabaster: "#F6F1E9"
  soft-linen: "#FAF7F2"
  pure-porcelain: "#FFFFFF"
  travertine-sidebar: "#EFE9DF"
  toasted-oat: "#E8DFD1"
  roasted-umber: "#5C534B"
  warm-taupe: "#6E645B"
  hairline-sand: "#E2D8C9"
typography:
  display:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Be Vietnam Pro, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  bento: "28px"
  card: "24px"
  control: "12px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "32px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.espresso-primary}"
    textColor: "{colors.soft-linen}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  button-secondary:
    backgroundColor: "{colors.pure-porcelain}"
    textColor: "{colors.espresso-primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  nav-pill-active:
    backgroundColor: "{colors.toasted-oat}"
    textColor: "{colors.espresso-primary}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Mai Đinh Spa

## Overview

**Creative North Star: "The Warm Botanical Sanctuary"**

Hệ thống giao diện **Mai Đinh Spa** từ chối hoàn toàn nền trắng công nghiệp chói mắt hay các hiệu ứng kính mờ màu mè thường thấy ở web thẩm mỹ đại trà. Toàn bộ không gian số được bao phủ bởi chất liệu vữa kem ấm như ánh nắng sớm chiếu qua rèm vải đũi trong phòng trị liệu yên tĩnh, kết hợp hình minh họa khắc nét thảo mộc truyền thống và chữ mực nâu Espresso sâu lắng.

Hệ thống tách bạch rõ hai chế độ trải nghiệm trên cùng một ngôn ngữ thương hiệu: Khu vực Khách hàng (**Persuade**) ưu tiên nhịp thở thoáng đãng, tiêu đề có chân nghệ thuật và các khối Bento mềm mại; khu vực Thành viên và Quản trị Chủ Spa (**Operate**) chuyển sang thang chữ không chân chuẩn xác, số liệu thẳng hàng (`tabular-nums`) và tương tác một chạm tức thời.

**Key Characteristics:**
- Bề mặt đa lớp từ Kem sữa ấm, Đũi sáng đến Sứ trắng, tạo chiều sâu bằng sắc độ thay vì bóng đổ nặng nề.
- Nút bấm, nhãn trạng thái và thanh điều hướng nổi đồng nhất ngôn ngữ viên thuốc tròn trịa (`9999px`).
- Độ tương phản chữ được hiệu chỉnh nghiêm ngặt đạt chuẩn WCAG AA (≥ 4.5:1) trên mọi nền kem ấm.
- Chữ số tài chính, giờ hẹn, thời lượng phút và điểm thưởng luôn khóa độ rộng cột số (`tabular-nums`).

## Colors

Bảng màu được chắt lọc từ đá Travertine, gỗ nâu rang, đồng thau sẫm và lá thảo mộc nấu tươi.

### Primary
- **Deep Roasted Espresso** (`#2B2521`): Mực in chính cho toàn bộ tiêu đề, văn bản trọng tâm và nền nút kêu gọi hành động chính (`Đặt Lịch Ngay`), đạt tỷ lệ tương phản 13.5:1 trên nền trang.

### Secondary
- **Burnished Brass** (`#745B2F`): Sắc đồng trầm dành riêng cho chữ nhấn, danh mục dịch vụ và thông tin quy đổi điểm (đạt chuẩn tương phản AA 5.4:1 trên nền kem).
- **Champagne Bronze** (`#B59461`): Dành riêng cho đường viền mảnh, huy hiệu trang trí và biểu tượng không mang chức năng đọc văn bản nhỏ.

### Tertiary
- **Steeped Herbal Sage** (`#1F5C3E`): Biểu thị sự an tâm của lịch hẹn đã xác nhận giữ giường, trạng thái mỹ phẩm có sẵn tại quầy và bút toán cộng điểm dương.

### Neutral
- **Warm Alabaster** (`#F6F1E9`): Nền tổng thể toàn bộ khung nhìn trình duyệt.
- **Soft Linen** (`#FAF7F2`): Bề mặt khối giới thiệu Hero, ô nhập liệu và vùng thông tin phụ.
- **Pure Porcelain** (`#FFFFFF`): Bề mặt thẻ dịch vụ, thanh điều hướng nổi và bảng số liệu thu ngân.
- **Travertine Rail** (`#EFE9DF`): Lớp nền riêng cho thanh điều hướng bên của Thành viên và Chủ Spa.
- **Toasted Oat** (`#E8DFD1`): Nền đánh dấu tab điều hướng đang chọn.
- **Roasted Umber** (`#5C534B`) & **Warm Taupe** (`#6E645B`): Hai cấp chữ phụ và chú thích, đều vượt ngưỡng tương phản 5.1:1.
- **Hairline Sand** (`#E2D8C9`): Đường kẻ phân tách tinh tế giữa các khối nội dung.

### Named Rules
**The Brass-Ink Split Rule.** Tuyệt đối không dùng vàng nhạt trang trí (`#B59461`) để viết chữ cỡ nhỏ trên nền kem hoặc trắng; mọi văn bản màu đồng bắt buộc dùng **Burnished Brass** (`#745B2F`).

**The Zero Pure-Black Rule.** Không bao giờ sử dụng màu đen `#000000` cho chữ, nền thẻ VIP hay bóng đổ; sắc tối nhất trong toàn hệ thống là nâu than ấm `#2B2521`.

## Typography

**Display Font:** Spectral (with Georgia, serif fallback)
**Body Font:** Be Vietnam Pro (with system-ui, sans-serif fallback)

**Character:** Spectral mang nét điêu khắc thanh thoát hỗ trợ trọn vẹn dấu tiếng Việt cho các tựa đề trải nghiệm Spa, trong khi Be Vietnam Pro giữ sự gãy gọn, rõ ràng tuyệt đối cho biểu mẫu đặt lịch và sổ cái điểm thưởng.

### Hierarchy
- **Display** (`500`, `3rem`, `1.12` line-height): Tiêu đề chính mở đầu trang chủ và các trang danh mục lớn.
- **Headline** (`500`, `2.25rem`, `1.2` line-height): Tiêu đề phân đoạn nội dung trên bề mặt khách hàng.
- **Title** (`600`, `1.25rem`, `1.35` line-height): Tiêu đề màn hình vận hành Admin, Thành viên và cửa sổ thu ngân.
- **Body** (`400`, `0.9375rem`, `1.65` line-height): Văn bản mô tả quy trình trị liệu và hướng dẫn sử dụng sản phẩm (độ rộng dòng tối đa 65–72 ký tự).
- **Label** (`600`, `0.75rem`, `0.08em` tracking): Mục điều hướng trên thanh viên thuốc và nhãn trạng thái.

### Named Rules
**The Operate Sans-Only Rule.** Trong khu vực `/tai-khoan` và `/admin`, mọi nhãn điều khiển, bảng biểu và nút thao tác chỉ dùng **Be Vietnam Pro** với kích thước cố định; không đưa chữ có chân vào điều khiển nghiệp vụ.

**The Tabular Ledger Rule.** Mọi giá tiền VNĐ, khung giờ (`14:30`), thời lượng (`75 phút`), số điện thoại và điểm thưởng bắt buộc bật `font-variant-numeric: tabular-nums`.

## Layout

Trang khách hàng đặt trong khung tối đa `1280px` (`max-w-7xl`) với lề ngang `16px–32px`. Mở đầu trang chủ sử dụng lưới bất đối xứng 12 cột: khối tuyên ngôn thương hiệu chiếm 5 cột trái và bức tranh không gian thảo mộc kèm dải đánh giá sứ trắng chiếm 7 cột phải. Khu vực vận hành Chủ Spa chuyển sang bố cục thanh điều hướng dọc cố định `272px` bên trái trên máy tính và thanh tiêu đề gọn trên điện thoại, hiển thị đơn lịch hẹn dạng thẻ thao tác nhanh trước khi mở rộng bảng đối soát.

## Elevation & Depth

Hệ thống ưu tiên phân tầng bằng độ sáng bề mặt (Alabaster → Linen → Porcelain) kết hợp viền cát mảnh `1px` (`#E2D8C9`). Bóng đổ chỉ xuất hiện rất nhẹ dưới thanh điều hướng nổi và khi người dùng rê chuột nâng thẻ dịch vụ.

### Shadow Vocabulary
- **Ambient Float** (`box-shadow: 0 10px 32px -4px rgba(43, 37, 33, 0.06), 0 2px 8px -2px rgba(43, 37, 33, 0.04)`): Dùng cho thanh điều hướng viên thuốc và phiếu tóm tắt lịch hẹn cố định.
- **Elevated Hover** (`box-shadow: 0 18px 42px -8px rgba(43, 37, 33, 0.1), 0 4px 12px -2px rgba(43, 37, 33, 0.05)`): Phản hồi khi rê chuột vào thẻ dịch vụ/sản phẩm hoặc hộp thoại thu ngân.

### Named Rules
**The Warm-Shadow Offset Rule.** Mọi bóng đổ đều pha sắc nâu ấm `rgba(43, 37, 33, ...)` và có độ lệch trục dọc dương; không dùng vầng sáng không độ lệch hay viền màu một cạnh bên của thẻ bo tròn.

## Shapes

Ngôn ngữ hình khối kết hợp sự mềm mại của viên thuốc (`9999px`) cho toàn bộ phần tử có thể bấm/lọc với các khung chứa Bento bo góc rộng (`24px–28px`) cho vùng nội dung. Ô nhập liệu biểu mẫu giữ độ bo vừa phải (`12px`) và chiều cao chuẩn `48px` để phân biệt rõ giữa vùng gõ chữ và nút hành động viên thuốc.

## Components

### Buttons
- **Shape:** Viên thuốc tròn hoàn toàn (`9999px`), chiều cao chạm tối thiểu `44px–48px`.
- **Primary:** Nền `#2B2521`, chữ `#FAF7F2`, đệm ngang `24px–28px`.
- **Hover / Focus:** Chuyển nền ấm `#3F3630`, nhấc nhẹ `-2px` trên trang giới thiệu; vòng tiêu điểm bàn phím `2px solid #745B2F` cách `2px`.
- **Secondary:** Nền trong suốt hoặc trắng sứ, viền `1px solid #C9B8A0`, chữ `#2B2521`, khi chạm chuyển nền `#E8DFD1`.

### Chips
- **Style:** Nền kem hoặc xanh trà nhạt theo ngữ nghĩa trạng thái, đi kèm chấm tròn `6px` cùng màu chữ để nhận diện không phụ thuộc hoàn toàn vào màu sắc.
- **State:** Tab bộ lọc đang chọn đổi sang nền `#2B2521` chữ `#FAF7F2` hoặc nền `#E8DFD1` trên thanh điều hướng.

### Cards / Containers
- **Corner Style:** Khối Hero và khung chính bo `28px`; thẻ dịch vụ, sản phẩm và đơn hẹn bo `24px`.
- **Background:** `#FFFFFF` cho thẻ tương tác trên nền `#F6F1E9`; `#FAF7F2` cho khối dẫn nhập tĩnh.
- **Border:** Viền kín `1px solid #E2D8C9`.
- **Internal Padding:** `20px` cho thẻ danh mục, `28px–44px` cho khối Bento lớn.

### Inputs / Fields
- **Style:** Viền `1px solid #C9B8A0`, nền `#FAF7F2`, bo góc `12px`, cao `44px–48px`.
- **Focus:** Vòng nét liền `2px solid #745B2F` với `outline-offset: 2px`.
- **Error / Disabled:** Báo lỗi nền `#FCE9E7` chữ `#8F2820`; khung giờ kín giường làm mờ `65%` kèm nhãn lý do cụ thể (*Kín giường* hoặc *Quá giờ đóng cửa*).

### Navigation
- **Floating Pill Navbar:** Căn giữa cách mép trên `16px`, nền trắng sứ viền `#E2D8C9`, biểu trưng `MĐ Mai Đinh Spa` đặt sát ngoài cùng bên trái, dải liên kết điều hướng chữ in hoa `12px` giãn chữ `0.06em` nằm ở chính giữa và cụm nút `Thành viên` / `Quản trị` nằm ngoài cùng bên phải. Trên di động thu gọn thành nút `Đặt lịch` trực tiếp cạnh nút mở ngăn kéo menu.

### Digital Loyalty Card & Checkout Calculator
- **Digital Loyalty Card:** Đổi chất liệu bề mặt theo 4 cấp hạng (`Thành viên` đũi sáng, `Bạc` xám ánh kim, `Vàng` champagne ấm, `Kim Cương` nâu Espresso chữ vàng kim), tách đôi hai cột số liệu **Ví điểm khả dụng** và **Tổng chi tiêu xét hạng trọn đời**.

## Do's and Don'ts

### Do:
- **Do** giữ sự khác biệt rõ rệt giữa `ServiceCard` (có thời lượng phút và nút `Đặt lịch`) với `ProductCard` (hiển thị dung tích, trạng thái tồn tại quầy và nút `Xem chi tiết` dẫn tới tư vấn Zalo).
- **Do** kiểm tra và khóa trực tiếp các khung giờ vượt quá số giường đồng thời hoặc lố giờ đóng cửa ngay trên lưới chọn giờ.
- **Do** gắn nhãn minh họa rõ ràng cho các số liệu đánh giá mẫu khi chưa đấu nối dữ liệu thực tế.

### Don't:
- **Don't** đặt dòng chữ nhãn nhỏ (eyebrow/kicker) phía trên mọi tiêu đề; hãy để tiêu đề `Spectral` tự dẫn dắt thị giác.
- **Don't** thêm biểu tượng giỏ hàng, số lượng mua online hay nút thanh toán trước vào bất kỳ màn hình sản phẩm bán lẻ nào.
- **Don't** gộp chung tiền dịch vụ và tiền mỹ phẩm vào một ô khi tính chiết khấu hạng thành viên tại quầy.
