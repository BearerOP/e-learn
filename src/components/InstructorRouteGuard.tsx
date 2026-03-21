import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

interface InstructorRouteGuardProps {
  children: React.ReactNode;
}

/**
 * Restricts instructor routes to users with role "both" (teachers).
 * Students are redirected to home. Unauthenticated users go to login.
 */
export function InstructorRouteGuard({ children }: InstructorRouteGuardProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "both") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
