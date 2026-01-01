import { useAuth } from "@/hooks/useAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MainLayout } from "@/components/layout";
import { Suspense } from "react";
import { routes } from "@/routes";
import { PublicRoute } from "@/components/PublicRoute";


const AuthGate = () => {
  const { isLoading } = useAuth();

  // ⛔ CRITICAL: block router until cookies are checked
  if (isLoading) {
    return <div className="p-4">Initializing session…</div>;
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          {routes
            .filter((route) => route.public)
            .map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PublicRoute>
                    <route.element />
                  </PublicRoute>
                }
              />
            ))}

          {/* ===== PROTECTED ROUTES ===== */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {routes
              .filter((route) => !route.public)
              .map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={<div className="p-4">Loading...</div>}>
                      <route.element />
                    </Suspense>
                  }
                />
              ))}

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default AuthGate;
