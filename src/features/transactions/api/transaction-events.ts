import { ApiError } from "@/shared/api/api-error";
import { API_BASE_URL } from "@/shared/api/client";

export type TransactionUpdatedEvent = {
  id: string;
  refCode: string;
  status: string;
  updatedAt: string;
};

/**
 * Incremental SSE frame parser. Keeps partial frames in a buffer so frames
 * split across network chunks are still decoded correctly.
 */
export function createSseParser(
  onFrame: (eventName: string | null, data: string) => void
): (chunk: string) => void {
  let buffer = "";
  return (chunk: string): void => {
    buffer += chunk;
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";
    for (const raw of frames) {
      let eventName: string | null = null;
      let data = "";
      for (const line of raw.split("\n")) {
        if (line.startsWith("event:")) {
          eventName = line.slice("event:".length).trim();
        } else if (line.startsWith("data:")) {
          data += line.slice("data:".length).trim();
        }
      }
      if (eventName !== null || data !== "") {
        onFrame(eventName, data);
      }
    }
  };
}

/**
 * Opens the staff SSE stream. Resolves when the stream ends (server close);
 * rejects on HTTP errors so callers can reconnect with backoff.
 *
 * The native EventSource cannot send an Authorization header, so we use a
 * fetch stream instead — the staff token never travels in the query string.
 */
export async function openTransactionEventsStream(options: {
  token: string;
  signal: AbortSignal;
  onEvent: (event: TransactionUpdatedEvent) => void;
}): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/staff/transactions/events`, {
    headers: { Authorization: `Bearer ${options.token}` },
    signal: options.signal,
  });
  if (!res.ok || !res.body) {
    throw new ApiError(`Ligação de eventos falhou (${res.status})`, res.status);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const parser = createSseParser((eventName, data) => {
    if (eventName === "transaction.updated" && data) {
      options.onEvent(JSON.parse(data) as TransactionUpdatedEvent);
    }
  });

  for (;;) {
    const { value, done } = await reader.read();
    if (done) {
      return;
    }
    parser(decoder.decode(value, { stream: true }));
  }
}
