const KEY = 'nest_shop_token';

export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem(KEY) : null;

export const setToken = (token: string) => localStorage.setItem(KEY, token);

export const removeToken = () => localStorage.removeItem(KEY);
