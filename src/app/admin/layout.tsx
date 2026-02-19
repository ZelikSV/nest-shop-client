'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/ui/Spinner/Spinner';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) router.replace('/login');
  }, [user, isLoading, isAdmin, router]);

  if (isLoading || !isAdmin) return <Spinner centered />;

  return <>{children}</>;
}
