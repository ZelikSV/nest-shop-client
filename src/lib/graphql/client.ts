import { GraphQLClient } from 'graphql-request';
import { getToken } from '@/lib/utils/token';

const GQL_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'}/api/graphql`;

// Factory — called on each request so the token is always fresh
export const getGqlClient = () =>
  new GraphQLClient(GQL_URL, {
    headers: () => {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      return headers;
    },
  });
