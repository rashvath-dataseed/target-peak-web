import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users as UsersIcon } from 'lucide-react';

const Users: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">All Users</h2>
          <p className="text-muted-foreground">
            View and manage all platform users
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users by name, email..."
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Placeholder */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <UsersIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg mb-2">User Management</CardTitle>
          <CardDescription className="text-center max-w-sm">
            This section will display all registered users with filtering, sorting, and management capabilities.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
