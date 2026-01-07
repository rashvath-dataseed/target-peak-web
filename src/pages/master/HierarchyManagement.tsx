import React, { useState, useEffect } from 'react';
import { HierarchyLevel } from '@/types/hierarchy.types';
import { getHierarchyLevels } from '@/mocks/hierarchy.mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, ChevronRight, Users, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

const HierarchyManagement: React.FC = () => {
  const { toast } = useToast();
  const [levels, setLevels] = useState<HierarchyLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set(['h1', 'h2']));

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const data = await getHierarchyLevels();
        setLevels(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch hierarchy levels',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLevels();
  }, [toast]);

  const toggleExpand = (id: string) => {
    setExpandedLevels(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getChildLevels = (parentId: string | null) => {
    return levels.filter(l => l.parentId === parentId);
  };

  const renderLevel = (level: HierarchyLevel, depth: number = 0) => {
    const children = getChildLevels(level.id);
    const isExpanded = expandedLevels.has(level.id);
    const hasChildren = children.length > 0;

    return (
      <div key={level.id} className="animate-fade-in">
        <div 
          className={cn(
            'flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-sm',
            depth > 0 && 'ml-8'
          )}
          style={{ marginLeft: depth * 32 }}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(level.id)}
              className="flex h-6 w-6 items-center justify-center rounded-md bg-muted hover:bg-muted/80"
            >
              <ChevronRight className={cn(
                'h-4 w-4 transition-transform',
                isExpanded && 'rotate-90'
              )} />
            </button>
          ) : (
            <div className="h-6 w-6" />
          )}
          
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <GitBranch className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{level.name}</h3>
              <Badge variant="outline" className="text-xs">Level {level.level}</Badge>
            </div>
            {level.description && (
              <p className="text-sm text-muted-foreground">{level.description}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{level.adminCount} admins</span>
          </div>
          
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {children.map(child => renderLevel(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootLevels = getChildLevels(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Hierarchy Management</h2>
          <p className="text-muted-foreground">
            Define and manage organizational hierarchy levels
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Level
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10">
                <GitBranch className="h-5 w-5 text-teal" />
              </div>
              <div>
                <p className="text-2xl font-bold">{levels.length}</p>
                <p className="text-sm text-muted-foreground">Total Levels</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {levels.reduce((sum, l) => sum + l.adminCount, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <GitBranch className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.max(...levels.map(l => l.level), 0)}</p>
                <p className="text-sm text-muted-foreground">Max Depth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hierarchy Tree */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hierarchy Structure</CardTitle>
          <CardDescription>
            Click to expand/collapse levels. Drag to reorder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-2">
              {rootLevels.map(level => renderLevel(level))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HierarchyManagement;
