import type { OrderStatus } from '@/types';
import styles from './Badge.module.scss';

interface BadgeProps {
  status: OrderStatus;
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING:   'Pending',
  CONFIRMED: 'Confirmed',
  SHIPPED:   'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  PROCESSED: 'Processed',
};

export function Badge({ status }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[status]].join(' ')}>
      {STATUS_LABELS[status]}
    </span>
  );
}
