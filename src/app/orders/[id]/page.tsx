'use client';
import { use, useRef, useState } from 'react';
import { useOrder, ORDERS_KEY } from '@/hooks/useOrders';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/Badge/Badge';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { formatPrice } from '@/lib/utils/formatPrice';
import styles from './page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export default function OrderPage({ params }: Props) {
  const { id } = use(params);
  const { data: order, isLoading, error } = useOrder(id);
  const { upload, uploading, error: uploadError } = useFileUpload();
  const queryClient = useQueryClient();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoading) return <Spinner centered />;
  if (error || !order) return <p className={styles.error}>Order not found.</p>;

  const handleInvoiceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadSuccess(false);
    const ok = await upload(order.id, 'order', file);
    if (ok) {
      await queryClient.invalidateQueries({ queryKey: [...ORDERS_KEY, id] });
      setUploadSuccess(true);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Order <span className={styles.id}>#{order.id.slice(0, 8)}</span></h1>
        <Badge status={order.status} />
      </div>

      <div className={styles.meta}>
        <div>
          <span className={styles.label}>Created</span>
          <span>{new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <div>
          <span className={styles.label}>Total</span>
          <span className={styles.total}>{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      <div className={styles.items}>
        <h2>Items</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i}>
                <td className={styles.mono}>{item.productId}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(item.price)}</td>
                <td>{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.invoice}>
        <h2>Invoice</h2>
        {order.invoiceUrl ? (
          <div className={styles.invoiceRow}>
            <a
              href={order.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.invoiceLink}
            >
              📄 View invoice
            </a>
            <label className={styles.uploadBtn}>
              {uploading ? 'Uploading…' : 'Replace'}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                onChange={handleInvoiceChange}
                disabled={uploading}
                hidden
              />
            </label>
          </div>
        ) : (
          <div className={styles.invoiceEmpty}>
            <p className={styles.hint}>No invoice attached yet.</p>
            <label className={styles.uploadBtn}>
              {uploading ? 'Uploading…' : 'Upload invoice'}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                onChange={handleInvoiceChange}
                disabled={uploading}
                hidden
              />
            </label>
          </div>
        )}
        {uploadError && <p className={styles.uploadError}>{uploadError}</p>}
        {uploadSuccess && <p className={styles.uploadSuccess}>Invoice uploaded!</p>}
      </div>
    </div>
  );
}
