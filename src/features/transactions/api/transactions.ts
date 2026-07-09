import { api } from "@/shared/api/client";
import type {
  StaffTransactionDetailDto,
  TransactionSummaryDto,
} from "@/shared/api/generated";

export type { StaffTransactionDetailDto, TransactionSummaryDto };

export type StaffTransactionFilters = {
  status?: string;
  from?: string;
  to?: string;
};

export async function fetchStaffTransactions(
  filters: StaffTransactionFilters = {}
): Promise<TransactionSummaryDto[]> {
  const params: Record<string, string> = {};
  if (filters.status) params.status = filters.status;
  if (filters.from) params.from = filters.from;
  if (filters.to) params.to = filters.to;

  const res = await api.get<TransactionSummaryDto[]>("/staff/transactions", {
    params: Object.keys(params).length ? params : undefined,
  });
  return res.data;
}

export async function fetchStaffTransaction(
  id: string
): Promise<StaffTransactionDetailDto> {
  const res = await api.get<StaffTransactionDetailDto>(
    `/staff/transactions/${id}`
  );
  return res.data;
}

export async function confirmTransactionEscrow(
  id: string
): Promise<TransactionSummaryDto> {
  const res = await api.post<TransactionSummaryDto>(
    `/staff/transactions/${id}/confirm-escrow`
  );
  return res.data;
}

export async function markTransactionPayout(
  id: string
): Promise<TransactionSummaryDto> {
  const res = await api.post<TransactionSummaryDto>(
    `/staff/transactions/${id}/mark-payout`
  );
  return res.data;
}

export async function fetchComprovativoReadUrl(
  transactionId: string,
  uploadId: string
): Promise<string> {
  const res = await api.get<{ readUrl: string }>(
    `/staff/transactions/${transactionId}/comprovativos/${uploadId}/read-url`
  );
  return res.data.readUrl;
}
