import { useAuth } from './useAuth';
import { UserRole } from '@/types/auth.types';
import { hasPermission, canAccessRoute } from '@/utils/permissions';

export const usePermissions = () => {
  const { user } = useAuth();

  const checkPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    return hasPermission(user.role, requiredRole);
  };

  const checkRouteAccess = (path: string): boolean => {
    if (!user) return false;
    return canAccessRoute(user.role, path);
  };

  const isSuperAdmin = (): boolean => {
    return user?.role === 'super_admin';
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin' || user?.role === 'super_admin';
  };

  return {
    checkPermission,
    checkRouteAccess,
    isSuperAdmin,
    isAdmin,
    userRole: user?.role,
  };
};
