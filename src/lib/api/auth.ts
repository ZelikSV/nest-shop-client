import { api } from './client';
import type { AuthTokens, User, RegisterDto, LoginDto } from '@/types';

export const authApi = {
  register:   (body: RegisterDto) => api.post<AuthTokens>('/v1/auth/register', body),
  login:      (body: LoginDto)    => api.post<AuthTokens>('/v1/auth/login', body),
  getProfile: ()                  => api.get<User>('/v1/auth/profile'),
};
