'use client';
import { useAdminUsers, useDeleteUser, useUpdateUser } from '@/hooks/useAdminUsers';
import { useToast } from '@/components/ui/Toast/Toast';
import { Button } from '@/components/ui/Button/Button';
import { Spinner } from '@/components/ui/Spinner/Spinner';
import styles from './page.module.scss';

export default function AdminUsersPage() {
  const { data: users, isLoading } = useAdminUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();
  const { showToast } = useToast();

  const handleDelete = (id: string, email: string) => {
    if (!confirm(`Delete user "${email}"?`)) return;
    deleteUser(id, {
      onSuccess: () => showToast('User deleted', 'success'),
      onError: () => showToast('Failed to delete user', 'error'),
    });
  };

  const handleToggleRole = (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin';
    updateUser(
      { id, body: { role: newRole as 'admin' | 'customer' } },
      {
        onSuccess: () => showToast(`Role updated to ${newRole}`, 'success'),
        onError: () => showToast('Failed to update role', 'error'),
      },
    );
  };

  if (isLoading) return <Spinner centered />;

  return (
    <div>
      <h1 className={styles.heading}>Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(users ?? []).map((u) => (
            <tr key={u.id}>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>
                <span className={u.role === 'admin' ? styles.roleAdmin : styles.roleCustomer}>
                  {u.role}
                </span>
              </td>
              <td>{u.age}</td>
              <td className={styles.actions}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleRole(u.id, u.role)}
                >
                  Toggle Role
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u.id, u.email)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
