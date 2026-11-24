'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { cn, formatVND } from '@/lib/utils';

interface ServicePillar {
  id: string;
  tabLabel: string;
  title: string;
  summary: string;
  durationRange: string;
  priceFrom: number;
  imageUrl: string;
  imageAlt: string;
  highlights: string[];
  signatureTreatments: { name: string; duration: string; price: number; slug: string }[];
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'skincare',
    tabLabel: 'Chăm sóc & Phục hồi Da',
    title: 'Phác đồ chăm sóc da chuẩn y khoa — êm dịu, không bào mòn',
    summary:
      'Mỗi buổi hẹn bắt đầu bằng bước kiểm tra độ ẩm và độ nhạy cảm thực tế của nền da. Mai Đinh Spa kết hợp làm sạch sâu bằng enzyme thực vật, lấy nhân mụn chuẩn vô khuẩn và điện di lạnh giúp da sáng mịn ngay mà không cần nghỉ dưỡng.',
    durationRange: '70 – 90 phút / buổi',
    priceFrom: 350000,
    imageUrl: '/images/service-facial.svg',
    imageAlt: 'Liệu trình chăm sóc và điện di phục hồi da chuyên sâu tại Mai Đinh Spa',
    highlights: [
      'Dụng cụ lấy nhân mụn hấp tiệt trùng tia UV-C niêm phong riêng từng khách',
      'Điện di lạnh 5°C đưa tinh chất Panthenol B5 & Peptide thấm sâu không châm chích',
      'Vòm chiếu ánh sáng sinh học Omega hỗ trợ làm dịu đỏ và kiểm soát bã nhờn',
    ],
    signatureTreatments: [
      {
        name: 'Cấp ẩm Đa tầng & Phục hồi Màng Bảo vệ Da B5',
        duration: '75 phút',
        price: 450000,
        slug: 'cap-am-da-tang-phuc-hoi-b5',
      },
      {
        name: 'Thanh lọc Da Mụn Chuẩn Y khoa & Đèn Sinh học Omega',
        duration: '70 phút',
        price: 350000,
        slug: 'thanh-loc-da-mun-chuan-y-khoa',
      },
      {
        name: 'Trẻ hóa Căng bóng Da Peptide & Nâng cơ Vi điểm Collagen',
        duration: '90 phút',
        price: 790000,
        slug: 'tre-hoa-cang-bong-peptide-collagen',
      },
    ],
  },
  {
    id: 'herbal-hair',
    tabLabel: 'Gội đầu Dưỡng sinh Đông y',
    title: 'Nước thảo mộc 9 vị nấu tươi mỗi sáng & đả thông huyệt đạo đầu – vai – cổ',
    summary:
      'Không sử dụng dầu gội công nghiệp pha sẵn, khu dưỡng sinh của Spa đun mới nồi bồ kết nướng, vỏ bưởi, sả chanh, gừng sẻ và hương nhu mỗi ngày. Kết hợp vòm tuần hoàn nước thảo dược ấm giúp làm ấm da đầu và đưa bạn vào giấc ngủ sâu tự nhiên.',
    durationRange: '70 phút trọn gói',
    priceFrom: 290000,
    imageUrl: '/images/service-herbal.svg',
    imageAlt: 'Gội đầu dưỡng sinh thảo mộc nấu tươi và vòm nước ấm tuần hoàn',
    highlights: [
      '24 thao tác khai thiên môn, ấn huyệt thái dương và phong trì giảm căng thẳng',
      'Kết hợp rửa mặt massage nâng cơ sữa chua yến mạch ngay trong liệu trình',
      'Sấy dưỡng tinh chất vỏ bưởi kích thích nang tóc chắc khỏe và thưởng trà gạo lứt',
    ],
    signatureTreatments: [
      {
        name: 'Gội đầu Dưỡng sinh Thảo mộc Nấu tươi & Ấn huyệt Đầu Vai Cổ',
        duration: '70 phút',
        price: 290000,
        slug: 'goi-dau-duong-sinh-thao-moc-nau-tuoi',
      },
    ],
  },
  {
    id: 'body-therapy',
    tabLabel: 'Trị liệu Cổ Vai Gáy & Đá nóng',
    title: 'Giải phóng bó cơ sâu vùng cổ – bả vai với đá núi lửa Bazan giữ nhiệt',
    summary:
      'Thiết kế chuyên biệt cho dân văn phòng đau mỏi vai gáy, tê bì cánh tay hoặc lạnh bàn chân. Kỹ thuật viên điều chỉnh lực miết mở cơ theo đúng ngưỡng chịu lực cá nhân của bạn, kết hợp hơi ấm sâu từ đá Bazan và tinh dầu gừng sẻ nguyên chất.',
    durationRange: '75 – 90 phút / buổi',
    priceFrom: 450000,
    imageUrl: '/images/service-body.svg',
    imageAlt: 'Trị liệu đá nóng Bazan và massage giải cơ cổ vai gáy',
    highlights: [
      'Mở đầu bằng 10 phút ngâm chân muối hồng Himalaya và lá ngải cứu ấm',
      'Tập trung xử lý kỹ các điểm co cứng dọc cơ thang, bả vai và thắt lưng',
      'Phòng trị liệu ánh sáng dịu, hương cam Bergamot và oải hương Pháp thư thái',
    ],
    signatureTreatments: [
      {
        name: 'Trị liệu Đá nóng Bazan & Đả thông Cổ Vai Gáy Chuyên sâu',
        duration: '90 phút',
        price: 480000,
        slug: 'tri-lieu-da-nong-bazan-co-vai-gay',
      },
      {
        name: 'Massage Thư giãn Toàn thân Tinh dầu Cam Bergamot & Oải hương',
        duration: '75 phút',
        price: 450000,
        slug: 'massage-toan-than-tinh-dau-bergamot',
      },
    ],
  },
];

export default function ServicePillarsShowcase() {
  const [activeId, setActiveId] = useState<string>(SERVICE_PILLARS[0].id);
  const current = SERVICE_PILLARS.find((p) => p.id === activeId) ?? SERVICE_PILLARS[0];

  return (
    <div className="mt-8">
      {/* Pillar Selector Pills */}
      <div
        role="tablist"
        aria-label="Ba nhóm chuyên môn dịch vụ tại Mai Đinh Spa"
        className="flex flex-wrap gap-2.5"
      >
        {SERVICE_PILLARS.map((pillar) => {
          const selected = pillar.id === activeId;
          return (
            <button
              key={pillar.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(pillar.id)}
              className={cn(
                'min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                selected
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-xs'
                  : 'border border-[var(--border-strong)] bg-[var(--bg-surface-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-pill-active)] hover:text-[var(--text-primary)]'
              )}
            >
              {pillar.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Active Pillar Editorial Panel */}
      <div
        role="tabpanel"
        className="mt-6 grid gap-8 rounded-[28px] border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] p-6 shadow-[var(--shadow-ambient)] sm:p-9 lg:grid-cols-12 lg:items-center"
      >
        {/* Visual & Quick Specs (5 cols) */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)]">
            <Image
              src={current.imageUrl}
              alt={current.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[16px] bg-[var(--bg-surface-soft)] px-4 py-3 text-xs tabular-nums">
            <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text-secondary)]">
              <Clock className="h-4 w-4 text-[var(--accent-gold-text)]" strokeWidth={1.75} />
              {current.durationRange}
            </span>
            <span className="font-semibold text-[var(--text-primary)]">
              Chi phí từ {formatVND(current.priceFrom)}
            </span>
          </div>
        </div>

        {/* Deep Description & Direct Menu Links (7 cols) */}
        <div className="lg:col-span-7">
          <h3 className="font-serif-display text-2xl font-medium leading-snug text-[var(--text-primary)] sm:text-3xl">
            {current.title}
          </h3>

          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {current.summary}
          </p>

          <ul className="mt-5 space-y-2 text-sm text-[var(--text-secondary)]">
            {current.highlights.map((hl) => (
              <li key={hl} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-sage)]"
                  strokeWidth={1.85}
                />
                <span>{hl}</span>
              </li>
            ))}
          </ul>

          {/* Direct Sub-Menu Rows */}
          <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase">
              Các gói tiêu biểu thuộc nhóm này:
            </p>
            <div className="mt-3 divide-y divide-[var(--border-subtle)] rounded-[18px] border border-[var(--border-subtle)] bg-[var(--bg-surface-soft)] px-4">
              {current.signatureTreatments.map((item) => (
                <div
                  key={item.slug}
                  className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
                >
                  <Link
                    href={`/dich-vu/${item.slug}`}
                    className="font-medium text-[var(--text-primary)] hover:underline"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-4 tabular-nums">
                    <span className="text-xs text-[var(--text-muted)]">{item.duration}</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {formatVND(item.price)}
                    </span>
                    <Link
                      href={`/dat-lich?service=${item.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--btn-primary-bg)] px-3 py-1 text-xs font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)]"
                    >
                      Đặt hẹn
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
