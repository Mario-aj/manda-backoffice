import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import {
  confirmTransactionEscrow,
  fetchComprovativoReadUrl,
  fetchStaffTransaction,
} from "@/features/transactions/api/transactions";
import { PrimaryButton } from "@/shared/ui/primary-button";
import { ApiError } from "@/shared/api/api-error";
import styles from "./transactions.module.css";

function formatKz(value: number): string {
  return `${value.toLocaleString("pt-PT")} Kz`;
}

export function TransactionDetailPage() {
  const { id = "" } = useParams();
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["staff", "transactions", id],
    queryFn: () => fetchStaffTransaction(id),
    enabled: Boolean(id),
  });

  const confirmMutation = useMutation({
    mutationFn: () => confirmTransactionEscrow(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["staff", "transactions"] });
      void qc.invalidateQueries({ queryKey: ["staff", "transactions", id] });
    },
  });

  const tx = query.data;
  const canConfirm =
    tx?.status === "comprador_pagou_pendente_ops" && !confirmMutation.isPending;

  const openComprovativo = async (uploadId: string) => {
    try {
      const url = await fetchComprovativoReadUrl(id, uploadId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Não foi possível abrir o comprovativo.";
      window.alert(message);
    }
  };

  return (
    <div className={styles.txPage}>
      <Link className={styles.backLink} to="/transactions">
        ← Transações
      </Link>

      {query.isPending ? (
        <div className={styles.empty}>A carregar…</div>
      ) : query.isError || !tx ? (
        <div className={styles.error}>
          {query.error instanceof ApiError
            ? query.error.message
            : "Transação não encontrada."}
        </div>
      ) : (
        <>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>{tx.refCode}</h1>
              <p className={styles.lead}>
                Estado:{" "}
                <span className={styles.badge}>
                  {tx.status === "comprador_pagou_pendente_ops"
                    ? "Aguardando ops"
                    : tx.status}
                </span>
              </p>
            </div>
          </div>

          <div className={styles.detailGrid}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Resumo</div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryKey}>Base</span>
                <span className={styles.summaryVal}>
                  {formatKz(tx.baseKz)} ({tx.foreignAmount} {tx.foreignCurrency}
                  )
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryKey}>Comprador paga</span>
                <span className={styles.summaryVal}>
                  {formatKz(tx.buyerPaysKz)}
                </span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryKey}>Vendedor recebe</span>
                <span className={styles.summaryVal}>
                  {formatKz(tx.sellerReceivesKz)}
                </span>
              </div>
              {tx.companyBankSnapshot ? (
                <>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>Conta empresa</span>
                    <span className={styles.summaryVal}>
                      {tx.companyBankSnapshot.holderName} ·{" "}
                      {tx.companyBankSnapshot.bankName}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>IBAN</span>
                    <span className={styles.summaryVal}>
                      {tx.companyBankSnapshot.iban}
                    </span>
                  </div>
                </>
              ) : null}
            </div>

            <div className={styles.card}>
              <div className={styles.cardTitle}>Acções de ops</div>
              <p className={styles.lead}>
                Confirme apenas após cruzar comprovativo, referência{" "}
                {tx.refCode} e extrato real.
              </p>
              <div className={styles.actions}>
                <PrimaryButton
                  full
                  disabled={!canConfirm}
                  loading={confirmMutation.isPending}
                  onClick={() => confirmMutation.mutate()}
                >
                  Confirmar Kz recebido
                </PrimaryButton>
                {confirmMutation.isError ? (
                  <div className={styles.error}>
                    {confirmMutation.error instanceof ApiError
                      ? confirmMutation.error.message
                      : "Falha ao confirmar escrow."}
                  </div>
                ) : null}
              </div>

              <div style={{ marginTop: 20 }}>
                <div className={styles.cardTitle}>Comprovativos</div>
                {!tx.comprovativos.length ? (
                  <p className={styles.lead}>Nenhum comprovativo confirmado.</p>
                ) : (
                  <div className={styles.comprovGrid}>
                    {tx.comprovativos.map((item) => (
                      <div key={item.uploadId} className={styles.comprovItem}>
                        <div className={styles.comprovLabel}>
                          {item.ownerRole === "buyer"
                            ? "Kz · comprador"
                            : "Moeda · vendedor"}
                        </div>
                        <button
                          type="button"
                          className={styles.comprovButton}
                          onClick={() => void openComprovativo(item.uploadId)}
                        >
                          Ver documento
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
