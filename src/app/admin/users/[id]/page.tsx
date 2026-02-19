'use client';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { useUpdateUser } from '@/hooks/useAdminUsers';
import { useToast } from '@/components/ui/Toast/Toast';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import { parseApiError } from '@/lib/utils/parseApiError';
import type { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import styles from './page.module.scss';

interface Props {
  params: Promise<{ id: string }>;
}

export default function AdminEditUserPage({ params }: Props) {
  const { id } = use(params);
  const { data: user, isLoading } = useQuery({
    queryKey: ['admin', 'users', id],
    queryFn: () => api.get<User>(`/users/${id}`),
    enabled: Boolean(id),
  });

  const { mutateAsync: updateUser } = useUpdateUser();
  const { showToast } = useToast();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);

  if (user && !initialized) {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(String(user.age));
    setInitialized(true);
  }

  if (isLoading) return <Spinner centered />;
  if (!user) return <p className={styles.error}>User not found.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      await updateUser({ id, body: { firstName, lastName, age: parseInt(age, 10) } });
      showToast('User updated', 'success');
      router.push('/admin/users');
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>Edit User — {user.email}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <Input label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" isLoading={isSaving}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
