export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  details: string;
  ipAddress: string;
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: 'log1',
    timestamp: '2024-12-31T09:30:00Z',
    actor: 'Super Admin',
    actorRole: 'super_admin',
    action: 'CREATE_ADMIN',
    target: 'Kavitha Nair',
    details: 'Created new admin with B2B vertical access',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log2',
    timestamp: '2024-12-31T08:45:00Z',
    actor: 'Rajesh Kumar',
    actorRole: 'admin',
    action: 'UPDATE_PERMISSION',
    target: 'Vikram Singh',
    details: 'Modified report module access',
    ipAddress: '192.168.1.101',
  },
  {
    id: 'log3',
    timestamp: '2024-12-30T16:20:00Z',
    actor: 'Super Admin',
    actorRole: 'super_admin',
    action: 'DEACTIVATE_ADMIN',
    target: 'Sneha Reddy',
    details: 'Deactivated admin account',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log4',
    timestamp: '2024-12-30T14:15:00Z',
    actor: 'Priya Sharma',
    actorRole: 'admin',
    action: 'CREATE_COURSE',
    target: 'Advanced Mathematics',
    details: 'Created new course for B2C students',
    ipAddress: '192.168.1.102',
  },
  {
    id: 'log5',
    timestamp: '2024-12-29T11:00:00Z',
    actor: 'Super Admin',
    actorRole: 'super_admin',
    action: 'ADD_HIERARCHY_LEVEL',
    target: 'Faculty Lead',
    details: 'Added Level-5 hierarchy',
    ipAddress: '192.168.1.100',
  },
];

export const getAuditLogs = (): Promise<AuditLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAuditLogs), 500);
  });
};
