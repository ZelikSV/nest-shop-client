export type UserRole = 'admin' | 'customer';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  role: UserRole;
  avatarFileId?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: number;
  idempotencyKey: string;
  invoiceFileId?: string | null;
  invoiceUrl?: string | null;
  items: OrderItem[];
  createdAt: string;
}

export interface FilePresignDto {
  entityId: string;
  entityType: 'user' | 'order';
  contentType: string;
}

export interface FilePresignResponse {
  fileId: string;
  key: string;
  uploadUrl: string;
  contentType: string;
}

export interface AuthTokens {
  accessToken: string;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  timestamp: string;
  path: string;
}

// DTOs
export interface RegisterDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface CreateOrderDto {
  userId: string;
  idempotencyKey: string;
  items: { productId: string; quantity: number }[];
}

// GraphQL types
export interface OrderFilterInput {
  status?: OrderStatus;
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface GetOrdersQueryResult {
  orders: Order[];
}
