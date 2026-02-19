import Link from 'next/link';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils/formatPrice';
import { Button } from '@/components/ui/Button/Button';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const inStock = product.stock > 0;

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.id}`}>
        <h3 className={styles.name}>{product.name}</h3>
      </Link>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.footer}>
        <span className={styles.price}>{formatPrice(product.price)}</span>
        {inStock ? (
          <span className={styles.stock}>In stock: {product.stock}</span>
        ) : (
          <span className={styles.outOfStock}>Out of stock</span>
        )}
      </div>
      {onAddToCart && (
        <Button
          size="sm"
          onClick={() => onAddToCart(product)}
          disabled={!inStock}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}
