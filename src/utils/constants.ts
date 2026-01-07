export const BUSINESS_VERTICALS = [
  { value: 'B2B', label: 'B2B (Sanstha)' },
  { value: 'B2C', label: 'B2C (Organization)' },
  { value: 'D2C', label: 'D2C (Direct to Consumer)' },
] as const;

export const USER_ROLES = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'hierarchy_user', label: 'Hierarchy User' },
] as const;

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;

export const ANALYTICS_DATA = {
  totalUsers: 0,
  totalAdmins: 0,
  activeCourses: 0,
  revenue: 0,
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
