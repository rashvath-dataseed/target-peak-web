import { BusinessVertical, UserRole } from './auth.types';

export interface Admin {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  businessVertical: BusinessVertical;
  hierarchyLevel: number;
  status: 'active' | 'inactive';
  modules: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CreateAdminPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
  businessVertical: BusinessVertical;
  hierarchyLevel: number;
  modules: string[];
}

export interface UpdateAdminPayload {
  id: string;
  name?: string;
  email?: string;
  mobile?: string;
  businessVertical?: BusinessVertical;
  hierarchyLevel?: number;
  modules?: string[];
  status?: 'active' | 'inactive';
}
