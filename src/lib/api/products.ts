import { api } from './client';
import type { Product, CreateProductDto } from '@/types';

export const productsApi = {
  getAll:  ()                                           => api.get<Product[]>('/v1/products'),
  getById: (id: string)                                 => api.get<Product>(`/v1/products/${id}`),
  create:  (body: CreateProductDto)                     => api.post<Product>('/v1/products', body),
  update:  (id: string, body: Partial<CreateProductDto>) => api.put<Product>(`/v1/products/${id}`, body),
  delete:  (id: string)                                 => api.delete<void>(`/v1/products/${id}`),
};
