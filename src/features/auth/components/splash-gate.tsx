import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/providers/auth-provider";
import { LoadingScreen } from "@/shared/ui/loading-screen";

export function SplashGate({ children }: { children: ReactNode }) {
  const { bootstrapped } = useAuth();
  if (!bootstrapped) {
    return <LoadingScreen>A carregar…</LoadingScreen>;
  }
  return children;
}
