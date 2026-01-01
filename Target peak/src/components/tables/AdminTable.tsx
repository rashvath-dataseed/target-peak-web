import React from 'react';
import { Admin } from '@/types/admin.types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Power, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminTableProps {
  admins: Admin[];
  onEdit?: (admin: Admin) => void;
  onToggleStatus?: (admin: Admin) => void;
  onDelete?: (admin: Admin) => void;
  isLoading?: boolean;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  admins,
  onEdit,
  onToggleStatus,
  onDelete,
  isLoading,
}) => {
  const getVerticalBadgeClass = (vertical: string) => {
    switch (vertical) {
      case 'B2B':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'B2C':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'D2C':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Business Vertical</TableHead>
            <TableHead className="font-semibold">Hierarchy Level</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="w-[80px] font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id} className="table-row-hover">
              <TableCell className="font-medium">{admin.name}</TableCell>
              <TableCell className="text-muted-foreground">{admin.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {admin.role.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="secondary" 
                  className={cn('font-medium', getVerticalBadgeClass(admin.businessVertical))}
                >
                  {admin.businessVertical}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  L{admin.hierarchyLevel}
                </span>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="secondary"
                  className={cn(
                    'status-badge',
                    admin.status === 'active' ? 'status-active' : 'status-inactive'
                  )}
                >
                  {admin.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit?.(admin)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleStatus?.(admin)}>
                      <Power className="mr-2 h-4 w-4" />
                      {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete?.(admin)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
