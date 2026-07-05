import { api } from "@/shared/api/client";
import type {
  StaffTransactionDetailDto,
  TransactionSummaryDto,
} from "@/shared/api/generated";

export type { StaffTransactionDetailDto, TransactionSummaryDto };

export async function fetchStaffTransactions(
  status?: string
): Promise<TransactionSummaryDto[]> {
  const res = await api.get<TransactionSummaryDto[]>("/staff/transactions", {
    params: status ? { status } : undefined,
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

export async function fetchComprovativoReadUrl(
  transactionId: string,
  uploadId: string
): Promise<string> {
  const res = await api.get<{ readUrl: string }>(
    `/staff/transactions/${transactionId}/comprovativos/${uploadId}/read-url`
  );
  return res.data.readUrl;
}
