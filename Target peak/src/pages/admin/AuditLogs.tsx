import React, { useState, useEffect } from 'react';
import { AuditLog, getAuditLogs } from '@/mocks/logs.mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { formatDateTime } from '@/utils/constants';
import { Search, Filter, Clock, User, Activity } from 'lucide-react';

const AuditLogs: React.FC = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAuditLogs();
        setLogs(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch audit logs',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [toast]);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action.includes(actionFilter);
    
    return matchesSearch && matchesAction;
  });

  const getActionBadgeClass = (action: string) => {
    if (action.includes('CREATE')) return 'bg-success/10 text-success';
    if (action.includes('UPDATE') || action.includes('PERMISSION')) return 'bg-blue-100 text-blue-700';
    if (action.includes('DELETE') || action.includes('DEACTIVATE')) return 'bg-destructive/10 text-destructive';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Audit Logs</h2>
        <p className="text-muted-foreground">
          Track all system activities and changes
        </p>
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="CREATE">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="DEACTIVATE">Deactivate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Log ({filteredLogs.length})</CardTitle>
          <CardDescription>Immutable record of all system actions</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredLogs.map(log => (
                <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-muted/30">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getActionBadgeClass(log.action)}>
                        {log.action.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm font-medium">{log.target}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {log.actor} ({log.actorRole.replace('_', ' ')})
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDateTime(log.timestamp)}
                      </span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
