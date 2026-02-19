'use client';
import { useState } from 'react';
import type { Product, CreateProductDto } from '@/types';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { parseApiError } from '@/lib/utils/parseApiError';
import styles from './ProductForm.module.scss';

interface ProductFormProps {
  initial?: Partial<Product>;
  onSubmit: (data: CreateProductDto) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function ProductForm({ initial, onSubmit, onCancel, submitLabel = 'Save' }: ProductFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [price, setPrice] = useState(String(initial?.price ?? ''));
  const [stock, setStock] = useState(String(initial?.stock ?? ''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await onSubmit({
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      });
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <Input label="Price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <Input label="Stock" type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        {onCancel && <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" isLoading={isLoading}>{submitLabel}</Button>
      </div>
    </form>
  );
}
