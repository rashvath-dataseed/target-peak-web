import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { APP_NAVIGATION, NavItem } from "@/config/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const MainLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Helper to find current page title recursively
  const getPageTitle = (items: NavItem[], path: string): string => {
    for (const item of items) {
      if (item.path === path) return item.title;
      if (item.children) {
        const childTitle = getPageTitle(item.children, path);
        if (childTitle) return childTitle;
      }
    }
    return "";
  };

  const pageTitle =
    getPageTitle(APP_NAVIGATION, location.pathname) || "Dashboard";

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r-0">
          <div className="flex h-16 items-center border-b px-4">
            <span className="text-xl  font-bold">Target Peak</span>
          </div>
          <AppSidebar
            collapsed={false}
            onItemClick={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden h-screen border-r border-border bg-sidebar transition-all duration-300 lg:block",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-sidebar-border px-4 transition-all",
            sidebarCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 font-bold overflow-hidden whitespace-nowrap",
              sidebarCollapsed
                ? "w-0 opacity-0"
                : "w-auto opacity-100 transition-opacity duration-300"
            )}
          >
            <img
              src="/taget-peak.png"
              alt="Target Peak"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-white tracking-wide">
              Target Peak
            </span>
          </div>
          {sidebarCollapsed && (
            <img
              src="/taget-peak.png"
              alt="TP"
              className="h-8 w-8 object-contain"
            />
          )}
        </div>

        <div className="relative h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-1 overflow-y-auto py-2">
            <AppSidebar collapsed={sidebarCollapsed} />
          </div>

          {/* Collapse Toggle Button */}
          <div className="p-2 border-t border-sidebar-border flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn("h-8 w-8", sidebarCollapsed && "mx-auto")}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        <AppHeader title={pageTitle} onMenuClick={() => setMobileOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card px-4 py-3 text-center text-xs text-muted-foreground lg:px-6">
          © 2026 Target Peak. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
