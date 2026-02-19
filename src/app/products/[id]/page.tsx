'use client';
import { use } from 'react';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/Toast/Toast';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { Button } from '@/components/ui/Button/Button';
import { formatPrice } from '@/lib/utils/formatPrice';
import styles from './page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProduct(id);
  const { addItem } = useCart();
  const { showToast } = useToast();

  if (isLoading) return <Spinner centered />;
  if (error || !product) return <p className={styles.error}>Product not found.</p>;

  const handleAddToCart = () => {
    addItem(product);
    showToast(`${product.name} added to cart`, 'success');
  };

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.meta}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
            {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
          </span>
        </div>
        <Button onClick={handleAddToCart} disabled={product.stock === 0} size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
