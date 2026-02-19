import { RegisterForm } from '@/components/auth/RegisterForm/RegisterForm';
import styles from './page.module.scss';

export const metadata = { title: 'Register – NestShop' };

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
