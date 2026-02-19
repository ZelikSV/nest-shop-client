import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersGql } from '@/lib/graphql/queries/orders';
import { ordersApi } from '@/lib/api/orders';
import type { CreateOrderDto, OrderFilterInput, PaginationInput } from '@/types';

export const ORDERS_KEY = ['orders'] as const;

export function useOrders(
  userId: string,
  filter?: OrderFilterInput,
  pagination?: PaginationInput,
) {
  return useQuery({
    queryKey: [...ORDERS_KEY, userId, filter, pagination],
    queryFn: () => ordersGql.getByUser(userId, filter, pagination),
    enabled: Boolean(userId),
    select: (data) => data.orders,
  });
}

// Uses REST endpoint — required for JWT auth + invoiceUrl
export function useOrder(id: string) {
  return useQuery({
    queryKey: [...ORDERS_KEY, id],
    queryFn: () => ordersApi.getById(id),
    enabled: Boolean(id),
  });
}

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateOrderDto) => ordersApi.create(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ORDERS_KEY }),
  });
}
