'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import styles from './page.module.scss';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function ProfilePage() {
  const { user, isLoading, refreshUser } = useAuth();
  const router = useRouter();
  const { upload, uploading, error } = useFileUpload();
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) return <Spinner centered />;
  if (!user) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Only JPEG, PNG, WebP images are allowed');
      return;
    }

    setSuccess(false);
    const ok = await upload(user.id, 'user', file);
    if (ok) {
      await refreshUser();
      setSuccess(true);
    }
    // reset input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={styles.page}>
      <h1>My Profile</h1>

      <div className={styles.card}>
        <div className={styles.avatarSection}>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className={styles.avatar} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {user.firstName?.[0] ?? ''}{user.lastName?.[0] ?? ''}
            </div>
          )}

          <div className={styles.avatarActions}>
            <label className={styles.uploadBtn}>
              {uploading ? 'Uploading…' : 'Upload avatar'}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={uploading}
                hidden
              />
            </label>
            <p className={styles.hint}>JPEG, PNG or WebP · max 5 MB</p>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.successMsg}>Avatar updated!</p>}
          </div>
        </div>

        <div className={styles.info}>
          <Row label="Name" value={`${user.firstName} ${user.lastName}`} />
          <Row label="Email" value={user.email} />
          <Row label="Age" value={String(user.age)} />
          <Row label="Role" value={user.role} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
