import React from 'react';
import { CheckCircle2, Clock, XCircle, CheckSquare } from 'lucide-react';

const statusConfig = {
  Confirmed: {
    bg: 'bg-teal-50 text-teal-800 border-teal-200',
    dot: 'bg-teal-600',
    icon: CheckCircle2,
    label: 'Confirmed',
  },
  Pending: {
    bg: 'bg-amber-50 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    icon: Clock,
    label: 'Pending',
  },
  Completed: {
    bg: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: 'bg-blue-600',
    icon: CheckSquare,
    label: 'Completed',
  },
  Cancelled: {
    bg: 'bg-rose-50 text-rose-800 border-rose-200',
    dot: 'bg-rose-500',
    icon: XCircle,
    label: 'Cancelled',
  },
};

export const StatusBadge = ({ status = 'Confirmed' }) => {
  const config = statusConfig[status] || statusConfig.Confirmed;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};

