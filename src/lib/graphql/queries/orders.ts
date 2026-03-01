import { gql } from 'graphql-request';
import type { Order, OrdersFilterInput, OrdersPaginationInput, GetOrdersQueryResult } from '@/types';
import { getGqlClient } from '../client';

const GET_ORDERS = gql`
  query GetOrders($userId: ID!, $filter: OrdersFilterInput, $pagination: OrdersPaginationInput) {
    orders(userId: $userId, filter: $filter, pagination: $pagination) {
      id
      status
      totalPrice
      createdAt
      items {
        productId
        quantity
        price
      }
    }
  }
`;

const GET_ORDER_BY_ID = gql`
  query GetOrder($id: String!) {
    order(id: $id) {
      id
      status
      totalPrice
      idempotencyKey
      createdAt
      items {
        productId
        quantity
        price
      }
    }
  }
`;

export const ordersGql = {
  getByUser: (userId: string, filter?: OrdersFilterInput, pagination?: OrdersPaginationInput) =>
    getGqlClient().request<GetOrdersQueryResult>(GET_ORDERS, { userId, filter, pagination }),

  getById: (id: string) =>
    getGqlClient().request<{ order: Order }>(GET_ORDER_BY_ID, { id }),
};
