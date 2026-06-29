import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { fetchMe, login, logout } from "@/features/auth/api/staff-auth";
import type { LoginInput, StaffProfile } from "@/features/auth/api/types";
import { staffStorage } from "@/features/auth/storage/staff-storage";
import { setAuthLostListener } from "@/shared/api/client";

export type AuthStatus = "loading" | "unauthenticated" | "authenticated";

type AuthContextValue = {
  status: AuthStatus;
  staff: StaffProfile | null;
  bootstrapped: boolean;
  loginMutation: ReturnType<typeof useLoginMutation>;
  logoutMutation: ReturnType<typeof useLogoutMutation>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const ME_KEY = ["staff", "me"] as const;

function useLoginMutation(setHasTokens: (v: boolean) => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      setHasTokens(true);
      await qc.invalidateQueries({ queryKey: ME_KEY });
    },
  });
}

function useLogoutMutation(setHasTokens: (v: boolean) => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      setHasTokens(false);
      qc.removeQueries({ queryKey: ME_KEY });
    },
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const [bootstrapped, setBootstrapped] = useState(false);
  const [hasTokens, setHasTokens] = useState(false);

  useEffect(() => {
    let alive = true;
    void staffStorage.load().then((tokens) => {
      if (!alive) return;
      setHasTokens(!!tokens);
      setBootstrapped(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    setAuthLostListener(() => {
      setHasTokens(false);
      qc.removeQueries({ queryKey: ME_KEY });
    });
    return () => setAuthLostListener(null);
  }, [qc]);

  const meQuery = useQuery({
    queryKey: ME_KEY,
    queryFn: fetchMe,
    enabled: bootstrapped && hasTokens,
    retry: false,
    staleTime: 60_000,
  });

  const loginMutation = useLoginMutation(setHasTokens);
  const logoutMutation = useLogoutMutation(setHasTokens);

  const status: AuthStatus = useMemo(() => {
    if (!bootstrapped) return "loading";
    if (!hasTokens) return "unauthenticated";
    if (meQuery.isFetching && !meQuery.isSuccess) return "loading";
    if (meQuery.isSuccess) return "authenticated";
    if (meQuery.isError) return "unauthenticated";
    return "loading";
  }, [
    bootstrapped,
    hasTokens,
    meQuery.isFetching,
    meQuery.isSuccess,
    meQuery.isError,
  ]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      staff: meQuery.data ?? null,
      bootstrapped,
      loginMutation,
      logoutMutation,
    }),
    [status, meQuery.data, bootstrapped, loginMutation, logoutMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export type { LoginInput, StaffProfile };
