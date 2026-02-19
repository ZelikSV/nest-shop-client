'use client';
import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/context/AuthContext';
import { OrderList } from '@/components/orders/OrderList/OrderList';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import type { OrderStatus, OrderFilterInput } from '@/types';
import styles from './page.module.scss';

const STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function OrdersPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');

  const filter: OrderFilterInput | undefined = statusFilter ? { status: statusFilter } : undefined;

  const { data: orders, isLoading, error } = useOrders(user?.id ?? '', filter);

  return (
    <div>
      <div className={styles.header}>
        <h1>My Orders</h1>
        <select
          className={styles.filter}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | '')}
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {isLoading && <Spinner centered />}
      {error && <p className={styles.error}>Failed to load orders.</p>}
      {!isLoading && !error && <OrderList orders={orders ?? []} />}
    </div>
  );
}
