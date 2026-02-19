import Link from 'next/link';
import type { Order } from '@/types';
import { Badge } from '@/components/ui/Badge/Badge';
import { formatPrice } from '@/lib/utils/formatPrice';
import styles from './OrderCard.module.scss';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>#{order.id.slice(0, 8)}</span>
        <Badge status={order.status} />
      </div>
      <div className={styles.meta}>
        <span className={styles.total}>{formatPrice(order.totalPrice)}</span>
        <span className={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</span>
      </div>
      <Link href={`/orders/${order.id}`} className={styles.link}>
        View details →
      </Link>
    </div>
  );
}
