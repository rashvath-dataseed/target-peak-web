import { LucideIcon } from "lucide-react";
import {
  Key,
  Bug,
  Layers,
  AlertTriangle,
  FileBarChart,
  HelpCircle,
  Book,
  ListTree,
  School,
  GraduationCap,
  ClipboardCheck,
  Video,
  Award,
  Users,
  ShieldCheck,
  Building2,
  Database,
  UserCheck,
  LineChart,
  IndianRupee,
  Calendar,
  ScanLine,
  Clock,
  CreditCard,
  Megaphone,
} from "lucide-react";


export interface ModuleItem {
  title: string;
  path: string;
  icon: LucideIcon;
}
export const SUPER_ADMIN_MODULES: ModuleItem[] = [
  { title: "TOKEN DETAILS", path: "/dashboard/token-details", icon: Key },
  {
    title: "APPLICATION ERROR",
    path: "/dashboard/application-error",
    icon: Bug,
  },
  { title: "STREAM", path: "/dashboard/stream", icon: Layers },
  {
    title: "QUESTIONS ERROR",
    path: "/dashboard/questions-error",
    icon: AlertTriangle,
  },
  {
    title: "JIO OFFER REPORT",
    path: "/dashboard/jio-offer-report",
    icon: FileBarChart,
  },
  {
    title: "SUPPORT CATEGORY",
    path: "/dashboard/support-category",
    icon: HelpCircle,
  },

  { title: "SUBJECT", path: "/dashboard/subject", icon: Book },
  { title: "UNIT / CHAPTER", path: "/dashboard/unit-chapter", icon: ListTree },
  { title: "INSTITUTE", path: "/dashboard/institute", icon: School },
  { title: "COURSE", path: "/dashboard/course", icon: GraduationCap },
  { title: "EXAM", path: "/dashboard/exam", icon: ClipboardCheck },
  { title: "E-CLASSES", path: "/dashboard/e-classes", icon: Video },

  { title: "QUALIFICATION", path: "/dashboard/qualification", icon: Award },
  { title: "USER", path: "/dashboard/user", icon: Users },
  { title: "ROLE", path: "/dashboard/role", icon: ShieldCheck },
  { title: "SANSTHA", path: "/dashboard/sanstha", icon: Building2 },
  { title: "ALL DATA", path: "/dashboard/all-data", icon: Database },
  {
    title: "APP REGISTERED STUDENT",
    path: "/dashboard/app-registered-student",
    icon: UserCheck,
  },

  {
    title: "PROGRESS REPORT",
    path: "/dashboard/progress-report",
    icon: LineChart,
  },
  { title: "PAID STUDENT", path: "/dashboard/paid-student", icon: IndianRupee },
  { title: "EVENTS", path: "/dashboard/events", icon: Calendar },
  { title: "OMR STUDENT", path: "/dashboard/omr-student", icon: ScanLine },
  { title: "EXPIRED COURSE", path: "/dashboard/expired-course", icon: Clock },
  {
    title: "FAILED / PENDING PAYMENT",
    path: "/dashboard/failed-payment",
    icon: CreditCard,
  },

  {
    title: "PROMOTION SETUP",
    path: "/dashboard/promotion-setup",
    icon: Megaphone,
  },
];