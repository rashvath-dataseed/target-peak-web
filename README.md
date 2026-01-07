# Dashboard Module Management Guide

This guide explains how to add new sections/modules to the dashboard and properly configure routing.

## 🚀 Quick Start: Adding a New Dashboard Module

### Step 1: Create the Module Component

Create your module component in the appropriate folder:

**For data/reporting modules:**
```bash
# Create in src/pages/modules/
touch src/pages/modules/MyNewModule.tsx
```

**For dashboard-specific pages:**
```bash
# Create in src/pages/dashboard/
touch src/pages/dashboard/MyDashboardPage.tsx
```

### Step 2: Add Module to Constants

Edit `src/constants/modules.ts`:

```typescript
// Add your module to the SUPER_ADMIN_MODULES array
export const SUPER_ADMIN_MODULES: ModuleItem[] = [
  // ... existing modules
  {
    title: "MY NEW MODULE",
    path: "/dashboard/my-new-module",
    icon: MyIcon, // Import from lucide-react
  },
];
```

### Step 3: Export from Module Index

Add to `src/pages/modules/index.ts`:

```typescript
export { default as MyNewModule } from './MyNewModule';
```

### Step 4: Update Navigation (Optional)

If you want it in the sidebar navigation, edit `src/config/navigation.tsx`:

```typescript
// Add to MODULE_COMPONENTS
const MODULE_COMPONENTS: Record<string, () => Promise<{ default: ComponentType<unknown> }>> = {
  // ... existing
  "MY NEW MODULE": () => import("@/pages/modules/MyNewModule"),
};
```

## 📁 Detailed Folder Structure

```
src/
├── pages/                    # All page components organized by feature
│   ├── auth/                 # Authentication pages (Login, AccessDenied, NotFound)
│   ├── admin/                # Admin management pages
│   ├── dashboard/            # Dashboard-specific pages
│   └── modules/              # Dynamic data/reporting modules
├── routes/                   # Centralized routing configuration
├── constants/                # Application constants (modules, etc.)
├── config/                   # Configuration files (navigation, etc.)
└── components/               # Reusable UI components
```

## 🔧 Module Types

### 1. Dashboard Modules (Auto-routed)
- **Location:** `src/pages/modules/`
- **Routing:** Automatic via `dashboard.routes.tsx`
- **Navigation:** Appears in sidebar under "Modules"
- **Use case:** Data tables, reports, CRUD operations

### 2. Dashboard Pages (Manual routing)
- **Location:** `src/pages/dashboard/`
- **Routing:** Manual in `src/routes/index.ts`
- **Navigation:** Custom navigation setup
- **Use case:** Custom dashboard views, special pages

### 3. Admin Pages (Manual routing)
- **Location:** `src/pages/admin/`
- **Routing:** Manual in `src/routes/index.ts`
- **Navigation:** Custom navigation setup
- **Use case:** User management, system settings

## 📋 Step-by-Step: Adding a Dashboard Module

### Example: Adding a "User Analytics" Module

1. **Create Component:**
```bash
touch src/pages/modules/UserAnalytics.tsx
```

2. **Implement Component:**
```tsx
import React from 'react';

const UserAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">User Analytics</h2>
        <p className="text-muted-foreground">Analyze user behavior and metrics</p>
      </div>
      {/* Your component content */}
    </div>
  );
};

export default UserAnalytics;
```

3. **Add to Constants:**
```typescript
// In src/constants/modules.ts
import { BarChart3 } from "lucide-react";

export const SUPER_ADMIN_MODULES: ModuleItem[] = [
  // ... existing modules
  {
    title: "USER ANALYTICS",
    path: "/dashboard/user-analytics",
    icon: BarChart3,
  },
];
```

4. **Export from Index:**
```typescript
// In src/pages/modules/index.ts
export { default as UserAnalytics } from './UserAnalytics';
```

5. **Update Navigation (if needed):**
```typescript
// In src/config/navigation.tsx
"USER ANALYTICS": () => import("@/pages/modules/UserAnalytics"),
```

## 🎯 Route Mapping Details

### Automatic Routing (Dashboard Modules)
- Modules in `SUPER_ADMIN_MODULES` are automatically routed
- Path format: `/dashboard/{module-path}`
- Lazy-loaded for performance
- Role-based access control

### Manual Routing (Custom Pages)
For pages that need custom routing logic:

1. **Add to Routes:**
```typescript
// In src/routes/index.ts
const MyCustomPage = lazy(() => import("@/pages/dashboard/MyCustomPage"));

export const routes = [
  // ... existing routes
  {
    path: "/dashboard/my-custom-page",
    element: MyCustomPage,
    roles: ["super_admin"],
  },
];
```

2. **Add Navigation:**
```typescript
// In src/config/navigation.tsx
{
  id: "my-custom-page",
  title: "My Custom Page",
  path: "/dashboard/my-custom-page",
  icon: MyIcon,
  component: lazy(() => import("@/pages/dashboard/MyCustomPage")),
  roles: ["super_admin"],
}
```

## 🔐 Role-Based Access

### Available Roles
- `super_admin`: Full access
- `admin`: Limited admin access
- `hierarchy_user`: Basic access

### Setting Roles
```typescript
// In routes or navigation config
{
  path: "/my-route",
  element: MyComponent,
  roles: ["super_admin", "admin"], // Multiple roles allowed
}
```

## 🎨 Best Practices


### Naming Conventions
- **Files:** PascalCase (UserAnalytics.tsx)
- **Paths:** kebab-case (/dashboard/user-analytics)
- **Titles:** UPPER_CASE for modules ("USER ANALYTICS")

### Performance Tips
- Use lazy loading for all route components
- Keep components focused and reusable
- Use proper TypeScript types
- Follow the established folder structure

## 🐛 Troubleshooting

### Module Not Appearing
1. Check if added to `SUPER_ADMIN_MODULES`
2. Verify export in `pages/modules/index.ts`
3. Ensure component exists and exports default

### Route Not Working
1. Check path format in constants
2. Verify component import path
3. Check browser console for errors

### Navigation Issues
1. Ensure navigation config is updated
2. Check role permissions
3. Verify component lazy loading


If you encounter issues:
1. Check the build: `npm run build`
2. Run linting: `npm run lint`
3. Verify all imports and exports
4. Check TypeScript errors in your IDE
