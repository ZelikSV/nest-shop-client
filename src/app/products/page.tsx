'use client';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { ProductGrid } from '@/components/products/ProductGrid/ProductGrid';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { useToast } from '@/components/ui/Toast/Toast';
import type { Product } from '@/types';
import styles from './page.module.scss';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    showToast(`${product.name} added to cart`, 'success');
  };

  if (isLoading) return <Spinner centered />;
  if (error) return <p className={styles.error}>Failed to load products.</p>;

  return (
    <div>
      <h1 className={styles.heading}>Products</h1>
      <ProductGrid products={products ?? []} onAddToCart={handleAddToCart} />
    </div>
  );
}
