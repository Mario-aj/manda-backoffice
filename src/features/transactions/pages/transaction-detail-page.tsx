import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  confirmTransactionEscrow,
  fetchComprovativoReadUrl,
  fetchStaffTransaction,
  markTransactionPayout,
} from "@/features/transactions/api/transactions";
import { Avatar } from "@/shared/ui/avatar";
import { ConfirmDangerDialog } from "@/shared/ui/confirm-danger-dialog";
import { PrimaryButton } from "@/shared/ui/primary-button";
import { ApiError } from "@/shared/api/api-error";
import type { StaffTransactionDetailDto } from "@/features/transactions/api/transactions";
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

const BADGE_TONE: Record<string, string> = {
  proposta: "green",
  rejeitada: "mute",
  proposta_expirada: "mute",
  a_aguardar_pagamento_comprador: "blue",
  comprador_pagou_pendente_ops: "blue",
  escrow_confirmado: "green",
  vendedor_enviou_pendente: "blue",
  comprador_confirmou_rececao: "green",
  payout_pendente: "blue",
  concluida: "mute",
  cancelada: "mute",
  disputa: "danger",
};

const TIMELINE_CONFIG = [
  { label: "Proposta enviada (vendedor)", doneFrom: "proposta" },
  { label: "Aceite pelo comprador", doneFrom: "a_aguardar_pagamento_comprador" },
  { label: "A aguardar pagamento Kz", doneFrom: "a_aguardar_pagamento_comprador" },
  { label: "Comprador pagou · pendente ops", doneFrom: "comprador_pagou_pendente_ops" },
  { label: "Escrow confirmado", doneFrom: "escrow_confirmado" },
  { label: "Vendedor enviou USD", doneFrom: "vendedor_enviou_pendente" },
  { label: "Comprador confirmou", doneFrom: "comprador_confirmou_rececao" },
  { label: "Payout ao vendedor", doneFrom: "payout_pendente" },
];

const STATUS_TO_CURRENT = [
  "proposta",
  "a_aguardar_pagamento_comprador",
  "a_aguardar_pagamento_comprador",
  "comprador_pagou_pendente_ops",
  "escrow_confirmado",
  "vendedor_enviou_pendente",
  "comprador_confirmou_rececao",
  "payout_pendente",
];

const TERMINAL_STATUSES = new Set([
  "rejeitada",
  "proposta_expirada",
  "cancelada",
  "disputa",
  "concluida",
]);

function formatKz(value: number): string {
  return `${value.toLocaleString("pt-PT")} Kz`;
}

function formatKzValue(value: number): string {
  return `${value.toLocaleString("pt-PT")}`;
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h14l-3-3M20 16H6l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 4.5-3 8-8 10-5-2-8-5.5-8-10V6l8-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 12l2.5 2.5L16 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="11" width="16" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function TimelineStep({ label, state }: { label: string; state: "done" | "current" | "future" }) {
  return (
    <div className={styles.timelineStep}>
      <div className={styles.timelineStepCol}>
        <div
          className={[
            styles.timelineDot,
            state === "done"
              ? styles.timelineDotDone
              : state === "current"
              ? styles.timelineDotCurrent
              : styles.timelineDotFuture,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {state === "done" && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div
          className={[
            styles.timelineLine,
            state === "done" ? styles.timelineLineDone : styles.timelineLineFuture,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
      <div className={styles.timelineStepBody}>
        <div
          className={[
            styles.timelineLabel,
            state === "current" ? styles.timelineLabelCurrent : state === "future" ? styles.timelineLabelFuture : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </div>
        {state === "current" && <div className={styles.timelineCurrentMark}>← estado atual</div>}
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TransactionDetailPage() {
  const { id = "" } = useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
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
    tx?.status === "comprador_pagou_pendente_ops" && !confirmEscrowMutation.isPending;
  const canMarkPayout =
    tx?.status === "payout_pendente" && !markPayoutMutation.isPending;

  const openComprovativo = async (uploadId: string) => {
    try {
      const url = await fetchComprovativoReadUrl(id, uploadId);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Não foi possível abrir o comprovativo.";
      window.alert(message);
    }
  };

  const getStepState = (_tx: StaffTransactionDetailDto, index: number): "done" | "current" | "future" => {
    const terminal = TERMINAL_STATUSES.has(_tx.status);
    if (_tx.status === "concluida") return "done";
    if (terminal) return "future";
    const currentIdx = STATUS_TO_CURRENT.indexOf(_tx.status);
    if (index < currentIdx) return "done";
    if (index === currentIdx) return "current";
    return "future";
  };

  const badgeTone = tx ? BADGE_TONE[tx.status] ?? "mute" : "mute";

  return (
    <div className={styles.txPage}>
      <ConfirmDangerDialog
        open={confirmEscrowOpen}
        title="Confirmar Kz recebido"
        message={
          <>
            Confirme apenas após cruzar comprovativo, referência <strong>{tx?.refCode}</strong> e
            extrato real. Esta acção avança a transação para escrow confirmado.
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
            <strong>{tx ? formatKz(tx.sellerReceivesKz) : ""}</strong> Kz para o vendedor e cruzar
            com o extrato de saída. Esta acção conclui a transação{" "}
            <strong>{tx?.refCode}</strong>.
          </>
        }
        confirmLabel="Marcar payout feito"
        loading={markPayoutMutation.isPending}
        onCancel={() => {
          if (!markPayoutMutation.isPending) setMarkPayoutOpen(false);
        }}
        onConfirm={() => markPayoutMutation.mutate()}
      />

      {query.isPending ? (
        <div className={styles.empty}>A carregar…</div>
      ) : query.isError || !tx ? (
        <div className={styles.error}>
          {query.error instanceof ApiError ? query.error.message : "Transação não encontrada."}
        </div>
      ) : (
        <>
          <div className={styles.detailHeader}>
            <button type="button" className={styles.backBtn} onClick={() => navigate("/transactions")}>
              <ChevronLeftIcon />
              Transações
            </button>
            <span className={styles.detailRef}>{tx.refCode}</span>
            <span
              className={[
                styles.badge,
                styles[`badge${badgeTone.charAt(0).toUpperCase() + badgeTone.slice(1)}` as keyof typeof styles],
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.badgeDot} />
              {STATUS_LABELS[tx.status] ?? tx.status}
            </span>
            <span className={styles.detailStatusNote}>⏳ Sem contagem contra a Manda</span>
          </div>

          <div className={styles.detailColumns}>
            <div className={styles.detailColLeft}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>Resumo</div>
                <div className={styles.buyerSellerRow}>
                  <div className={styles.buyerSellerBlock}>
                    <Avatar name={tx.buyerFullName} size={36} />
                    <div className={styles.buyerSellerInfo}>
                      <div className={styles.buyerSellerName}>{tx.buyerFullName ?? "—"}</div>
                      <div className={styles.buyerSellerRole}>Comprador</div>
                    </div>
                  </div>
                  <div className={styles.exchangeIconWrap}>
                    <ExchangeIcon />
                  </div>
                  <div className={styles.buyerSellerBlock}>
                    <div className={styles.buyerSellerInfoRight}>
                      <div className={styles.buyerSellerName}>{tx.sellerFullName ?? "—"}</div>
                      <div className={styles.buyerSellerRole}>Vendedora</div>
                    </div>
                  </div>
                </div>

                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>
                      Base ({tx.foreignAmount} {tx.foreignCurrency} × {tx.exchangeRateKzPerUnit})
                    </span>
                    <span className={styles.summaryVal}>{formatKzValue(tx.baseKz)} Kz</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>Comprador paga (+0,5%)</span>
                    <span className={styles.summaryVal}>{formatKzValue(tx.buyerPaysKz)} Kz</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>Vendedor recebe (−0,5%)</span>
                    <span className={styles.summaryVal}>{formatKzValue(tx.sellerReceivesKz)} Kz</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryKey}>Taxa Manda (1%)</span>
                    <span className={styles.summaryVal}>
                      {formatKzValue(tx.buyerPaysKz - tx.sellerReceivesKz)} Kz
                    </span>
                  </div>
                </div>

                {tx.companyBankSnapshot ? (
                  <div className={styles.bankSnapshot}>
                    <div className={styles.bankSnapshotTitle}>Conta da empresa (snapshot)</div>
                    <div className={styles.bankSnapshotName}>
                      {tx.companyBankSnapshot.holderName} · {tx.companyBankSnapshot.bankName}
                    </div>
                    <div className={styles.bankSnapshotIban}>{tx.companyBankSnapshot.iban}</div>
                  </div>
                ) : null}
              </div>

              <div className={styles.card}>
                <div className={styles.cardTitle}>Comprovativos</div>
                <div className={styles.comprovGrid3}>
                  <div className={styles.comprovTileWrap}>
                    {tx.comprovativos.find((c) => c.ownerRole === "buyer") ? (
                      <button
                        type="button"
                        className={styles.comprovTileActive}
                        onClick={() =>
                          void openComprovativo(tx.comprovativos.find((c) => c.ownerRole === "buyer")!.uploadId)
                        }
                      >
                        <ShieldIcon size={22} />
                      </button>
                    ) : (
                      <div className={styles.comprovTilePending}>
                        <span className={styles.comprovTilePendingText}>pendente</span>
                      </div>
                    )}
                    <div className={styles.comprovTileLabel}>Kz · comprador</div>
                  </div>
                  <div className={styles.comprovTileWrap}>
                    {tx.comprovativos.find((c) => c.ownerRole === "seller") ? (
                      <button
                        type="button"
                        className={styles.comprovTileActive}
                        onClick={() =>
                          void openComprovativo(tx.comprovativos.find((c) => c.ownerRole === "seller")!.uploadId)
                        }
                      >
                        <ShieldIcon size={22} />
                      </button>
                    ) : (
                      <div className={styles.comprovTilePending}>
                        <span className={styles.comprovTilePendingText}>pendente</span>
                      </div>
                    )}
                    <div className={styles.comprovTileLabel}>USD · vendedor</div>
                  </div>
                  <div className={styles.comprovTileWrap}>
                    <div className={styles.comprovTilePending}>
                      <span className={styles.comprovTilePendingText}>pendente</span>
                    </div>
                    <div className={styles.comprovTileLabel}>Payout</div>
                  </div>
                </div>
                <div className={styles.lockNote}>
                  <LockIcon /> Documentos sensíveis · acesso auditado.
                </div>
              </div>
            </div>

            <div className={styles.detailColMid}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineTitle}>Linha do tempo</div>
                {TIMELINE_CONFIG.map((step, i) => (
                  <TimelineStep key={step.label} label={step.label} state={getStepState(tx, i)} />
                ))}
                <div className={styles.timelineBranchNote}>
                  Ramos possíveis: rejeitada · proposta expirada · cancelada · disputa (resolução manual).
                </div>
              </div>
            </div>

            <div className={styles.detailColRight}>
              <div className={styles.actionCard}>
                <div className={styles.cardTitle}>Acções de ops</div>
                <div className={styles.actionDescription}>Conforme o estado atual.</div>
                <div className={styles.actionList}>
                  <PrimaryButton full disabled={!canConfirmEscrow} onClick={() => setConfirmEscrowOpen(true)}>
                    <CheckCircleIcon /> Confirmar Kz recebido
                  </PrimaryButton>
                  {confirmEscrowMutation.isError ? (
                    <div className={styles.error}>
                      {confirmEscrowMutation.error instanceof ApiError
                        ? confirmEscrowMutation.error.message
                        : "Falha ao confirmar escrow."}
                    </div>
                  ) : null}

                  <button
                    type="button"
                    className={styles.actionOutlineBtn}
                    disabled={!canMarkPayout}
                    onClick={() => setMarkPayoutOpen(true)}
                  >
                    Marcar payout feito
                  </button>
                  {markPayoutMutation.isError ? (
                    <div className={styles.error}>
                      {markPayoutMutation.error instanceof ApiError
                        ? markPayoutMutation.error.message
                        : "Falha ao marcar payout."}
                    </div>
                  ) : null}

                  <button type="button" className={styles.actionDangerBtn} disabled>
                    Resolver disputa
                  </button>

                  <div className={styles.actionSubList}>
                    <div className={styles.actionSubItem}>
                      <span className={styles.actionBullet} />
                      Reembolsar comprador
                    </div>
                    <div className={styles.actionSubItem}>
                      <span className={styles.actionBullet} />
                      Libertar vendedor
                    </div>
                  </div>
                </div>
                <div className={styles.actionAuditNote}>
                  Todas as acções exigem confirmação e ficam registadas na auditoria.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
