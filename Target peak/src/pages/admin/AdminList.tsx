import React, { useState, useEffect } from 'react';
import { Admin } from '@/types/admin.types';
import { getAdmins } from '@/mocks/admins.mock';
import { AdminTable } from '@/components/tables';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Filter } from 'lucide-react';

const AdminList: React.FC = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch admins',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, [toast]);

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = 
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVertical = verticalFilter === 'all' || admin.businessVertical === verticalFilter;
    const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
    
    return matchesSearch && matchesVertical && matchesStatus;
  });

  const handleEditAdmin = (admin: Admin) => {
    toast({
      title: 'Edit Admin',
      description: `Opening edit form for ${admin.name}`,
    });
  };

  const handleToggleStatus = (admin: Admin) => {
    const newStatus = admin.status === 'active' ? 'inactive' : 'active';
    setAdmins(prev => 
      prev.map(a => a.id === admin.id ? { ...a, status: newStatus } : a)
    );
    toast({
      title: 'Status Updated',
      description: `${admin.name} is now ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Manage Admins</h2>
          <p className="text-muted-foreground">
            Create, update, and manage administrator accounts
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Admin
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={verticalFilter} onValueChange={setVerticalFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Business Vertical" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verticals</SelectItem>
                <SelectItem value="B2B">B2B (Sanstha)</SelectItem>
                <SelectItem value="B2C">B2C (Organization)</SelectItem>
                <SelectItem value="D2C">D2C (Direct)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setVerticalFilter('all');
              setStatusFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admin Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            Administrators ({filteredAdmins.length})
          </CardTitle>
          <CardDescription>
            Click on actions to edit or manage admin status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <AdminTable
            admins={filteredAdmins}
            onEdit={handleEditAdmin}
            onToggleStatus={handleToggleStatus}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminList;
