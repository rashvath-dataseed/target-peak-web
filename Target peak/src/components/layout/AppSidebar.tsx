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

    // Indentation for nested items
    const paddingLeft = collapsed ? undefined : `${depth * 12 + 12}px`;

    if (hasChildren) {
      if (collapsed) {
        // In collapsed mode, we don't show children in accordion,
        // typically you'd use a Popover or HoverCard, but for now we just show the parent icon
        // or we could disable collapsing for items with children if that's the UX pattern.
        // A common pattern is to show the icon and a tooltip.
        return (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center justify-center p-2 rounded-lg cursor-pointer transition-colors mb-1",
                  isChildActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {item.title} (Expand sidebar to view submenus)
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
                "flex w-full items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors mb-1",
                isChildActive || isOpen
                  ? "text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white",
                depth > 0 && "text-sm"
              )}
              style={{ paddingLeft }}
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                <span>{item.title}</span>
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen && "rotate-90"
                )}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 bg-white/5 rounded-b-lg">
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
          "flex items-center gap-3 rounded-lg p-2 text-sm font-medium transition-colors mb-1",
          isActive
            ? "bg-black text-white shadow-sm"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        )}
        style={{ paddingLeft: collapsed ? undefined : paddingLeft }}
      >
        {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
        {!collapsed && <span>{item.title}</span>}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.id} delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex justify-center">{LinkComponent}</div>
          </TooltipTrigger>
          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.id}>{LinkComponent}</div>;
  };

  return (
    <nav className="space-y-1 px-2 py-2">
      {APP_NAVIGATION.map((item) => renderNavItem(item))}
    </nav>
  );
};
