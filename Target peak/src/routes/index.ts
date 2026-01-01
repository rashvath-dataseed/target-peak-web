import { lazy } from "react";

// Auth routes
const Login = lazy(() => import("@/pages/auth/Login"));
const OtpVerification = lazy(() => import("@/pages/auth/OtpVerification"));

const AccessDenied = lazy(() => import("@/pages/auth/AccessDenied"));
const NotFound = lazy(() => import("@/pages/auth/NotFound"));

// Dashboard routes
import { dashboardRoutes } from "@/pages/dashboard";

// Admin routes
const AdminList = lazy(() => import("@/pages/admin/AdminList"));
const Users = lazy(() => import("@/pages/admin/Users"));
const Roles = lazy(() => import("@/pages/admin/Roles"));
const HierarchyManagement = lazy(() => import("@/pages/admin/HierarchyManagement"));
const Courses = lazy(() => import("@/pages/admin/Courses"));
const Categories = lazy(() => import("@/pages/admin/Categories"));
const Assessments = lazy(() => import("@/pages/admin/Assessments"));
const AccessControl = lazy(() => import("@/pages/admin/AccessControl"));
const AuditLogs = lazy(() => import("@/pages/admin/AuditLogs"));
const Reports = lazy(() => import("@/pages/admin/Reports"));
const SystemSettings = lazy(() => import("@/pages/admin/SystemSettings"));

export const routes = [
  // Public routes
  {
    path: "/login",
    element: Login,
    public: true,
  },
  {
    path: "/otp-verification",
    element: OtpVerification,
    public: true,
  },
  {
    path: "/access-denied",
    element: AccessDenied,
    public: true,
  },

  // Protected routes
  {
    path: "/admins",
    element: AdminList,
    roles: ["super_admin"],
  },
  {
    path: "/users",
    element: Users,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/roles",
    element: Roles,
    roles: ["super_admin"],
  },
  {
    path: "/hierarchy",
    element: HierarchyManagement,
    roles: ["super_admin"],
  },
  {
    path: "/courses",
    element: Courses,
    roles: ["super_admin", "admin", "hierarchy_user"],
  },
  {
    path: "/categories",
    element: Categories,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/assessments",
    element: Assessments,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/access-control",
    element: AccessControl,
    roles: ["super_admin"],
  },
  {
    path: "/audit-logs",
    element: AuditLogs,
    roles: ["super_admin"],
  },
  {
    path: "/reports",
    element: Reports,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/settings",
    element: SystemSettings,
    roles: ["super_admin"],
  },

  // Dashboard routes (includes all module routes)
  ...dashboardRoutes,

  // Fallback
  {
    path: "*",
    element: NotFound,
    public: true,
  },
];