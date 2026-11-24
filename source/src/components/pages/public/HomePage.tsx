import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { MembershipTier, Product, Service, SpaSettings, Testimonial } from '@/types';
import { formatVND } from '@/lib/utils';
import ServiceCard from '@/components/shared/ServiceCard';
import ProductCard from '@/components/shared/ProductCard';
import MembershipTierBadge from '@/components/shared/MembershipTierBadge';
import ServicePillarsShowcase from '@/components/shared/ServicePillarsShowcase';

interface HomePageProps {
  featuredServices: Service[];
  featuredProducts: Product[];
  tiers: MembershipTier[];
  testimonials: Testimonial[];
  settings: SpaSettings;
}

export default function HomePage({
  featuredServices,
  featuredProducts,
  tiers,
  testimonials,
  settings,
}: HomePageProps) {
  const leadTestimonial = testimonials[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* 1. FIRST VIEWPORT — Asymmetric Bento Split Hero + Porcelain Proof Bar */}
      <section aria-label="Giới thiệu Mai Đinh Spa" className="grid gap-7 lg:grid-cols-12 lg:items-stretch">
        {/* Left Editorial Statement Card (5 columns) */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-7 sm:p-10 lg:col-span-5 lg:p-11">
          <svg
            aria-hidden="true"
            viewBox="0 0 220 220"
            className="pointer-events-none absolute -top-12 -right-12 h-52 w-52 text-[var(--border-subtle)]"
            fill="none"
          >
            <circle cx="150" cy="70" r="110" stroke="currentColor" strokeWidth="1.2" />
          </svg>

          <div className="relative">
            <h1 className="font-serif-display text-4xl font-medium tracking-tight text-[var(--text-primary)] sm:text-5xl lg:leading-[1.12]">
              Đánh thức vẻ đẹp tự nhiên &amp; sự thư thái nguyên bản
            </h1>

            <p className="mt-5 text-[15px] leading-[1.75] text-[var(--text-secondary)]">
              Tại {settings.spaName}, chúng tôi luôn chú trọng mang đến cho bạn cảm giác thoải mái, được chăm sóc tận tâm và an tâm trong suốt trải nghiệm — thông qua các dòng dược mỹ phẩm dịu nhẹ, minh bạch nguồn gốc cùng đội ngũ kỹ thuật viên được đào tạo bài bản.
            </p>
          </div>

          <div className="relative mt-8 pt-2">
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/dat-lich"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[var(--btn-primary-bg)] px-7 py-3 text-sm font-semibold text-[var(--btn-primary-text)] shadow-[var(--shadow-ambient)] transition-all hover:-translate-y-0.5 hover:bg-[var(--btn-primary-hover)]"
              >
                Đặt Lịch Ngay
                <ArrowRight className="h-4 w-4" strokeWidth={1.85} />
              </Link>

              <Link
                href="/dich-vu"
                className="inline-flex min-h-12 items-center rounded-full border border-[var(--border-strong)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-pill-active)]"
              >
                Gói Dịch Vụ
              </Link>
            </div>

            <p className="mt-4 text-xs text-[var(--text-muted)]">
              Giữ chỗ trước miễn phí 100% · Thanh toán trực tiếp tại quầy sau khi trải nghiệm
            </p>
          </div>
        </div>

        {/* Right Sanctuary Visual + Porcelain Rating Strip (7 columns) */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[#EDE4D5] sm:min-h-[390px]">
            <Image
              src="/images/hero-sanctuary.svg"
              alt="Không gian phòng trị liệu và thảo mộc tươi tại Mai Đinh Spa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[var(--bg-surface-card)]/92 px-3.5 py-1.5 text-xs font-medium text-[var(--text-primary)] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
              01 Cơ sở duy nhất · Quận 3, TP.HCM
            </div>
          </div>

          {/* Porcelain Social Proof Bar beneath Hero Photo */}
          <div className="flex flex-col justify-between gap-3 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] px-5 py-4 shadow-[var(--shadow-ambient)] sm:flex-row sm:items-center sm:px-6">
            <div className="flex items-center gap-3 shrink-0">
              <span className="tabular-nums font-serif-display text-2xl font-semibold text-[var(--text-primary)]">
                {settings.googleRatingScore.toFixed(1)}
              </span>
              <div className="flex items-center gap-0.5 text-[#B5893D]" aria-label="5 trên 5 sao">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="tabular-nums text-xs font-medium text-[var(--text-muted)]">
                {settings.googleReviewCount}+ lượt ghé
              </span>
              {settings.isRatingDemo && (
                <span className="rounded-full bg-[var(--bg-surface-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-muted)]">
                  Minh họa
                </span>
              )}
            </div>

            {leadTestimonial && (
              <p className="text-xs italic leading-relaxed text-[var(--text-secondary)] sm:text-right">
                “Trải nghiệm thư giãn tĩnh lặng, thảo mộc nấu tươi ấm áp và hoàn toàn không chèo kéo.” —{' '}
                <span className="not-italic font-medium text-[var(--text-primary)]">
                  Chị Minh Thư
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL COMMITMENT STRIP */}
      <section
        aria-labelledby="heading-commitments"
        className="mt-8 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-6 sm:p-10"
      >
        <div className="flex flex-col justify-between gap-4 border-b border-[var(--border-subtle)] pb-7 md:flex-row md:items-end">
          <h2
            id="heading-commitments"
            className="max-w-xl font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl"
          >
            Sự an tâm bắt đầu từ những tiêu chuẩn nhỏ nhất trong phòng trị liệu
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
            Không chạy theo số lượng khách đại trà, Mai Đinh Spa giới hạn tối đa {settings.maxConcurrentBeds} giường hoạt động cùng lúc để giữ trọn sự tĩnh lặng.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3 md:divide-x md:divide-[var(--border-subtle)]">
          <div className="md:pr-6">
            <h3 className="font-serif-display text-xl font-medium text-[var(--text-primary)]">
              Dược mỹ phẩm chuyên nghiệp &amp; dịu nhẹ
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              Mọi hoạt chất dùng trên da đều có nguồn gốc rõ ràng, ưu tiên phục hồi hàng rào sinh học và an toàn cho cả nền da nhạy cảm nhất.
            </p>
          </div>

          <div className="md:px-8">
            <h3 className="font-serif-display text-xl font-medium text-[var(--text-primary)]">
              Chuẩn vệ sinh khép kín 1 khách 1 bộ riêng
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              Khăn trải, bông gạc và dụng cụ lấy nhân mụn được hấp tiệt trùng tia UV riêng biệt trước mỗi khung giờ hẹn đã xác nhận.
            </p>
          </div>

          <div className="md:pl-8">
            <h3 className="font-serif-display text-xl font-medium text-[var(--text-primary)]">
              Không chèo kéo trong suốt giờ nghỉ ngơi
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              Bảng giá niêm yết công khai từng liệu trình lẻ. Kỹ thuật viên tập trung hoàn toàn vào tay nghề để bạn được ngủ sâu trọn buổi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL TOUR OF SPA SPACES & CLINICAL FACILITIES (#khong-gian) */}
      <section
        id="khong-gian"
        aria-labelledby="heading-facilities"
        className="mt-20 scroll-mt-24"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2
              id="heading-facilities"
              className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl"
            >
              Không gian &amp; Cơ sở vật chất tại Mai Đinh Spa
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
              Mỗi phân khu chức năng được tách biệt độ ồn, nhiệt độ và ánh sáng riêng để phục vụ đúng mục đích: chăm sóc da chuẩn y khoa cần độ sạch tuyệt đối, còn khu dưỡng sinh cần hơi ấm và sự tĩnh mịch.
            </p>
          </div>

          <Link
            href="/dat-lich"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface-card)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-pill-active)]"
          >
            Đặt lịch ghé trải nghiệm
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        {/* Asymmetric Bento Facility Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Primary Clinical Treatment Suite (7 columns) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 sm:p-8 lg:col-span-7">
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[var(--bg-surface-soft)]">
                <Image
                  src="/images/facility-treatment-room.svg"
                  alt="Phòng chăm sóc da chuyên sâu có rèm đũi ngăn riêng và máy điện di lạnh"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-6 font-serif-display text-2xl font-medium text-[var(--text-primary)] sm:text-3xl">
                Phòng Chăm sóc Da Riêng tư &amp; Thiết bị Không xâm lấn
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Mỗi giường trị liệu bọc nệm êm rộng 90cm đều có hệ thống rèm vải đũi dày ngăn cách kín đáo, đảm bảo sự riêng tư tuyệt đối cho khách hàng nữ. Đầu giường trang bị máy điện di lạnh 5°C, đầu sóng nâng cơ RF thế hệ mới và vòm ánh sáng sinh học bước sóng kép hỗ trợ phục hồi da ngay tại chỗ.
              </p>
            </div>

            <div className="mt-6 grid gap-3 border-t border-[var(--border-subtle)] pt-5 sm:grid-cols-2">
              <div className="flex items-center gap-2.5 text-xs font-medium text-[var(--text-primary)]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--accent-sage)]" strokeWidth={1.85} />
                <span>Tủ hấp tiệt trùng dụng cụ tia UV-C y tế</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-[var(--text-primary)]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--accent-sage)]" strokeWidth={1.85} />
                <span>Ga trải giường &amp; khăn mặt thay mới 100% mỗi lượt</span>
              </div>
            </div>
          </article>

          {/* Right Column: Herbal Head-Spa Room + Tea Consultation Lounge (5 columns) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <article className="flex-1 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[var(--bg-surface-soft)]">
                <Image
                  src="/images/facility-herbal-sanctuary.svg"
                  alt="Phòng gội dưỡng sinh bồn sứ và vòm tuần hoàn nước thảo dược ấm"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
                Phòng Gội Dưỡng Sinh Cách Âm &amp; Bồn Sứ Tuần Hoàn Nước Ấm
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Tách biệt hoàn toàn khỏi khu vực lễ tân để không vướng tiếng trò chuyện. Giường gội thiết kế nâng đỡ hõm cổ chống mỏi gáy suốt 70 phút kết hợp vòm đồng dẫn nước thảo dược giữ nhiệt ổn định.
              </p>
            </article>

            <article className="flex-1 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-[var(--bg-surface-soft)]">
                <Image
                  src="/images/facility-tea-lounge.svg"
                  alt="Sảnh thưởng trà dưỡng nhan, góc soi da và tủ khóa cá nhân"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
                Sảnh Trà Dưỡng Nhan, Góc Soi Da &amp; Tủ Khóa Cá Nhân
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Nơi bạn cất giữ tư trang trong tủ khóa chìa riêng, dùng khăn ấm tẩm tinh dầu sả chanh, soi kiểm tra nền da cùng Chủ Spa trước buổi làm và nhâm nhi chén trà gạo lứt táo đỏ ấm nóng khi hoàn tất.
              </p>
            </article>
          </div>
        </div>

        {/* Facility Infrastructure Specs Ledger */}
        <dl className="mt-6 grid gap-4 rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[16px] bg-[var(--bg-surface-card)] p-4">
            <dt className="text-xs font-medium text-[var(--text-muted)]">Mật độ vận hành</dt>
            <dd className="mt-1 tabular-nums font-serif-display text-2xl font-semibold text-[var(--text-primary)]">
              Tối đa 04 giường
            </dd>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Không gian luôn thoáng đãng, kỹ thuật viên chăm sóc sát sao từng khách.
            </p>
          </div>

          <div className="rounded-[16px] bg-[var(--bg-surface-card)] p-4">
            <dt className="text-xs font-medium text-[var(--text-muted)]">Hệ thống nước &amp; Nhiệt</dt>
            <dd className="mt-1 font-serif-display text-2xl font-semibold text-[var(--text-primary)]">
              Lọc mềm &amp; Giữ ấm
            </dd>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Nguồn nước rửa mặt và gội đầu qua bộ lọc khử clo giúp bảo vệ da &amp; tóc.
            </p>
          </div>

          <div className="rounded-[16px] bg-[var(--bg-surface-card)] p-4">
            <dt className="text-xs font-medium text-[var(--text-muted)]">Mùi hương &amp; Âm thanh</dt>
            <dd className="mt-1 font-serif-display text-2xl font-semibold text-[var(--text-primary)]">
              Tinh dầu nguyên chất
            </dd>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Khuếch tán tinh dầu thiên nhiên dịu nhẹ, nhạc trị liệu tần số thấp dễ ngủ.
            </p>
          </div>

          <div className="rounded-[16px] bg-[var(--bg-surface-card)] p-4">
            <dt className="text-xs font-medium text-[var(--text-muted)]">Tiện ích chỉnh trang</dt>
            <dd className="mt-1 font-serif-display text-2xl font-semibold text-[var(--text-primary)]">
              Bàn sấy &amp; Kem chống nắng
            </dd>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              Chuẩn bị sẵn máy sấy ion, lược sạch, dưỡng tóc và chống nắng trước khi bạn ra về.
            </p>
          </div>
        </dl>
      </section>

      {/* 4. IN-DEPTH INTRODUCTION TO 3 CORE SERVICE PILLARS */}
      <section aria-labelledby="heading-service-pillars" className="mt-20">
        <div className="max-w-2xl">
          <h2
            id="heading-service-pillars"
            className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl"
          >
            Chuyên môn dịch vụ cốt lõi tại Mai Đinh Spa
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
            Thay vì dàn trải hàng chục dịch vụ đại trà, chúng tôi tập trung làm thật sâu 3 nhóm liệu trình giải quyết trực tiếp làn da mệt mỏi và cơ thể căng cứng của phụ nữ hiện đại.
          </p>
        </div>

        <ServicePillarsShowcase />
      </section>

      {/* 5. 4-STEP GUEST CARE JOURNEY */}
      <section
        aria-labelledby="heading-journey"
        className="mt-20 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-7 sm:p-10"
      >
        <div className="max-w-2xl">
          <h2
            id="heading-journey"
            className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl"
          >
            Hành trình 4 bước đón tiếp trong mỗi lần hẹn
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Rõ ràng ngay từ phút đầu tiên để cả những vị khách lần đầu đi Spa cũng luôn cảm thấy tự nhiên, thoải mái.
          </p>
        </div>

        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
            <span className="tabular-nums inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-xs font-bold text-[var(--btn-primary-text)]">
              1
            </span>
            <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
              Đón tiếp &amp; Dùng trà ấm
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Lễ tân đối chiếu mã hẹn giữ chỗ sẵn, gửi chìa khóa tủ đồ cá nhân và mời bạn dùng trà thảo mộc ấm.
            </p>
          </li>

          <li className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
            <span className="tabular-nums inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-xs font-bold text-[var(--btn-primary-text)]">
              2
            </span>
            <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
              Kiểm tra da &amp; Chọn lực ấn
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Chuyên viên lắng nghe tình trạng da, vùng vai cổ đang mỏi, mùi tinh dầu yêu thích và thống nhất chi phí trước khi làm.
            </p>
          </li>

          <li className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
            <span className="tabular-nums inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-xs font-bold text-[var(--btn-primary-text)]">
              3
            </span>
            <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
              Trị liệu tĩnh lặng trọn giờ
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Thực hiện đầy đủ từng bước theo đúng thời lượng cam kết trong không gian rèm riêng không tiếng ồn.
            </p>
          </li>

          <li className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-5">
            <span className="tabular-nums inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--btn-primary-bg)] text-xs font-bold text-[var(--btn-primary-text)]">
              4
            </span>
            <h3 className="mt-4 font-serif-display text-xl font-medium text-[var(--text-primary)]">
              Dưỡng nhan &amp; Tích điểm hạng
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              Hướng dẫn cách chăm sóc tại nhà, thanh toán minh bạch tại quầy và cộng điểm trực tiếp vào thẻ thành viên.
            </p>
          </li>
        </ol>
      </section>

      {/* 6. FEATURED SERVICES CARDS */}
      <section aria-labelledby="heading-services" className="mt-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="heading-services"
              className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl"
            >
              Bảng giá các gói dịch vụ nổi bật
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
              Mỗi gói dịch vụ đều ghi rõ thời lượng thực hiện và chi phí trọn gói — không phát sinh phụ phí tip bắt buộc.
            </p>
          </div>
          <Link
            href="/dich-vu"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-soft)]"
          >
            Xem toàn bộ bảng giá
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 7. CURATED IN-SPA SKINCARE CATALOG (VIEW-ONLY, NO CART) */}
      <section aria-labelledby="heading-products" className="mt-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="heading-products"
              className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl"
            >
              Sản phẩm chăm sóc tại nhà tuyển chọn
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
              Trưng bày và phân phối chính hãng trực tiếp tại quầy lễ tân Mai Đinh Spa sau khi kỹ thuật viên kiểm tra nền da thực tế của bạn.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[var(--border-strong)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface-soft)]"
          >
            Xem tất cả sản phẩm
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. LOYALTY & MEMBERSHIP SHOWCASE */}
      <section
        aria-labelledby="heading-loyalty"
        className="mt-20 overflow-hidden rounded-[28px] border border-[var(--feature-banner-border)] bg-[var(--feature-banner-bg)] p-7 text-[#FAF7F2] sm:p-11"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h2
              id="heading-loyalty"
              className="font-serif-display text-3xl font-medium text-[#FAF7F2] sm:text-4xl"
            >
              Thẻ Thành viên Thân thiết — Đổi điểm ưu đãi không bao giờ tụt hạng
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#D8CEC2]">
              Hệ thống Mai Đinh Spa tách biệt hoàn toàn <strong className="font-semibold text-white">Tổng chi tiêu xét hạng trọn đời</strong> và <strong className="font-semibold text-white">Ví điểm thưởng khả dụng</strong>. Bạn thoải mái dùng điểm trừ trực tiếp vào hóa đơn tại quầy mà vẫn giữ nguyên đặc quyền giảm giá theo hạng.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-[#EAE0D3]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#DFC084]" strokeWidth={1.85} />
                <span>Quy đổi minh bạch: 1 điểm = 1.000đ trừ thẳng khi thanh toán</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#DFC084]" strokeWidth={1.85} />
                <span>Đăng ký miễn phí bằng Google hoặc Email, không tốn phí SMS</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dang-ky"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#DFC084] px-6 py-2.5 text-sm font-semibold text-[#231D19] transition-colors hover:bg-[#EAD09B]"
              >
                <Award className="h-4 w-4" strokeWidth={1.85} />
                Mở thẻ thành viên miễn phí
              </Link>
              <Link
                href="/tai-khoan"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#5A4E44] px-5 py-2.5 text-sm font-semibold text-[#FAF7F2] transition-colors hover:bg-white/10"
              >
                Xem thử Thẻ Thành viên
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col justify-between rounded-[22px] border border-[var(--feature-banner-border)] bg-[var(--feature-banner-card)] p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <MembershipTierBadge tierCode={tier.code} />
                    <span className="tabular-nums text-xs font-semibold text-[#DFC084]">
                      {tier.discountPercent > 0 ? `Giảm ${tier.discountPercent}% DV` : 'Tích điểm chuẩn'}
                    </span>
                  </div>
                  <p className="mt-3 tabular-nums text-xs text-[#C7BBB0]">
                    Mốc tích lũy:{' '}
                    <span className="font-semibold text-white">
                      {tier.minSpent === 0 ? 'Đăng ký mới (0đ)' : `Từ ${formatVND(tier.minSpent)}`}
                    </span>
                  </p>
                  <p className="mt-1 tabular-nums text-xs text-[#C7BBB0]">
                    Tỷ lệ cộng: <span className="font-semibold text-[#DFC084]">100.000đ = {tier.pointsPer100k} điểm</span>
                  </p>
                </div>
                <p className="mt-4 border-t border-[#4A4038] pt-3 text-xs leading-relaxed text-[#DFD6CA]">
                  {tier.benefits[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GUEST REFLECTIONS & CLOSING INVITATION */}
      <section aria-labelledby="heading-reviews" className="mt-20">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <h2
            id="heading-reviews"
            className="font-serif-display text-3xl font-medium text-[var(--text-primary)] sm:text-4xl"
          >
            Chia sẻ từ khách hàng thân thiết
          </h2>
          <span className="text-xs text-[var(--text-muted)]">
            * Trích dẫn minh họa phục vụ duyệt giao diện
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="flex flex-col justify-between rounded-[24px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6"
            >
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                “{item.quote}”
              </p>
              <footer className="mt-5 border-t border-[var(--border-subtle)] pt-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {item.customerLabel}
                </p>
                <p className="mt-0.5 text-xs text-[var(--accent-gold-text)]">
                  {item.serviceUsed} · {item.visitedMonth}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Closing Reservation Invitation */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] p-8 text-center sm:flex-row sm:p-10 sm:text-left">
          <div>
            <h2 className="font-serif-display text-2xl font-medium text-[var(--text-primary)] sm:text-3xl">
              Dành tặng bản thân 75 phút nghỉ ngơi trọn vẹn hôm nay
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Chọn khung giờ phù hợp với lịch trình của bạn — Chủ Spa sẽ xác nhận giữ giường ngay trong vòng 30 phút.
            </p>
          </div>
          <Link
            href="/dat-lich"
            className="inline-flex min-h-12 shrink-0 items-center gap-2.5 rounded-full bg-[var(--btn-primary-bg)] px-7 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--btn-primary-hover)]"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={1.85} />
            Đặt lịch hẹn trước
          </Link>
        </div>
      </section>
    </div>
  );
}
