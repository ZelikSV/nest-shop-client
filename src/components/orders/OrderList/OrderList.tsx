import type { Order } from '@/types';
import { OrderCard } from '../OrderCard/OrderCard';
import styles from './OrderList.module.scss';

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <p className={styles.empty}>No orders yet.</p>;
  }

  return (
    <div className={styles.list}>
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} />
      ))}
    </div>
  );
}
