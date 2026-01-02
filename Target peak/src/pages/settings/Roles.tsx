import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Shield } from 'lucide-react';

const Roles: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Roles & Permissions</h2>
          <p className="text-muted-foreground">
            Define and manage user roles and their permissions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Placeholder */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg mb-2">Roles & Permissions</CardTitle>
          <CardDescription className="text-center max-w-sm">
            This section will allow you to create custom roles and assign specific permissions to each role.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;
