export function formatTransactionOpenedAt(
  iso: string,
  now: Date = new Date()
): string {
  const date = new Date(iso);
  const time = date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfToday) {
    return `Hoje · ${time}`;
  }

  if (date >= startOfYesterday) {
    return `Ontem · ${time}`;
  }

  const datePart = date.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
  });

  return `${datePart} · ${time}`;
}
