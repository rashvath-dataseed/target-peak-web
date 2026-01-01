import React, { useState, useEffect } from 'react';
import { Module } from '@/types/hierarchy.types';
import { getModules } from '@/mocks/hierarchy.mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Users, 
  BookOpen, 
  BarChart3, 
  FileText, 
  Settings,
  ChevronDown,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Users,
  BookOpen,
  BarChart3,
  FileText,
  Settings,
};

const AccessControl: React.FC = () => {
  const { toast } = useToast();
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVertical, setSelectedVertical] = useState('B2B');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await getModules();
        setModules(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch modules',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchModules();
  }, [toast]);

  const toggleExpand = (id: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSave = () => {
    toast({
      title: 'Permissions Saved',
      description: 'Access control settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Access Control</h2>
          <p className="text-muted-foreground">
            Manage module permissions for different business verticals
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Vertical Tabs */}
      <Tabs value={selectedVertical} onValueChange={setSelectedVertical}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="B2B" className="gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">B2B</Badge>
            Sanstha
          </TabsTrigger>
          <TabsTrigger value="B2C" className="gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">B2C</Badge>
            Organization
          </TabsTrigger>
          <TabsTrigger value="D2C" className="gap-2">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">D2C</Badge>
            Direct
          </TabsTrigger>
        </TabsList>

        {['B2B', 'B2C', 'D2C'].map(vertical => (
          <TabsContent key={vertical} value={vertical} className="mt-6 space-y-4">
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : (
              modules.map(module => {
                const Icon = iconMap[module.icon] || Shield;
                const isExpanded = expandedModules.has(module.id);

                return (
                  <Card key={module.id} className="overflow-hidden">
                    <div
                      className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/30"
                      onClick={() => toggleExpand(module.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{module.name}</h3>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch id={`${module.id}-full`} defaultChecked />
                          <Label htmlFor={`${module.id}-full`} className="text-sm">Full Access</Label>
                        </div>
                        <ChevronDown className={cn(
                          'h-5 w-5 text-muted-foreground transition-transform',
                          isExpanded && 'rotate-180'
                        )} />
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <CardContent className="border-t bg-muted/20 pt-4">
                        <div className="space-y-3">
                          <p className="text-xs font-medium uppercase text-muted-foreground">
                            Sub-module Permissions
                          </p>
                          {module.subModules.map(sub => (
                            <div 
                              key={sub.id} 
                              className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                            >
                              <div>
                                <p className="font-medium text-foreground">{sub.name}</p>
                                <p className="text-xs text-muted-foreground">{sub.description}</p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Switch id={`${sub.id}-read`} defaultChecked />
                                  <Label htmlFor={`${sub.id}-read`} className="text-xs">Read</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch id={`${sub.id}-write`} />
                                  <Label htmlFor={`${sub.id}-write`} className="text-xs">Write</Label>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AccessControl;
