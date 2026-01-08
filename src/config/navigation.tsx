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
  User,
  MessageCircle,
  Trophy,
  HandHelping,
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
const MODULE_COMPONENTS: Record<
  string,
  () => Promise<{ default: ComponentType<any> }>
> = {
  "TOKEN DETAILS": () => import("@/pages/dashboard/TokenDetails"),
  "APPLICATION ERROR": () => import("@/pages/common/ApplicationError"),
  STREAM: () => import("@/pages/settings/Stream"),
  "QUESTIONS ERROR": () => import("@/pages/common/QuestionsError"),
  "JIO OFFER REPORT": () => import("@/pages/reports/JioOfferReport"),
  "SUPPORT CATEGORY": () => import("@/pages/support/SupportCategory"),
  SUBJECT: () => import("@/pages/settings/Subject"),
  "UNIT / CHAPTER": () => import("@/pages/settings/UnitChapter"),
  INSTITUTE: () => import("@/pages/master/Institute"),
  COURSE: () => import("@/pages/courses/CourseSettings"),
  EXAM: () => import("@/pages/courses/Exam"),
  "E-CLASSES": () => import("@/pages/courses/EClasses"),
  QUALIFICATION: () => import("@/pages/settings/Qualification"),
  USER: () => import("@/pages/users/UserSettings"),
  ROLE: () => import("@/pages/settings/RoleSettings"),
  SANSTHA: () => import("@/pages/master/Sanstha"),
  "ALL DATA": () => import("@/pages/users/AllData"),
  "APP REGISTERED STUDENT": () => import("@/pages/users/AppRegisteredStudent"),
  "PROGRESS REPORT": () => import("@/pages/reports/ProgressReport"),
  "PAID STUDENT": () => import("@/pages/users/PaidStudent"),
  EVENTS: () => import("@/pages/settings/Events"),
  "OMR STUDENT": () => import("@/pages/users/OmrStudent"),
  "EXPIRED COURSE": () => import("@/pages/courses/ExpiredCourse"),
  "FAILED / PENDING PAYMENT": () => import("@/pages/users/FailedPayment"),
  "PROMOTION SETUP": () => import("@/pages/settings/PromotionSetup"),
};

// Helper to generate NavItems from modules.ts
const generateModuleNavItems = (): NavItem[] => {
  return SUPER_ADMIN_MODULES.map((mod, index) => {
    // Determine the component to load
    const importFn = MODULE_COMPONENTS[mod.title];

    // Fallback to EmptyPage if not found
    const Component = importFn
      ? lazy(importFn)
      : lazy(() => import("@/pages/dashboard/EmptyPage"));

    // Ensure path starts with /dashboard/ if it doesn't already
    const pathSlug = mod.path.startsWith("/dashboard")
      ? mod.path
      : `/dashboard${mod.path}`;

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

// export const APP_NAVIGATION: NavItem[] = [

//    {
//         id: "dashboard-overview",
//         title: "Dashboard",
//         path: "/dashboard",
//         icon: LayoutDashboard,
//         component: lazy(() => import("@/pages/dashboard/Dashboard")),
//         roles: ["super_admin", "admin", "hierarchy_user"],
//       },
//   {
//     id: "user-management",
//     title: "User Management",
//     icon: Users,
//     roles: ["super_admin", "admin"],
//     children: [
//       {
//         id: "admins",
//         title: "Manage Admins",
//         path: "/admins",
//         icon: UserCog,
//         component: lazy(() => import("@/pages/users/AdminList")),
//         roles: ["super_admin"],
//       },
//       {
//         id: "users",
//         title: "All Users",
//         path: "/users",
//         icon: Users,
//         component: lazy(() => import("@/pages/users/Users")),
//         roles: ["super_admin", "admin"],
//       },
//       {
//         id: "roles",
//         title: "Roles & Permissions",
//         path: "/roles",
//         icon: Shield,
//         component: lazy(() => import("@/pages/users/RoleSettings")),
//         roles: ["super_admin"],
//       },
//     ],
//   },
//   {
//     id: "hierarchy",
//     title: "Hierarchy",
//     path: "/hierarchy",
//     icon: GitBranch,
//     component: lazy(() => import("@/pages/master/HierarchyManagement")),
//     roles: ["super_admin"],
//   },
//   {
//     id: "course-management",
//     title: "Course Management",
//     icon: BookOpen,
//     roles: ["super_admin", "admin", "hierarchy_user"],
//     children: [
//       {
//         id: "courses",
//         title: "All Courses",
//         path: "/courses",
//         icon: BookOpen,
//         component: lazy(() => import("@/pages/courses/CourseSettings")),
//         roles: ["super_admin", "admin", "hierarchy_user"],
//       },
//       {
//         id: "categories",
//         title: "Categories",
//         path: "/categories",
//         icon: List,
//         component: lazy(() => import("@/pages/master/Categories")),
//         roles: ["super_admin", "admin"],
//       },
//       {
//         id: "assessments",
//         title: "Assessments",
//         path: "/assessments",
//         icon: FileCheck,
//         component: lazy(() => import("@/pages/courses/Assessments")),
//         roles: ["super_admin", "admin"],
//       },
//     ],
//   },
//   {
//     id: "access-control-group",
//     title: "Access & Security",
//     icon: Lock,
//     roles: ["super_admin"],
//     children: [
//       {
//         id: "access-control",
//         title: "Access Control",
//         path: "/access-control",
//         icon: Lock,
//         component: lazy(() => import("@/pages/users/AccessControl")),
//         roles: ["super_admin"],
//       },
//       {
//         id: "audit-logs",
//         title: "Audit Logs",
//         path: "/audit-logs",
//         icon: History,
//         component: lazy(() => import("@/pages/reports/AuditLogs")),
//         roles: ["super_admin"],
//       },
//     ],
//   },
//   {
//     id: "reports",
//     title: "Reports",
//     path: "/reports",
//     icon: BarChart3,
//     component: lazy(() => import("@/pages/reports/Reports")),
//     roles: ["super_admin", "admin"],
//   },
//   {
//     id: "settings",
//     title: "System Settings",
//     path: "/settings",
//     icon: Settings,
//     component: lazy(() => import("@/pages/settings/SystemSettings")),
//     roles: ["super_admin"],
//   },
//   {
//     id: "temp-features",
//     title: "Temporary Features",
//     icon: FlaskConical,
//     roles: ["super_admin", "admin"],
//     children: [
//       {
//         id: "empty-page",
//         title: "Empty Page",
//         path: "/temp/empty",
//         icon: FileText,
//         component: lazy(() => import("@/pages/dashboard/EmptyPage")),
//         roles: ["super_admin", "admin"],
//       },
//     ],
//   },
// ];

export const APP_NAVIGATION: NavItem[] = [
  {
    id: "dashboard-overview",
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    component: lazy(() => import("@/pages/dashboard/Dashboard")),
    roles: ["super_admin", "admin", "hierarchy_user"],
  },
  //general settings
  {
    id: "general-settings",
    title: "General Settings",
    path: "/settings",
    icon: Settings,
    roles: ["super_admin"],
    children: [
      {
        id: "settings-stream",
        title: "Stream",
        path: "/settings/stream",
        // D:\Peak\Target peak\src\pages\modules\Stream.tsx
        component: lazy(() => import("@/pages/settings/Stream")),
      },
      {
        id: "settings-language",
        title: "Language",
        path: "/settings/language",
        // D:\Peak\Target peak\src\pages\modules\Stream.tsx
        component: lazy(() => import("@/pages/support/Language")),
      },
      {
        id: "settings-support-category",
        title: "Support Category",
        path: "/settings/support-category",
        component: lazy(() => import("@/pages/support/SupportCategory")),
      },
      {
        id: "settings-subject",
        title: "Subject",
        path: "/settings/subject",
        component: lazy(() => import("@/pages/settings/Subject")),
      },
      {
        id: "settings-unit-chapter",
        title: "Unit / Chapter",
        path: "/settings/unit-chapter",
        component: lazy(() => import("@/pages/settings/UnitChapter")),
      },
      {
        id: "settings-qualification",
        title: "Qualification",
        path: "/settings/qualification",
        component: lazy(() => import("@/pages/settings/Qualification")),
      },
      {
        id: "settings-role",
        title: "Role",
        path: "/settings/role",
        component: lazy(() => import("@/pages/settings/RoleSettings")),
      },
      {
        id: "settings-events",
        title: "Events",
        path: "/settings/events",
        component: lazy(() => import("@/pages/settings/Events")),
      },
      {
        id: "settings-promotion-setup",
        title: "Promotion Setup",
        path: "/settings/promotion-setup",
        component: lazy(() => import("@/pages/settings/PromotionSetup")),
      },
      {
        id: "settings-banners",
        title: "Banners",
        path: "/settings/banners",
        component: lazy(() => import("@/pages/settings/Banners")),
      },
    ],
  },
  //Course
  {
    id: "course-settings",
    title: "Course Settings",
    path: "/settings/course",
    icon: Settings,
    roles: ["super_admin"],
    children: [
      {
        id: "settings-course",
        title: "Course",
        path: "/settings/course",
        component: lazy(() => import("@/pages/courses/CourseSettings")),
      },
      {
        id: "settings-exam",
        title: "Exam",
        path: "/settings/exam",
        component: lazy(() => import("@/pages/courses/Exam")),
      },
      {
        id: "settings-e-classes",
        title: "E-Classes",
        path: "/settings/e-classes",
        component: lazy(() => import("@/pages/courses/EClasses")),
      },
    ],
  },

  // User Settings
  {
    id: "user-settings",
    title: "User Settings",
    // path: "/settings/user",
    icon: User,
    roles: ["super_admin"],
    children: [
      {
        id: "settings-user",
        title: "User",
        path: "/settings/user",
        icon: User,
        component: lazy(() => import("@/pages/users/UserSettings")),
      },
    ],
  },
  //   Users

  {
    id: "users-group",
    title: "Users",
    icon: Users,
    roles: ["super_admin", "admin"],
    children: [
      {
        id: "users-all-data",
        title: "All Data",
        path: "/users/all-data",
        component: lazy(() => import("@/pages/users/AllData")),
        roles: ["super_admin", "admin"],
      },
      {
        id: "users-app-registered",
        title: "App Registered Student",
        path: "/users/app-registered",
        component: lazy(() => import("@/pages/users/AppRegisteredStudent")),
        roles: ["super_admin", "admin"],
      },
      {
        id: "users-omr-student",
        title: "OMR Student",
        path: "/users/omr-student",
        component: lazy(() => import("@/pages/users/OmrStudent")),
        roles: ["super_admin", "admin"],
      },
      {
        id: "users-paid-student",
        title: "Paid Student",
        path: "/users/paid-student",
        component: lazy(() => import("@/pages/users/PaidStudent")),
        roles: ["super_admin", "admin"],
      },
      {
        id: "users-expired-course",
        title: "Expired Course",
        path: "/users/expired-course",
        component: lazy(() => import("@/pages/courses/ExpiredCourse")),
        roles: ["super_admin", "admin"],
      },
      {
        id: "users-failed-payment",
        title: "Failed / Pending Payment",
        path: "/users/failed-payment",
        component: lazy(() => import("@/pages/users/FailedPayment")),
        roles: ["super_admin", "admin"],
      },
    ],
  },
  //  //master
  {
    id: "master",
    title: "Master",
    path: "/settings/master",
    icon: Shield,
    roles: ["super_admin"],
    children: [
      {
        id: "settings-user-hierarchy",
        title: "Mange hierarchy",
        path: "/settings/master-hierarchy",
        component: lazy(() => import("@/pages/master/MasterHierarchy")),
      },
      {
        id: "settings-hierarchy-management",
        title: "Hierarchy Management",
        path: "/settings/master-hierarchy-management",
        component: lazy(() => import("@/pages/master/HierarchyManagement")),
      },
      {
        id: "settings-vertical-manage",
        title: "Vertical Manage",
        path: "/settings/vertical-manage",
        component: lazy(() => import("@/pages/master/VerticalManage")),
      },

      {
        id: "settings-institute",
        title: "institute",
        path: "/settings/institute",
        component: lazy(() => import("@/pages/master/Institute")),
      },
      {
        id: "settings-faq",
        title: "Faq",
        path: "/settings/faq",
        component: lazy(() => import("@/pages/master/Faq")),
      },

      {
        id: "settings-coupon",
        title: "Coupon",
        path: "/settings/coupon",
        component: lazy(() => import("@/pages/master/Coupon")),
      },
    ],
  },

  {
    id: "user-activities",
    title: "Activities",
    path: "/settings/activities",
    icon: MessageCircle,
    roles: ["super_admin"],
    children: [
      {
        id: "settings-chat",
        title: "Live chat",
        path: "/settings/chat",
        component: lazy(() => import("@/pages/activities/Chat")),
      },

      {
        id: "settings-live-activity",
        title: "Live activity",
        path: "/settings/live-activity",
        component: lazy(() => import("@/pages/activities/LiveActivities")),
      },
    ],
  },
  //view result
  {
    id: "view-result",
    title: "View result",
    path: "/view-result",
    icon: Trophy,
    roles: ["super_admin"],
    children: [
      {
        id: "settings-progress-report",
        title: "Progress report",
        path: "/settings/progress-report",
        icon: Trophy,
        component: lazy(() => import("@/pages/reports/ProgressReport")),
      },
    ],
  },
  //result
  {
    id: "result",
    title: "Result",
    path: "/result",
    icon: Trophy,
    roles: ["super_admin"],
    component: lazy(() => import("@/pages/results/Result")),
  },
  // referal mobile support
  {
    id: "referal-mobile-support",
    title: "Referal mobile support",
    path: "/referal-mobile-support",
    icon: Trophy,
    roles: ["super_admin"],
    component: lazy(() => import("@/pages/support/ReferalMobileSupport")),
  },
  // support
  // childrens
  // -token details
  // -support mobile
  // support whatsapp
  // -support mail
  // support ai
  {
    id: "support",
    title: "Support",
    path: "/support",
    icon: HandHelping,
    roles: ["super_admin"],
    children: [
      {
        id: "settings-token-details",
        title: "Token details",
        path: "/settings/token-details",
        icon: Trophy,
        component: lazy(() => import("@/pages/dashboard/TokenDetails")),
      },
      {
        id: "settings-support-mobile",
        title: "Support mobile",
        path: "/settings/support-mobile",
        icon: Trophy,
        component: lazy(() => import("@/pages/support/SupportMobile")),
      },
      {
        id: "settings-support-whatsapp",
        title: "Support whatsapp",
        path: "/settings/support-whatsapp",
        icon: Trophy,
        component: lazy(() => import("@/pages/support/SupportWhatsapp")),
      },
      {
        id: "settings-support-mail",
        title: "Support mail",
        path: "/settings/support-mail",
        icon: Trophy,
        component: lazy(() => import("@/pages/support/SupportMail")),
      },
      {
        id: "settings-support-ai",
        title: "Support ai",
        path: "/settings/support-ai",
        icon: Trophy,
        component: lazy(() => import("@/pages/support/SupportAi")),
      },
    ],
  },
];
