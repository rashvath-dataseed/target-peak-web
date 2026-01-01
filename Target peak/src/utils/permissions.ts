// import { UserRole } from '@/types/auth.types';

// // Role hierarchy check
// export const hasPermission = (userRole: UserRole, requiredRole: UserRole): boolean => {
//   const roleHierarchy: Record<UserRole, number> = {
//     super_admin: 3,
//     admin: 2,
//     hierarchy_user: 1,
//   };

//   return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
// };

// export interface NavigationChild {
//   id: string;
//   label: string;
//   path: string;
//   roles: UserRole[];
// }

// export interface NavigationItem {
//   id: string;
//   label: string;
//   icon: string;
//   path?: string;
//   roles: UserRole[];
//   children?: NavigationChild[];
// }

// // Define navigation items with role-based access and accordion structure
// export const navigationItems: NavigationItem[] = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     icon: "LayoutDashboard",
//     path: "/dashboard",
//     roles: ["super_admin", "admin", "hierarchy_user"],
//   },
//   {
//     id: "user-management",
//     label: "User Management",
//     icon: "Users",
//     roles: ["super_admin", "admin"],
//     children: [
//       {
//         id: "admins",
//         label: "Manage Admins",
//         path: "/admins",
//         roles: ["super_admin"],
//       },
//       {
//         id: "users",
//         label: "All Users",
//         path: "/users",
//         roles: ["super_admin", "admin"],
//       },
//       {
//         id: "roles",
//         label: "Roles & Permissions",
//         path: "/roles",
//         roles: ["super_admin"],
//       },
//     ],
//   },
//   {
//     id: "hierarchy",
//     label: "Hierarchy Management",
//     icon: "GitBranch",
//     path: "/hierarchy",
//     roles: ["super_admin"],
//   },
//   {
//     id: "course-management",
//     label: "Course Management",
//     icon: "BookOpen",
//     roles: ["super_admin", "admin", "hierarchy_user"],
//     children: [
//       {
//         id: "courses",
//         label: "All Courses",
//         path: "/courses",
//         roles: ["super_admin", "admin", "hierarchy_user"],
//       },
//       {
//         id: "categories",
//         label: "Categories",
//         path: "/categories",
//         roles: ["super_admin", "admin"],
//       },
//       {
//         id: "assessments",
//         label: "Assessments",
//         path: "/assessments",
//         roles: ["super_admin", "admin"],
//       },
//     ],
//   },
//   {
//     id: "access",
//     label: "Access Control",
//     icon: "Shield",
//     path: "/access-control",
//     roles: ["admin"],
//   },
//   {
//     id: "reports",
//     label: "Reports & Analytics",
//     icon: "BarChart3",
//     path: "/reports",
//     roles: ["super_admin", "admin"],
//   },
//   {
//     id: "settings",
//     label: "Settings",
//     icon: "Settings",
//     roles: ["super_admin"],
//     children: [
//       {
//         id: "system-settings",
//         label: "System Settings",
//         path: "/settings",
//         roles: ["super_admin"],
//       },
//       {
//         id: "audit-logs",
//         label: "Audit Logs",
//         path: "/audit-logs",
//         roles: ["super_admin"],
//       },
//     ],
//   },
// ];

// export const getNavigationForRole = (role: UserRole): NavigationItem[] => {
//   return navigationItems
//     .filter(item => item.roles.includes(role))
//     .map(item => {
//       if (item.children) {
//         return {
//           ...item,
//           children: item.children.filter(child => child.roles.includes(role)),
//         };
//       }
//       return item;
//     });
// };

// export const canAccessRoute = (role: UserRole, path: string): boolean => {
//   for (const item of navigationItems) {
//     if (item.path === path && item.roles.includes(role)) {
//       return true;
//     }
//     if (item.children) {
//       const child = item.children.find(c => c.path === path);
//       if (child && child.roles.includes(role)) {
//         return true;
//       }
//     }
//   }
//   return false;
// };
