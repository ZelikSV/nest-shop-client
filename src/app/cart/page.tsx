'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { usePlaceOrder } from '@/hooks/useOrders';
import { useToast } from '@/components/ui/Toast/Toast';
import { CartItem } from '@/components/cart/CartItem/CartItem';
import { CartSummary } from '@/components/cart/CartSummary/CartSummary';
import { Button } from '@/components/ui/Button/Button';
import { parseApiError } from '@/lib/utils/parseApiError';
import styles from './page.module.scss';

export default function CartPage() {
  const { items, removeItem, updateQty, clear, totalPrice, totalCount } = useCart();
  const { user } = useAuth();
  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const { showToast } = useToast();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    placeOrder(
      {
        userId: user.id,
        idempotencyKey: crypto.randomUUID(),
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      },
      {
        onSuccess: () => {
          clear();
          showToast('Order placed successfully!', 'success');
          router.push('/orders');
        },
        onError: (err) => {
          showToast(parseApiError(err), 'error');
        },
      },
    );
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Your Cart</h1>
        <p>No items in cart. <a href="/products">Browse products</a></p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Your Cart</h1>
      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              onUpdateQty={updateQty}
              onRemove={removeItem}
            />
          ))}
        </div>
        <div className={styles.sidebar}>
          <CartSummary totalCount={totalCount} totalPrice={totalPrice} />
          <Button
            size="lg"
            onClick={handleCheckout}
            isLoading={isPending}
            style={{ width: '100%', marginTop: '16px' }}
          >
            {user ? 'Place Order' : 'Sign In to Checkout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
