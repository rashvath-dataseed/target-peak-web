import { lazy } from "react";
import { SUPER_ADMIN_MODULES } from "@/constants/modules";

const DashboardHome = lazy(() => import("@/pages/dashboard/Dashboard"));

const pageMap: Record<string, React.LazyExoticComponent<React.FC>> = {
  "/dashboard/token-details": lazy(
    () => import("@/pages/dashboard/TokenDetails")
  ),
  "/dashboard/application-error": lazy(
    () => import("@/pages/modules/ApplicationError")
  ),
  "/dashboard/stream": lazy(() => import("@/pages/modules/Stream")),
  "/dashboard/questions-error": lazy(
    () => import("@/pages/modules/QuestionsError")
  ),
  "/dashboard/jio-offer-report": lazy(
    () => import("@/pages/modules/JioOfferReport")
  ),
  "/dashboard/support-category": lazy(
    () => import("@/pages/modules/SupportCategory")
  ),
  "/dashboard/subject": lazy(() => import("@/pages/modules/Subject")),
  "/dashboard/unit-chapter": lazy(
    () => import("@/pages/modules/UnitChapter")
  ),
  "/dashboard/institute": lazy(() => import("@/pages/modules/Institute")),
  "/dashboard/course": lazy(() => import("@/pages/modules/Course")),
  "/dashboard/exam": lazy(() => import("@/pages/modules/Exam")),
  "/dashboard/e-classes": lazy(() => import("@/pages/modules/EClasses")),
  "/dashboard/qualification": lazy(
    () => import("@/pages/modules/Qualification")
  ),
  "/dashboard/user": lazy(() => import("@/pages/modules/User")),
  "/dashboard/role": lazy(() => import("@/pages/modules/Role")),
  "/dashboard/sanstha": lazy(() => import("@/pages/modules/Sanstha")),
  "/dashboard/all-data": lazy(() => import("@/pages/modules/AllData")),
  "/dashboard/app-registered-student": lazy(
    () => import("@/pages/modules/AppRegisteredStudent")
  ),
  "/dashboard/progress-report": lazy(
    () => import("@/pages/modules/ProgressReport")
  ),
  "/dashboard/paid-student": lazy(
    () => import("@/pages/modules/PaidStudent")
  ),
  "/dashboard/events": lazy(() => import("@/pages/modules/Events")),
  "/dashboard/omr-student": lazy(
    () => import("@/pages/modules/OmrStudent")
  ),
  "/dashboard/expired-course": lazy(
    () => import("@/pages/modules/ExpiredCourse")
  ),
  "/dashboard/failed-payment": lazy(
    () => import("@/pages/modules/FailedPayment")
  ),
  "/dashboard/promotion-setup": lazy(
    () => import("@/pages/modules/PromotionSetup")
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
