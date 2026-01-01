export type UserRole = 'super_admin' | 'admin' | 'hierarchy_user';

export type BusinessVertical = 'B2B' | 'B2C' | 'D2C';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role: UserRole;
  businessVertical?: BusinessVertical;
  hierarchyLevel?: number;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}
