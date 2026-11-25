import React from 'react';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Logo chữ ký Mai Đinh · SKINLAB.SPA đã tách nền Alpha Matte độ nét cao:
 * - Phần chữ ký tay "Mai Đinh" dùng CSS mask-image nên tự động đổi màu mực (--text-primary)
 *   theo cả 6 bảng màu Sáng & Tối.
 * - Dòng phụ đề "SKINLAB . SPA" đặt đúng hõm dưới chân chữ M bằng vector sắc nét màu đồng (--accent-gold-text).
 */
export default function BrandLogo({ size = 'md', className }: BrandLogoProps) {
  const dimensions = {
    sm: {
      scriptW: 'w-[116px]',
      scriptH: 'h-[41px]',
      subText: 'text-[8px] tracking-[0.26em] -mt-2 pl-[23%]',
    },
    md: {
      scriptW: 'w-[128px] sm:w-[144px]',
      scriptH: 'h-[45px] sm:h-[50px]',
      subText: 'text-[8.5px] sm:text-[9px] tracking-[0.28em] -mt-2.5 pl-[23%]',
    },
    lg: {
      scriptW: 'w-[168px]',
      scriptH: 'h-[59px]',
      subText: 'text-[10px] tracking-[0.3em] -mt-3 pl-[23%]',
    },
  }[size];

  return (
    <span
      className={cn(
        'inline-flex shrink-0 flex-col select-none leading-none',
        className
      )}
    >
      <span
        role="img"
        aria-label="Mai Đinh Skinlab Spa"
        style={{
          backgroundColor: 'var(--text-primary)',
          WebkitMaskImage: "url('/images/mai-dinh-script-mask.png')",
          maskImage: "url('/images/mai-dinh-script-mask.png')",
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'left center',
          maskPosition: 'left center',
        }}
        className={cn('block transition-colors duration-200', dimensions.scriptW, dimensions.scriptH)}
      />
      <span
        aria-hidden="true"
        className={cn(
          'whitespace-nowrap font-serif-display font-semibold text-[var(--accent-gold-text)] uppercase transition-colors duration-200',
          dimensions.subText
        )}
      >
        SKINLAB . SPA
      </span>
    </span>
  );
}
