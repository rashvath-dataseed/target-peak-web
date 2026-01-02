import { lazy } from "react";

// Auth routes
const Login = lazy(() => import("@/pages/auth/Login"));
const OtpVerification = lazy(() => import("@/pages/auth/OtpVerification"));

const AccessDenied = lazy(() => import("@/pages/auth/AccessDenied"));
const NotFound = lazy(() => import("@/pages/auth/NotFound"));

// Dashboard routes
import { dashboardRoutes, TokenDetails } from "@/pages/dashboard";

// Module routes (Refactored)
const AllData = lazy(() => import("@/pages/users/AllData"));
const AppRegisteredStudent = lazy(
  () => import("@/pages/users/AppRegisteredStudent")
);
const Course = lazy(() => import("@/pages/courses/CourseSettings"));
const EClasses = lazy(() => import("@/pages/courses/EClasses"));
const Events = lazy(() => import("@/pages/settings/Events"));
const Exam = lazy(() => import("@/pages/courses/Exam"));
const ExpiredCourse = lazy(() => import("@/pages/courses/ExpiredCourse"));
const FailedPayment = lazy(() => import("@/pages/users/FailedPayment"));
const Institute = lazy(() => import("@/pages/master/Institute"));
const OmrStudent = lazy(() => import("@/pages/users/OmrStudent"));
const PaidStudent = lazy(() => import("@/pages/users/PaidStudent"));
const ProgressReport = lazy(() => import("@/pages/reports/ProgressReport"));
const PromotionSetup = lazy(() => import("@/pages/settings/PromotionSetup"));
const Qualification = lazy(() => import("@/pages/settings/Qualification"));
const Role = lazy(() => import("@/pages/settings/RoleSettings"));
const Stream = lazy(() => import("@/pages/settings/Stream"));
const Subject = lazy(() => import("@/pages/settings/Subject"));
const SupportCategory = lazy(() => import("@/pages/support/SupportCategory"));
const UnitChapter = lazy(() => import("@/pages/settings/UnitChapter"));

// Master / Support / Activities
const MasterHierarchy = lazy(() => import("@/pages/master/MasterHierarchy"));
const VerticalManage = lazy(() => import("@/pages/master/VerticalManage"));
const Coupon = lazy(() => import("@/pages/master/Coupon"));
const Faq = lazy(() => import("@/pages/master/Faq"));
const activities = lazy(() => import("@/pages/activities/Chat"));
const LiveActivites = lazy(() => import("@/pages/activities/LiveActivities"));
const Result = lazy(() => import("@/pages/results/Result"));
const ReferalMobileSupport = lazy(
  () => import("@/pages/support/ReferalMobileSupport")
);
const SupportMobile = lazy(() => import("@/pages/support/SupportMobile"));
const SupportWhatsapp = lazy(() => import("@/pages/support/SupportWhatsapp"));
const SupportMail = lazy(() => import("@/pages/support/SupportMail"));
const SupportAi = lazy(() => import("@/pages/support/SupportAi"));

// Admin routes (Moved to features)
const AdminList = lazy(() => import("@/pages/users/AdminList"));
const Users = lazy(() => import("@/pages/users/Users"));
const Roles = lazy(() => import("@/pages/settings/Roles"));
const HierarchyManagement = lazy(
  () => import("@/pages/master/HierarchyManagement")
);
const Courses = lazy(() => import("@/pages/courses/CoursesList"));
const Categories = lazy(() => import("@/pages/master/Categories"));
const Assessments = lazy(() => import("@/pages/courses/Assessments"));
const AccessControl = lazy(() => import("@/pages/users/AccessControl"));
const AuditLogs = lazy(() => import("@/pages/reports/AuditLogs"));
const Reports = lazy(() => import("@/pages/reports/Reports"));
const SystemSettings = lazy(() => import("@/pages/settings/SystemSettings"));

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
  //Master
  {
    path: "/settings/master-hierarchy",
    element: MasterHierarchy,
    roles: ["super_admin"],
  },
  {
    path: "/settings/master-hierarchy-management",
    element: HierarchyManagement,
    roles: ["super_admin"],
  },
  // title: "Vertical Manage",
  {
    path: "/settings/vertical-manage",
    element: VerticalManage,
    roles: ["super_admin"],
  },
  // /settings/institute
  {
    path: "/settings/institute",
    element: Institute,
    roles: ["super_admin"],
  },
  // /settings/faq
  {
    path: "/settings/faq",
    element: Faq,
    roles: ["super_admin"],
  },
  // /settings/coupon
  {
    path: "/settings/coupon",
    element: Coupon,
    roles: ["super_admin"],
  },
  //activities
  {
    path: "/settings/chat",
    element: activities,
    roles: ["super_admin"],
  },
  {
    path: "/settings/live-activity",
    element: LiveActivites,
    roles: ["super_admin"],
  },

  {
    path: "/settings/progress-report",
    element: ProgressReport,
    roles: ["super_admin"],
  },
  //result
  {
    path: "/result",
    element: Result,
    roles: ["super_admin"],
  },
  {
    path: "/referal-mobile-support",
    element: ReferalMobileSupport,
    roles: ["super_admin"],
  },
  // support
  // childrens
  // -token details
  // -support mobile
  // support whatsapp
  // -support mail
  // support ai
  {
    path: "/settings/token-details",
    element: TokenDetails,
    roles: ["super_admin"],
  },
  {
    path: "/settings/support-mobile",
    element: SupportMobile,
    roles: ["super_admin"],
  },
  {
    path: "/settings/support-mail",
    element: SupportMail,
    roles: ["super_admin"],
  },
  {
    path: "/settings/support-whatsapp",
    element: SupportWhatsapp,
    roles: ["super_admin"],
  },
  {
    path: "/settings/support-ai",
    element: SupportAi, // Fixed typo in previous file content which mapped SupportAi to SupportMail
    roles: ["super_admin"],
  },
  // Fallback
  {
    path: "*",
    element: NotFound,
    public: true,
  },
];
