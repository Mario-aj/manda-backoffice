import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/providers/auth-provider";
import { LoadingScreen } from "@/shared/ui/loading-screen";

export function AuthGuard() {
  const { status } = useAuth();
  if (status === "loading") {
    return <LoadingScreen>A verificar sessão…</LoadingScreen>;
  }
  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export function GuestGuard() {
  const { status } = useAuth();
  if (status === "loading") {
    return <LoadingScreen>A carregar…</LoadingScreen>;
  }
  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
