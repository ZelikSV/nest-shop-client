import type { OrderStatus } from '@/types';
import { Badge } from '@/components/ui/Badge/Badge';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return <Badge status={status} />;
}
