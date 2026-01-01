import { LazyExoticComponent, ComponentType, lazy } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  GitBranch,
  BookOpen,
  FileText,
  BarChart3,
  Lock,
  UserCog,
  FileCheck,
  List,
  AlertOctagon,
  History,
  FlaskConical,
  Grid,
} from "lucide-react";
import { UserRole } from "@/types/auth.types";
import { SUPER_ADMIN_MODULES } from "@/constants/modules";

export interface NavItem {
  id: string;
  title: string;
  path?: string;
  icon?: React.ElementType;
  children?: NavItem[];
  roles?: UserRole[];
  component?: LazyExoticComponent<ComponentType<any>>;
}

// Mapping of module titles to their component imports
const MODULE_COMPONENTS: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  "TOKEN DETAILS": () => import("@/pages/dashboard/TokenDetails"),
  "APPLICATION ERROR": () => import("@/pages/modules/ApplicationError"),
  "STREAM": () => import("@/pages/modules/Stream"),
  "QUESTIONS ERROR": () => import("@/pages/modules/QuestionsError"),
  "JIO OFFER REPORT": () => import("@/pages/modules/JioOfferReport"),
  "SUPPORT CATEGORY": () => import("@/pages/modules/SupportCategory"),
  "SUBJECT": () => import("@/pages/modules/Subject"),
  "UNIT / CHAPTER": () => import("@/pages/modules/UnitChapter"),
  "INSTITUTE": () => import("@/pages/modules/Institute"),
  "COURSE": () => import("@/pages/modules/Course"),
  "EXAM": () => import("@/pages/modules/Exam"),
  "E-CLASSES": () => import("@/pages/modules/EClasses"),
  "QUALIFICATION": () => import("@/pages/modules/Qualification"),
  "USER": () => import("@/pages/modules/User"),
  "ROLE": () => import("@/pages/modules/Role"),
  "SANSTHA": () => import("@/pages/modules/Sanstha"),
  "ALL DATA": () => import("@/pages/modules/AllData"),
  "APP REGISTERED STUDENT": () => import("@/pages/modules/AppRegisteredStudent"),
  "PROGRESS REPORT": () => import("@/pages/modules/ProgressReport"),
  "PAID STUDENT": () => import("@/pages/modules/PaidStudent"),
  "EVENTS": () => import("@/pages/modules/Events"),
  "OMR STUDENT": () => import("@/pages/modules/OmrStudent"),
  "EXPIRED COURSE": () => import("@/pages/modules/ExpiredCourse"),
  "FAILED / PENDING PAYMENT": () => import("@/pages/modules/FailedPayment"),
  "PROMOTION SETUP": () => import("@/pages/modules/PromotionSetup"),
};

// Helper to generate NavItems from modules.ts
const generateModuleNavItems = (): NavItem[] => {
  return SUPER_ADMIN_MODULES.map((mod, index) => {
    // Determine the component to load
    const importFn = MODULE_COMPONENTS[mod.title];
    
    // Fallback to GenericModule if not found (though all should be found now)
    const Component = importFn 
      ? lazy(importFn)
      : lazy(() => import("@/pages/modules/GenericModule"));

    // Ensure path starts with /dashboard/ if it doesn't already
    const pathSlug = mod.path.startsWith('/dashboard') ? mod.path : `/dashboard${mod.path}`;

    return {
      id: `module-${index}`,
      title: mod.title,
      path: pathSlug,
      icon: mod.icon,
      component: Component,
      roles: ["super_admin"],
    };
  });
};

// const moduleItems = generateModuleNavItems();

export const APP_NAVIGATION: NavItem[] = [
 
   {
        id: "dashboard-overview",
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        component: lazy(() => import("@/pages/dashboard/Dashboard")),
        roles: ["super_admin", "admin", "hierarchy_user"],
      },
  {
    id: "user-management",
    title: "User Management",
    icon: Users,
    roles: ["super_admin", "admin"],
    children: [
      {
        id: "admins",
        title: "Manage Admins",
        path: "/admins",
        icon: UserCog,
        component: lazy(() => import("@/pages/admin/AdminList")),
        roles: ["super_admin"],
      },
      {
        id: "users",
        title: "All Users",
        path: "/users",
        icon: Users,
        component: lazy(() => import("@/pages/admin/Users")),
        roles: ["super_admin", "admin"],
      },
      {
        id: "roles",
        title: "Roles & Permissions",
        path: "/roles",
        icon: Shield,
        component: lazy(() => import("@/pages/admin/Roles")),
        roles: ["super_admin"],
      },
    ],
  },
  {
    id: "hierarchy",
    title: "Hierarchy",
    path: "/hierarchy",
    icon: GitBranch,
    component: lazy(() => import("@/pages/admin/HierarchyManagement")),
    roles: ["super_admin"],
  },
  {
    id: "course-management",
    title: "Course Management",
    icon: BookOpen,
    roles: ["super_admin", "admin", "hierarchy_user"],
    children: [
      {
        id: "courses",
        title: "All Courses",
        path: "/courses",
        icon: BookOpen,
        component: lazy(() => import("@/pages/admin/Courses")),
        roles: ["super_admin", "admin", "hierarchy_user"],
      },
      {
        id: "categories",
        title: "Categories",
        path: "/categories",
        icon: List,
        component: lazy(() => import("@/pages/admin/Categories")),
        roles: ["super_admin", "admin"],
      },
      {
        id: "assessments",
        title: "Assessments",
        path: "/assessments",
        icon: FileCheck,
        component: lazy(() => import("@/pages/admin/Assessments")),
        roles: ["super_admin", "admin"],
      },
    ],
  },
  {
    id: "access-control-group",
    title: "Access & Security",
    icon: Lock,
    roles: ["super_admin"],
    children: [
      {
        id: "access-control",
        title: "Access Control",
        path: "/access-control",
        icon: Lock,
        component: lazy(() => import("@/pages/admin/AccessControl")),
        roles: ["super_admin"],
      },
      {
        id: "audit-logs",
        title: "Audit Logs",
        path: "/audit-logs",
        icon: History,
        component: lazy(() => import("@/pages/admin/AuditLogs")),
        roles: ["super_admin"],
      },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
    component: lazy(() => import("@/pages/admin/Reports")),
    roles: ["super_admin", "admin"],
  },
  {
    id: "settings",
    title: "System Settings",
    path: "/settings",
    icon: Settings,
    component: lazy(() => import("@/pages/admin/SystemSettings")),
    roles: ["super_admin"],
  },
  {
    id: "temp-features",
    title: "Temporary Features",
    icon: FlaskConical,
    roles: ["super_admin", "admin"],
    children: [
      {
        id: "empty-page",
        title: "Empty Page",
        path: "/temp/empty",
        icon: FileText,
        component: lazy(() => import("@/pages/dashboard/EmptyPage")),
        roles: ["super_admin", "admin"],
      },
    ],
  },
];
