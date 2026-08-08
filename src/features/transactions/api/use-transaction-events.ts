import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { staffStorage } from "@/features/auth/storage/staff-storage";
import { openTransactionEventsStream } from "./transaction-events";

const INITIAL_RETRY_MS = 1_000;
const MAX_RETRY_MS = 30_000;

/**
 * Keeps the staff transaction queries fresh by streaming transaction.updated
 * events from the api service (SSE). Reconnects with exponential backoff;
 * the access token is re-read from storage on every connection, so a refresh
 * performed by the axios interceptor is picked up automatically.
 */
export function useTransactionEvents(): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let retryMs = INITIAL_RETRY_MS;

    function scheduleReconnect(): void {
      if (cancelled) return;
      timer = setTimeout(() => {
        void connect();
      }, retryMs);
      retryMs = Math.min(retryMs * 2, MAX_RETRY_MS);
    }

    async function connect(): Promise<void> {
      if (cancelled) return;
      const tokens = await staffStorage.load();
      if (!tokens?.accessToken || cancelled) return;

      try {
        await openTransactionEventsStream({
          token: tokens.accessToken,
          signal: controller.signal,
          onEvent: (event) => {
            void queryClient.invalidateQueries({
              queryKey: ["staff", "transactions"],
            });
            void queryClient.invalidateQueries({
              queryKey: ["staff", "transactions", event.id],
            });
          },
        });
        scheduleReconnect();
      } catch {
        if (cancelled || controller.signal.aborted) return;
        scheduleReconnect();
      }
    }

    void connect();

    return () => {
      cancelled = true;
      controller.abort();
      if (timer) clearTimeout(timer);
    };
  }, [queryClient]);
}
