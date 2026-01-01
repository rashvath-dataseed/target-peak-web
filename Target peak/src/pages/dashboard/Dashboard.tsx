import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AnalyticsCard, ActionCard } from '@/components/cards';
import { AdminTable } from '@/components/tables';
import { Admin } from '@/types/admin.types';
import { getAdmins } from '@/mocks/admins.mock';
import { ANALYTICS_DATA, formatCurrency, formatNumber } from '@/utils/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserCog, 
  BookOpen, 
  IndianRupee,
  UserPlus,
  Shield,
  Settings,
  Search,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SUPER_ADMIN_MODULES } from "@/constants/modules";
import ModuleCard from "@/components/cards/ModuleCard";

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch admins",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmins();
  }, [toast]);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditAdmin = (admin: Admin) => {
    toast({
      title: "Edit Admin",
      description: `Opening edit form for ${admin.name}`,
    });
  };

  const handleToggleStatus = (admin: Admin) => {
    const newStatus = admin.status === "active" ? "inactive" : "active";
    setAdmins((prev) =>
      prev.map((a) => (a.id === admin.id ? { ...a, status: newStatus } : a))
    );
    toast({
      title: "Status Updated",
      description: `${admin.name} is now ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your platform today.
          </p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Users"
          value={formatNumber(ANALYTICS_DATA.totalUsers)}
          icon={Users}
          variant="users"
          trend={{ value: 12.5, isPositive: true }}
        />
        <AnalyticsCard
          title="Total Admins"
          value={formatNumber(ANALYTICS_DATA.totalAdmins)}
          icon={UserCog}
          variant="admins"
          trend={{ value: 4.2, isPositive: true }}
        />
        <AnalyticsCard
          title="Active Courses"
          value={formatNumber(ANALYTICS_DATA.activeCourses)}
          icon={BookOpen}
          variant="courses"
          trend={{ value: 8.1, isPositive: true }}
        />
        <AnalyticsCard
          title="Revenue"
          value={formatCurrency(ANALYTICS_DATA.revenue)}
          icon={IndianRupee}
          variant="revenue"
          trend={{ value: 15.3, isPositive: true }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modules</CardTitle>
          <CardDescription>
            Manage master data, reports, and configurations
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div
            className="
        grid 
        gap-6 
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-6
      "
          >
            {SUPER_ADMIN_MODULES.map((module) => (
              <ModuleCard
                key={module.title}
                title={module.title}
                path={module.path}
                icon={module.icon}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Management Table */}
      {/* <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Admin Management</CardTitle>
              <CardDescription>Manage platform administrators</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search admins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:w-64"
                />
              </div>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Admin</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <AdminTable
            admins={filteredAdmins}
            onEdit={handleEditAdmin}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteAdmin}
            isLoading={isLoading}
          />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default SuperAdminDashboard;
