import { User, UserRole, LoginCredentials } from '@/types/auth.types';
import { mockApiCall, setToken, setUser, removeToken, getUser } from './api';

// Mock users for different roles
const mockUsers: Record<string, User> = {
  'super@targetpeak.in': {
    id: 'sa-001',
    name: 'Super Admin',
    email: 'super@targetpeak.in',
    role: 'super_admin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-31T00:00:00Z',
  },
  'admin@targetpeak.in': {
    id: 'ad-001',
    name: 'Admin User',
    email: 'admin@targetpeak.in',
    role: 'admin',
    businessVertical: 'B2B',
    hierarchyLevel: 1,
    status: 'active',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-12-31T00:00:00Z',
  },
  'user@targetpeak.in': {
    id: 'hu-001',
    name: 'Hierarchy User',
    email: 'user@targetpeak.in',
    role: 'hierarchy_user',
    businessVertical: 'B2C',
    hierarchyLevel: 3,
    status: 'active',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-12-31T00:00:00Z',
  },
};

export const login = async (credentials: LoginCredentials): Promise<User> => {

  await mockApiCall(null, 800);

  // For demo: any password works, just check email format
  const user = mockUsers[credentials.email];

  if (!user) {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: credentials.email
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email: credentials.email,
      role: credentials.role,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = `mock-jwt-token-${Date.now()}`;
    setToken(token);
    setUser(newUser);
    return newUser;
  }

  // Override role with selected role for demo
  const authenticatedUser = { ...user, role: credentials.role };
  const token = `mock-jwt-token-${Date.now()}`;
  setToken(token);
  setUser(authenticatedUser);
  
  return authenticatedUser;
};

export const logout = (): void => {
  removeToken();
};

export const getCurrentUser = (): User | null => {
  return getUser<User>();
};

export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    super_admin: 3,
    admin: 2,
    hierarchy_user: 1,
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
