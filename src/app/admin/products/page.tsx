'use client';
import { useState } from 'react';
import { useProducts, useDeleteProduct, useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { useToast } from '@/components/ui/Toast/Toast';
import { ProductForm } from '@/components/products/ProductForm/ProductForm';
import { Modal } from '@/components/ui/Modal/Modal';
import { Button } from '@/components/ui/Button/Button';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { Product, CreateProductDto } from '@/types';
import styles from './page.module.scss';

export default function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { showToast } = useToast();

  const [createOpen, setCreateOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"?`)) return;
    deleteProduct(id, {
      onSuccess: () => showToast('Product deleted', 'success'),
      onError: () => showToast('Failed to delete product', 'error'),
    });
  };

  const handleCreate = async (data: CreateProductDto) => {
    await createProduct(data);
    showToast('Product created', 'success');
    setCreateOpen(false);
  };

  const handleUpdate = async (data: CreateProductDto) => {
    if (!editProduct) return;
    await updateProduct({ id: editProduct.id, body: data });
    showToast('Product updated', 'success');
    setEditProduct(null);
  };

  if (isLoading) return <Spinner centered />;

  return (
    <div>
      <div className={styles.header}>
        <h1>Products</h1>
        <Button onClick={() => setCreateOpen(true)}>+ New Product</Button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(products ?? []).map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{formatPrice(p.price)}</td>
              <td>{p.stock}</td>
              <td>{p.isActive ? '✓' : '✗'}</td>
              <td className={styles.actions}>
                <Button variant="outline" size="sm" onClick={() => setEditProduct(p)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id, p.name)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="New Product">
        <ProductForm onSubmit={handleCreate} onCancel={() => setCreateOpen(false)} submitLabel="Create" />
      </Modal>

      <Modal isOpen={!!editProduct} onClose={() => setEditProduct(null)} title="Edit Product">
        {editProduct && (
          <ProductForm
            initial={editProduct}
            onSubmit={handleUpdate}
            onCancel={() => setEditProduct(null)}
            submitLabel="Update"
          />
        )}
      </Modal>
    </div>
  );
}
