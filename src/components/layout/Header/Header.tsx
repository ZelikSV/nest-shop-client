'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button/Button';
import styles from './Header.module.scss';

export function Header() {
  const { user, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/products');
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/products" className={styles.logo}>
          NestShop
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/products"
            className={[styles.navLink, pathname.startsWith('/products') ? styles.active : ''].join(' ')}
          >
            Products
          </Link>

          {user && (
            <Link
              href="/orders"
              className={[styles.navLink, pathname.startsWith('/orders') ? styles.active : ''].join(' ')}
            >
              My Orders
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin/products"
              className={[styles.navLink, pathname.startsWith('/admin') ? styles.active : ''].join(' ')}
            >
              Admin
            </Link>
          )}

          <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
            🛒
            {totalCount > 0 && <span className={styles.cartCount}>{totalCount}</span>}
          </Link>

          {user ? (
            <div className={styles.userMenu}>
              <Link href="/profile" className={styles.profileLink} title="My Profile">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="avatar" className={styles.avatarThumb} />
                ) : (
                  <span className={styles.avatarInitials}>
                    {user.firstName?.[0] ?? ''}{user.lastName?.[0] ?? ''}
                  </span>
                )}
                <span>{user.firstName}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className={styles.nav}>
              <Link href="/login" className={styles.navLink}>Login</Link>
              <Button size="sm" onClick={() => router.push('/register')}>Register</Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
