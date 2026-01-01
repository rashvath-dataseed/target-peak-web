import { lazy } from "react";

// Auth routes
const Login = lazy(() => import("@/pages/auth/Login"));
const OtpVerification = lazy(() => import("@/pages/auth/OtpVerification"));

const AccessDenied = lazy(() => import("@/pages/auth/AccessDenied"));
const NotFound = lazy(() => import("@/pages/auth/NotFound"));

// Dashboard routes
import { dashboardRoutes } from "@/pages/dashboard";
import {
  AllData,
  AppRegisteredStudent,
  Course,
  EClasses,
  Events,
  Exam,
  ExpiredCourse,
  FailedPayment,
  OmrStudent,
  PaidStudent,
  PromotionSetup,
  Qualification,
  Role,
  Stream,
  Subject,
  SupportCategory,
  UnitChapter,
} from "@/pages/modules";
import { User } from "lucide-react";

// Admin routes
const AdminList = lazy(() => import("@/pages/admin/AdminList"));
const Users = lazy(() => import("@/pages/admin/Users"));
const Roles = lazy(() => import("@/pages/admin/Roles"));
const HierarchyManagement = lazy(
  () => import("@/pages/admin/HierarchyManagement")
);
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
  {
    path: "/settings/support-category",
    element: SupportCategory,
    roles: ["super_admin"],
  },
  //General settings
  {
    path: "/settings/stream",
    element: Stream,
    roles: ["super_admin"],
  },
  {
    path: "/settings/support-category",
    element: SupportCategory,
    roles: ["super_admin"],
  },
  {
    path: "/settings/subject",
    element: Subject,
    roles: ["super_admin"],
  },
  {
    path: "/settings/support-category",
    element: SupportCategory,
    roles: ["super_admin"],
  },
  {
    path: "/settings/unit-chapter",
    element: UnitChapter,
    roles: ["super_admin"],
  },
  {
    path: "/settings/qualification",
    element: Qualification,
    roles: ["super_admin"],
  },
  {
    path: "/settings/role",
    element: Role,
    roles: ["super_admin"],
  },
  {
    path: "/settings/events",
    element: Events,
    roles: ["super_admin"],
  },
  {
    path: "/settings/promotion-setup",
    element: PromotionSetup,
    roles: ["super_admin"],
  },
  //Course settings
  {
    path: "/settings/course",
    element: Course,
    roles: ["super_admin"],
  },
  {
    path: "/settings/exam",
    element: Exam,
    roles: ["super_admin"],
  },
  {
    path: "/settings/e-classes",
    element: EClasses,
    roles: ["super_admin"],
  },
  //User settings
  {
    path: "/settings/user",
    element: Users,
  },
  ...dashboardRoutes,
  //   Users
  //  ├─ All Data
  //  ├─ App Registered Student
  //  ├─ OMR Student
  //  ├─ Paid Student
  //  ├─ Expired Course
  //  └─ Failed / Pending Payment
  {
    path: "/users/all-data",
    element: AllData,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/users/app-registered",
    element: AppRegisteredStudent,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/users/omr-student",
    element: OmrStudent,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/users/paid-student",
    element: PaidStudent,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/users/expired-course",
    element: ExpiredCourse,
    roles: ["super_admin", "admin"],
  },
  {
    path: "/users/failed-payment",
    element: FailedPayment,
    roles: ["super_admin", "admin"],
  },
  // Fallback
  {
    path: "*",
    element: NotFound,
    public: true,
  },
];