import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createSseParser,
  openTransactionEventsStream,
  type TransactionUpdatedEvent,
} from "./transaction-events";

const event: TransactionUpdatedEvent = {
  id: "11111111-1111-1111-1111-111111111111",
  refCode: "MND-0001",
  status: "proposta",
  updatedAt: "2026-08-01T12:00:00.000Z",
};

const frame = `event: transaction.updated\ndata: ${JSON.stringify(event)}\n\n`;

describe("createSseParser", () => {
  it("parses a complete frame with event name and data", () => {
    const received: Array<[string | null, string]> = [];
    const parser = createSseParser((name, data) => received.push([name, data]));

    parser(frame);

    expect(received).toEqual([["transaction.updated", JSON.stringify(event)]]);
  });

  it("parses a frame split across chunks", () => {
    const received: Array<[string | null, string]> = [];
    const parser = createSseParser((name, data) => received.push([name, data]));

    parser("event: transaction.upd");
    parser(`ated\ndata: ${JSON.stringify(event)}\n\n`);

    expect(received).toEqual([["transaction.updated", JSON.stringify(event)]]);
  });

  it("parses multiple frames from a single chunk", () => {
    const received: Array<[string | null, string]> = [];
    const parser = createSseParser((name, data) => received.push([name, data]));

    parser(frame + frame);

    expect(received).toHaveLength(2);
    expect(received[1][0]).toBe("transaction.updated");
  });

  it("ignores keepalive comment frames", () => {
    const received: Array<[string | null, string]> = [];
    const parser = createSseParser((name, data) => received.push([name, data]));

    parser(": ping\n\n");

    expect(received).toEqual([]);
  });
});

describe("openTransactionEventsStream", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function streamWith(text: string): Response {
    return new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(text));
          controller.close();
        },
      }),
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );
  }

  it("connects with the staff bearer token and forwards parsed events", async () => {
    const fetchMock = vi.fn().mockResolvedValue(streamWith(frame));
    vi.stubGlobal("fetch", fetchMock);

    const received: TransactionUpdatedEvent[] = [];
    await openTransactionEventsStream({
      token: "staff-token",
      signal: new AbortController().signal,
      onEvent: (e) => received.push(e),
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/staff/transactions/events",
      expect.objectContaining({
        headers: { Authorization: "Bearer staff-token" },
      })
    );
    expect(received).toEqual([event]);
  });

  it("throws ApiError when the server rejects the connection (401)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 401 }))
    );

    await expect(
      openTransactionEventsStream({
        token: "bad-token",
        signal: new AbortController().signal,
        onEvent: () => {},
      })
    ).rejects.toMatchObject({ status: 401 });
  });
});
