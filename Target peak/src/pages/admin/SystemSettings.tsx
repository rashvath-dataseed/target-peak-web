import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Save, Globe, Bell, Shield, Mail } from 'lucide-react';

const SystemSettings: React.FC = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'System settings have been updated successfully.',
    });
  };

  return (
    // <div className="space-y-6">
    //   {/* Header */}
    //   <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    //     <div>
    //       <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
    //       <p className="text-muted-foreground">
    //         Configure global platform settings
    //       </p>
    //     </div>
    //     <Button onClick={handleSave} className="gap-2">
    //       <Save className="h-4 w-4" />
    //       Save Changes
    //     </Button>
    //   </div>

    //   {/* Settings Tabs */}
    //   <Tabs defaultValue="general">
    //     <TabsList>
    //       <TabsTrigger value="general" className="gap-2">
    //         <Globe className="h-4 w-4" />
    //         General
    //       </TabsTrigger>
    //       <TabsTrigger value="notifications" className="gap-2">
    //         <Bell className="h-4 w-4" />
    //         Notifications
    //       </TabsTrigger>
    //       <TabsTrigger value="security" className="gap-2">
    //         <Shield className="h-4 w-4" />
    //         Security
    //       </TabsTrigger>
    //       <TabsTrigger value="email" className="gap-2">
    //         <Mail className="h-4 w-4" />
    //         Email
    //       </TabsTrigger>
    //     </TabsList>

    //     <TabsContent value="general" className="mt-6 space-y-6">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Platform Settings</CardTitle>
    //           <CardDescription>Basic platform configuration</CardDescription>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div className="grid gap-4 sm:grid-cols-2">
    //             <div className="space-y-2">
    //               <Label htmlFor="platform-name">Platform Name</Label>
    //               <Input id="platform-name" defaultValue="Target Peak" />
    //             </div>
    //             <div className="space-y-2">
    //               <Label htmlFor="support-email">Support Email</Label>
    //               <Input id="support-email" defaultValue="support@targetpeak.in" />
    //             </div>
    //           </div>
    //           <div className="flex items-center justify-between rounded-lg border p-4">
    //             <div>
    //               <p className="font-medium">Maintenance Mode</p>
    //               <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
    //             </div>
    //             <Switch />
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </TabsContent>

    //     <TabsContent value="notifications" className="mt-6 space-y-6">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Notification Preferences</CardTitle>
    //           <CardDescription>Configure system notifications</CardDescription>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           {[
    //             { label: 'New Admin Registration', description: 'Get notified when a new admin is created' },
    //             { label: 'Permission Changes', description: 'Alert on access control modifications' },
    //             { label: 'System Alerts', description: 'Critical system notifications' },
    //           ].map((item, index) => (
    //             <div key={index} className="flex items-center justify-between rounded-lg border p-4">
    //               <div>
    //                 <p className="font-medium">{item.label}</p>
    //                 <p className="text-sm text-muted-foreground">{item.description}</p>
    //               </div>
    //               <Switch defaultChecked />
    //             </div>
    //           ))}
    //         </CardContent>
    //       </Card>
    //     </TabsContent>

    //     <TabsContent value="security" className="mt-6 space-y-6">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Security Settings</CardTitle>
    //           <CardDescription>Authentication and security options</CardDescription>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div className="flex items-center justify-between rounded-lg border p-4">
    //             <div>
    //               <p className="font-medium">Two-Factor Authentication</p>
    //               <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
    //             </div>
    //             <Switch defaultChecked />
    //           </div>
    //           <div className="flex items-center justify-between rounded-lg border p-4">
    //             <div>
    //               <p className="font-medium">Session Timeout</p>
    //               <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes of inactivity</p>
    //             </div>
    //             <Switch defaultChecked />
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </TabsContent>

    //     <TabsContent value="email" className="mt-6 space-y-6">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Email Configuration</CardTitle>
    //           <CardDescription>SMTP and email template settings</CardDescription>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div className="grid gap-4 sm:grid-cols-2">
    //             <div className="space-y-2">
    //               <Label htmlFor="smtp-host">SMTP Host</Label>
    //               <Input id="smtp-host" defaultValue="smtp.targetpeak.in" />
    //             </div>
    //             <div className="space-y-2">
    //               <Label htmlFor="smtp-port">SMTP Port</Label>
    //               <Input id="smtp-port" defaultValue="587" />
    //             </div>
    //             <div className="space-y-2">
    //               <Label htmlFor="from-email">From Email</Label>
    //               <Input id="from-email" defaultValue="noreply@targetpeak.in" />
    //             </div>
    //             <div className="space-y-2">
    //               <Label htmlFor="from-name">From Name</Label>
    //               <Input id="from-name" defaultValue="Target Peak" />
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </TabsContent>
    //   </Tabs>
    // </div>
    <div>
      {/* dummy style */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="font-medium">Maintenance Mode</p>
          <p className="text-sm text-muted-foreground">
            Temporarily disable public access
          </p>
        </div>
        <Switch />
      </div>
    </div>
  );
};

export default SystemSettings;
