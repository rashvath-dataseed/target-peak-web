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
import Cookies from "js-cookie";

const TOKEN_KEY = "target_peak_token";
const USER_KEY = "target_peak_profile";

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

export const getToken = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const setUser = (user: object): void => {
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 });
};

export const getUser = <T>(): T | null => {
  const user = Cookies.get(USER_KEY);
  return user ? JSON.parse(user) : null;
};
