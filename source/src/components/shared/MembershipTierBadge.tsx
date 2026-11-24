import React from 'react';
import { Award } from 'lucide-react';
import { TierCode } from '@/types';
import { TIER_VISUAL_META } from '@/lib/constants';
import { cn } from '@/lib/utils';

const TIER_NAMES: Record<TierCode, string> = {
  MEMBER: 'Thành viên',
  SILVER: 'Hạng Bạc',
  GOLD: 'Hạng Vàng',
  VIP: 'Kim Cương',
};

interface MembershipTierBadgeProps {
  tierCode: TierCode;
  size?: 'sm' | 'md';
  className?: string;
}

export default function MembershipTierBadge({
  tierCode,
  size = 'sm',
  className,
}: MembershipTierBadgeProps) {
  const visual = TIER_VISUAL_META[tierCode];

  return (
    <span
      style={{
        backgroundColor: visual.badgeBg,
        color: visual.badgeText,
        borderColor: visual.badgeBorder,
      }}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border font-semibold',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1 text-sm',
        className
      )}
    >
      <Award className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
      {TIER_NAMES[tierCode]}
    </span>
  );
}
