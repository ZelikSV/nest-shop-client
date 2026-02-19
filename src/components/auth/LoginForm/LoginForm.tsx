'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { parseApiError } from '@/lib/utils/parseApiError';
import styles from './LoginForm.module.scss';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (tokens) => {
      await login(tokens);
      router.replace('/products');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      {error && <p className={styles.error}>{parseApiError(error)}</p>}
      <Button type="submit" isLoading={isPending} size="lg">
        Sign In
      </Button>
      <p className={styles.footer}>
        Don&apos;t have an account? <Link href="/register">Register</Link>
      </p>
    </form>
  );
}
