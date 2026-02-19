'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useProduct, useUpdateProduct } from '@/hooks/useProducts';
import { useToast } from '@/components/ui/Toast/Toast';
import { ProductForm } from '@/components/products/ProductForm/ProductForm';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import type { CreateProductDto } from '@/types';
import styles from './page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export default function AdminEditProductPage({ params }: Props) {
  const { id } = use(params);
  const { data: product, isLoading } = useProduct(id);
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { showToast } = useToast();
  const router = useRouter();

  if (isLoading) return <Spinner centered />;
  if (!product) return <p className={styles.error}>Product not found.</p>;

  const handleSubmit = async (data: CreateProductDto) => {
    await updateProduct({ id, body: data });
    showToast('Product updated', 'success');
    router.push('/admin/products');
  };

  return (
    <div>
      <h1 className={styles.heading}>Edit Product</h1>
      <ProductForm initial={product} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
}
