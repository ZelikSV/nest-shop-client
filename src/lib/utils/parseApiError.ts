import type { ApiError } from '@/types';

export function parseApiError(error: unknown): string {
  const apiError = error as ApiError;
  if (!apiError?.message) return 'Unknown error';
  return Array.isArray(apiError.message)
    ? apiError.message.join(', ')
    : apiError.message;
}
