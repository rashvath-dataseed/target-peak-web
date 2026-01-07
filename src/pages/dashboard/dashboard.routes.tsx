import { lazy } from "react";
import { SUPER_ADMIN_MODULES } from "@/constants/modules";

const DashboardHome = lazy(() => import("@/pages/dashboard/Dashboard"));

const pageMap: Record<string, React.LazyExoticComponent<React.FC>> = {
  "/dashboard/token-details": lazy(
    () => import("@/pages/dashboard/TokenDetails")
  ),
  "/dashboard/application-error": lazy(
    () => import("@/pages/common/ApplicationError")
  ),
  "/dashboard/stream": lazy(() => import("@/pages/settings/Stream")),
  "/dashboard/questions-error": lazy(
    () => import("@/pages/common/QuestionsError")
  ),
  "/dashboard/jio-offer-report": lazy(
    () => import("@/pages/reports/JioOfferReport")
  ),
  "/dashboard/support-category": lazy(
    () => import("@/pages/support/SupportCategory")
  ),
  "/dashboard/subject": lazy(() => import("@/pages/settings/Subject")),
  "/dashboard/unit-chapter": lazy(() => import("@/pages/settings/UnitChapter")),
  "/dashboard/institute": lazy(() => import("@/pages/master/Institute")),
  "/dashboard/course": lazy(() => import("@/pages/courses/CourseSettings")),
  "/dashboard/exam": lazy(() => import("@/pages/courses/Exam")),
  "/dashboard/e-classes": lazy(() => import("@/pages/courses/EClasses")),
  "/dashboard/qualification": lazy(
    () => import("@/pages/settings/Qualification")
  ),
  "/dashboard/user": lazy(() => import("@/pages/users/UserSettings")),
  "/dashboard/role": lazy(() => import("@/pages/settings/RoleSettings")),
  "/dashboard/sanstha": lazy(() => import("@/pages/master/Sanstha")),
  "/dashboard/all-data": lazy(() => import("@/pages/users/AllData")),
  "/dashboard/app-registered-student": lazy(
    () => import("@/pages/users/AppRegisteredStudent")
  ),
  "/dashboard/progress-report": lazy(
    () => import("@/pages/reports/ProgressReport")
  ),
  "/dashboard/paid-student": lazy(() => import("@/pages/users/PaidStudent")),
  "/dashboard/events": lazy(() => import("@/pages/settings/Events")),
  "/dashboard/omr-student": lazy(() => import("@/pages/users/OmrStudent")),
  "/dashboard/expired-course": lazy(
    () => import("@/pages/courses/ExpiredCourse")
  ),
  "/dashboard/failed-payment": lazy(
    () => import("@/pages/users/FailedPayment")
  ),
  "/dashboard/promotion-setup": lazy(
    () => import("@/pages/settings/PromotionSetup")
  ),
};

const moduleRoutes = SUPER_ADMIN_MODULES.filter(
  (module) => pageMap[module.path]
).map((module) => {
  const Component = pageMap[module.path];

  return {
    path: module.path,
    element: Component,
    roles: ["super_admin"],
  };
});

export const dashboardRoutes = [
  {
    path: "/dashboard",
    element: DashboardHome,
    roles: ["super_admin", "admin", "hierarchy_user"],
  },
  ...moduleRoutes,
];
