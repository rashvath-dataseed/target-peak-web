import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant: 'users' | 'admins' | 'courses' | 'revenue';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon: Icon,
  variant,
  trend,
}) => {
  const iconColors = {
    users: 'text-teal bg-teal/10',
    admins: 'text-primary bg-primary/10',
    courses: 'text-success bg-success/10',
    revenue: 'text-warning bg-warning/10',
  };

  return (
    <Card className={cn("analytics-card", variant)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {/* {trend && (
            <p className={cn(
              'text-xs font-medium',
              trend.isPositive ? 'text-success' : 'text-destructive'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )} */}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg",
            iconColors[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};
