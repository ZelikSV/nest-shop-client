import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatPrice';
import styles from './CartItem.module.scss';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQty: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItem({ product, quantity, onUpdateQty, onRemove }: CartItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>{formatPrice(product.price)} each</div>
      </div>

      <div className={styles.qty}>
        <button
          className={styles.qtyBtn}
          onClick={() => onUpdateQty(product.id, quantity - 1)}
          aria-label="Decrease"
        >
          −
        </button>
        <span className={styles.qtyValue}>{quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => onUpdateQty(product.id, quantity + 1)}
          aria-label="Increase"
        >
          +
        </button>
      </div>

      <span className={styles.total}>{formatPrice(product.price * quantity)}</span>

      <button className={styles.removeBtn} onClick={() => onRemove(product.id)}>
        Remove
      </button>
    </div>
  );
}
