import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  confirmTransactionEscrow,
  fetchComprovativoReadUrl,
  fetchStaffTransaction,
  markTransactionPayout,
} from "@/features/transactions/api/transactions";
import { ConfirmDangerDialog } from "@/shared/ui/confirm-danger-dialog";
import { PrimaryButton } from "@/shared/ui/primary-button";
import { ApiError } from "@/shared/api/api-error";
import styles from "./transactions.module.css";

const STATUS_LABELS: Record<string, string> = {
  proposta: "Proposta",
  rejeitada: "Rejeitada",
  proposta_expirada: "Proposta expirada",
  a_aguardar_pagamento_comprador: "Aguardando pagamento",
  comprador_pagou_pendente_ops: "Aguardando ops",
  escrow_confirmado: "Escrow confirmado",
  vendedor_enviou_pendente: "Vendedor enviou",
  comprador_confirmou_rececao: "Comprador confirmou receção",
  payout_pendente: "Payout pendente",
  concluida: "Concluída",
  cancelada: "Cancelada",
  disputa: "Disputa",
};

function formatKz(value: number): string {
  return `${value.toLocaleString("pt-PT")} Kz`;
}

export function TransactionDetailPage() {
  const { id = "" } = useParams();
  const qc = useQueryClient();
  const [confirmEscrowOpen, setConfirmEscrowOpen] = useState(false);
  const [markPayoutOpen, setMarkPayoutOpen] = useState(false);

  const query = useQuery({
    queryKey: ["staff", "transactions", id],
    queryFn: () => fetchStaffTransaction(id),
    enabled: Boolean(id),
  });

  const confirmEscrowMutation = useMutation({
    mutationFn: () => confirmTransactionEscrow(id),
    onSuccess: () => {
      setConfirmEscrowOpen(false);
      void qc.invalidateQueries({ queryKey: ["staff", "transactions"] });
      void qc.invalidateQueries({ queryKey: ["staff", "transactions", id] });
    },
  });

  const markPayoutMutation = useMutation({
    mutationFn: () => markTransactionPayout(id),
    onSuccess: () => {
      setMarkPayoutOpen(false);
      void qc.invalidateQueries({ queryKey: ["staff", "transactions"] });
      void qc.invalidateQueries({ queryKey: ["staff", "transactions", id] });
    },
  });

  const tx = query.data;
  const canConfirmEscrow =
    tx?.status === "comprador_pagou_pendente_ops" &&
    !confirmEscrowMutation.isPending;
  const canMarkPayout =
    tx?.status === "payout_pendente" && !markPayoutMutation.isPending;

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
      <ConfirmDangerDialog
        open={confirmEscrowOpen}
        title="Confirmar Kz recebido"
        message={
          <>
            Confirme apenas após cruzar comprovativo, referência{" "}
            <strong>{tx?.refCode}</strong> e extrato real. Esta acção avança a
            transação para escrow confirmado.
          </>
        }
        confirmLabel="Confirmar Kz recebido"
        loading={confirmEscrowMutation.isPending}
        onCancel={() => {
          if (!confirmEscrowMutation.isPending) setConfirmEscrowOpen(false);
        }}
        onConfirm={() => confirmEscrowMutation.mutate()}
      />

      <ConfirmDangerDialog
        open={markPayoutOpen}
        title="Marcar payout feito"
        message={
          <>
            Confirme apenas após transferir{" "}
            <strong>{tx ? formatKz(tx.sellerReceivesKz) : ""}</strong> Kz para o
            vendedor e cruzar com o extrato de saída. Esta acção conclui a
            transação <strong>{tx?.refCode}</strong>.
          </>
        }
        confirmLabel="Marcar payout feito"
        loading={markPayoutMutation.isPending}
        onCancel={() => {
          if (!markPayoutMutation.isPending) setMarkPayoutOpen(false);
        }}
        onConfirm={() => markPayoutMutation.mutate()}
      />

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
                  {STATUS_LABELS[tx.status] ?? tx.status}
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
                Confirme Kz recebidos ou marque payout ao vendedor apenas após
                cruzar comprovativos, referência {tx.refCode} e extrato real.
              </p>
              <div className={styles.actions}>
                <PrimaryButton
                  full
                  disabled={!canConfirmEscrow}
                  onClick={() => setConfirmEscrowOpen(true)}
                >
                  Confirmar Kz recebido
                </PrimaryButton>
                {confirmEscrowMutation.isError ? (
                  <div className={styles.error}>
                    {confirmEscrowMutation.error instanceof ApiError
                      ? confirmEscrowMutation.error.message
                      : "Falha ao confirmar escrow."}
                  </div>
                ) : null}

                <PrimaryButton
                  full
                  disabled={!canMarkPayout}
                  onClick={() => setMarkPayoutOpen(true)}
                >
                  Marcar payout feito
                </PrimaryButton>
                {markPayoutMutation.isError ? (
                  <div className={styles.error}>
                    {markPayoutMutation.error instanceof ApiError
                      ? markPayoutMutation.error.message
                      : "Falha ao marcar payout."}
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
