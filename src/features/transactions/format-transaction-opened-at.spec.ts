import { describe, expect, it } from "vitest";

import { formatTransactionOpenedAt } from "./format-transaction-opened-at";

describe("formatTransactionOpenedAt", () => {
  const now = new Date("2026-07-09T15:00:00.000Z");

  it("formats same-day timestamps as Hoje", () => {
    expect(formatTransactionOpenedAt("2026-07-09T13:32:00.000Z", now)).toMatch(
      /^Hoje · \d{2}:\d{2}$/
    );
  });

  it("formats previous-day timestamps as Ontem", () => {
    expect(formatTransactionOpenedAt("2026-07-08T18:22:00.000Z", now)).toMatch(
      /^Ontem · \d{2}:\d{2}$/
    );
  });

  it("formats older timestamps with date and time", () => {
    expect(formatTransactionOpenedAt("2026-07-05T10:00:00.000Z", now)).toMatch(
      /^\d{2}\/\d{2} · \d{2}:\d{2}$/
    );
  });
});
