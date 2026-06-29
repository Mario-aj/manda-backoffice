import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { useState } from "react";

import { createQueryClient } from "@/app/query-client";
import { router } from "@/app/router";
import { AuthProvider } from "@/features/auth/providers/auth-provider";
import { SplashGate } from "@/features/auth/components/splash-gate";

export function App() {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SplashGate>
          <RouterProvider router={router} />
        </SplashGate>
      </AuthProvider>
    </QueryClientProvider>
  );
}
