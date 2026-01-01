// Simulated API utility for mock backend calls

const API_DELAY = 600; // Simulate network delay

export const simulateDelay = (ms: number = API_DELAY): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const mockApiCall = async <T>(data: T, delay: number = API_DELAY): Promise<T> => {
  await simulateDelay(delay);
  return data;
};

export const mockApiError = async (message: string, delay: number = API_DELAY): Promise<never> => {
  await simulateDelay(delay);
  throw new Error(message);
};

// Token management (simulated)
const TOKEN_KEY = 'target_peak_token';
const USER_KEY = 'target_peak_user';

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const setUser = (user: object): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = <T>(): T | null => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
