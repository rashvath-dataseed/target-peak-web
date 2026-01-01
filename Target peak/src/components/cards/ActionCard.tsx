import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  icon: Icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn('action-card group', className)}
    >
      <div className="action-icon flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-foreground">{title}</span>
    </button>
  );
};
