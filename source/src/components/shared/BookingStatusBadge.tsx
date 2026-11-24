import React from 'react';
import { AppointmentStatus } from '@/types';
import { APPOINTMENT_STATUS_META } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface BookingStatusBadgeProps {
  status: AppointmentStatus;
  compact?: boolean;
  className?: string;
}

export default function BookingStatusBadge({
  status,
  compact = false,
  className,
}: BookingStatusBadgeProps) {
  const meta = APPOINTMENT_STATUS_META[status];

  return (
    <span
      style={{
        backgroundColor: meta.bgVar,
        color: meta.textVar,
      }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        className
      )}
    >
      <span
        style={{ backgroundColor: meta.textVar }}
        className="h-1.5 w-1.5 rounded-full shrink-0"
        aria-hidden="true"
      />
      {compact ? meta.shortLabel : meta.label}
    </span>
  );
}
