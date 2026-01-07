import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/layout";
import { Suspense } from "react";

import { routes } from "@/routes";
import AuthGate from "./utils/Auth-gate/AuthGate";

const queryClient = new QueryClient();

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />

//           <BrowserRouter>
//             <Routes>
//               {/* ===== PUBLIC ROUTES ===== */}
//               {routes
//                 .filter((route) => route.public)
//                 .map((route) => (
//                   <Route
//                     key={route.path}
//                     path={route.path}
//                     element={<route.element />}
//                   />
//                 ))}

//               {/* ===== PROTECTED DASHBOARD ===== */}
//               <Route
//                 element={
//                   <ProtectedRoute>
//                     <MainLayout />
//                   </ProtectedRoute>
//                 }
//               >
//                 {routes
//                   .filter((route) => !route.public)
//                   .map((route) => (
//                     <Route
//                       key={route.path}
//                       path={route.path}
//                       element={
//                         <Suspense
//                           fallback={<div className="p-4">Loading...</div>}
//                         >
//                           <route.element />
//                         </Suspense>
//                       }
//                     />
//                   ))}

//                 <Route
//                   path="/"
//                   element={<Navigate to="/dashboard" replace />}
//                 />
//               </Route>
//             </Routes>
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// };
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

