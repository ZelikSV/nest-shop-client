import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import styles from './page.module.scss';

export const metadata = { title: 'Sign In – NestShop' };

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
