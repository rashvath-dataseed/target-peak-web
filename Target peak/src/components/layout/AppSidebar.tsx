import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { APP_NAVIGATION, NavItem } from "@/config/navigation";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppSidebarProps {
  collapsed: boolean;
  onToggle?: () => void;
  onItemClick?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
  onItemClick,
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Automatically open parent menus when a child is active
  useEffect(() => {
    const newOpenItems = new Set<string>();

    const findActiveParents = (items: NavItem[], parentId?: string) => {
      for (const item of items) {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child) =>
              child.path === location.pathname ||
              (child.children && findActiveParents(child.children, item.id))
          );

          if (hasActiveChild) {
            newOpenItems.add(item.id);
            if (parentId) newOpenItems.add(parentId);
          }
        }
      }
      return false;
    };

    findActiveParents(APP_NAVIGATION);
    setOpenItems((prev) => {
      const combined = new Set(prev);
      newOpenItems.forEach((id) => combined.add(id));
      return combined;
    });
  }, [location.pathname]);

  const hasPermission = (item: NavItem) => {
    if (!item.roles || item.roles.length === 0) return true;
    return user && item.roles.includes(user.role);
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    if (!hasPermission(item)) return null;

    const Icon = item.icon;
    const isActive = item.path === location.pathname;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems.has(item.id);
    const isChildActive =
      hasChildren &&
      item.children?.some(
        (child) =>
          child.path === location.pathname ||
          (child.children &&
            child.children.some(
              (grandChild) => grandChild.path === location.pathname
            ))
      );

    // Compact indentation for nested items
    const paddingLeft = collapsed ? undefined : `${depth * 12 + 12}px`;

    if (hasChildren) {
      if (collapsed) {
        return (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors mb-1",
                  isChildActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {item.title}
            </TooltipContent>
          </Tooltip>
        );
      }

      return (
        <Collapsible
          key={item.id}
          open={isOpen}
          onOpenChange={() => toggleItem(item.id)}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex w-full items-center justify-between py-2 px-3 rounded-md text-xs font-medium transition-colors",
                isChildActive || isOpen
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
              )}
              style={{ paddingLeft }}
            >
              <div className="flex items-center gap-2.5">
                {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                <span className="truncate">{item.title}</span>
              </div>
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 flex-shrink-0 transition-transform duration-200",
                  isOpen && "rotate-90"
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-0.5">
            {item.children?.map((child) => renderNavItem(child, depth + 1))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    // Leaf node
    const LinkComponent = (
      <Link
        to={item.path || "#"}
        onClick={onItemClick}
        className={cn(
          "flex items-center gap-2.5 rounded-md py-2 px-3 text-xs font-medium transition-colors",
          isActive
            ? "bg-white text-slate-900"
            : "text-gray-400 hover:bg-white/5 hover:text-gray-300"
        )}
        style={{ paddingLeft: collapsed ? undefined : paddingLeft }}
      >
        {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
        {!collapsed && <span className="truncate">{item.title}</span>}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.id} delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex justify-center">{LinkComponent}</div>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            {item.title}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.id}>{LinkComponent}</div>;
  };

  return (
    <nav className="space-y-0.5 px-2 py-2">
      {APP_NAVIGATION.map((item) => renderNavItem(item))}
    </nav>
  );
};
