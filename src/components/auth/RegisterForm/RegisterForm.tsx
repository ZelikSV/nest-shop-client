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
import styles from './RegisterForm.module.scss';

export function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: authApi.register,
    onSuccess: async (tokens) => {
      await login(tokens);
      router.replace('/products');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ firstName, lastName, age: parseInt(age, 10), email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <Input
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <Input
        label="Age"
        type="number"
        min="1"
        max="120"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
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
        minLength={6}
        autoComplete="new-password"
      />
      {error && <p className={styles.error}>{parseApiError(error)}</p>}
      <Button type="submit" isLoading={isPending} size="lg">
        Create Account
      </Button>
      <p className={styles.footer}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </form>
  );
}
