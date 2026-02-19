import { api } from './client';
import type { Order, CreateOrderDto } from '@/types';

export const ordersApi = {
  create:  (body: CreateOrderDto) => api.post<Order>('/v1/orders', body),
  getById: (id: string)           => api.get<Order>(`/v1/orders/${id}`),
};
