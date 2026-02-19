import { formatPrice } from '@/lib/utils/formatPrice';
import styles from './CartSummary.module.scss';

interface CartSummaryProps {
  totalCount: number;
  totalPrice: number;
}

export function CartSummary({ totalCount, totalPrice }: CartSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span>Items</span>
        <span>{totalCount}</span>
      </div>
      <div className={styles.total}>
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
}
