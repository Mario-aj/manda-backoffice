import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchStaffTransactions } from "@/features/transactions/api/transactions";
import { formatTransactionOpenedAt } from "@/features/transactions/format-transaction-opened-at";
import { ApiError } from "@/shared/api/api-error";
import type { TransactionSummaryDto } from "@/features/transactions/api/transactions";
import styles from "./transactions.module.css";

type ChipTone = "warn" | "danger" | "green" | undefined;

type ChipDef = {
  key: string;
  label: string;
  tone?: ChipTone;
  match: (tx: TransactionSummaryDto) => boolean;
  count?: number;
};

type BadgeTone = "green" | "blue" | "danger" | "mute";

type BadgeDef = {
  label: string;
  tone: BadgeTone;
};

type WhoValue = "Manda" | "Utilizador" | "—";

const BADGE_MAP: Record<string, BadgeDef> = {
  proposta: { label: "Proposta", tone: "green" },
  rejeitada: { label: "Rejeitada", tone: "mute" },
  proposta_expirada: { label: "Proposta expirada", tone: "mute" },
  a_aguardar_pagamento_comprador: {
    label: "Aguardando pagamento",
    tone: "blue",
  },
  comprador_pagou_pendente_ops: { label: "Aguardando ops", tone: "blue" },
  escrow_confirmado: { label: "Escrow confirmado", tone: "green" },
  vendedor_enviou_pendente: { label: "Vendedor enviou", tone: "blue" },
  comprador_confirmou_rececao: {
    label: "Comprador confirmou receção",
    tone: "green",
  },
  payout_pendente: { label: "Payout pendente", tone: "blue" },
  concluida: { label: "Concluída", tone: "mute" },
  cancelada: { label: "Cancelada", tone: "mute" },
  disputa: { label: "Disputa", tone: "danger" },
};

function whoValue(status: string): WhoValue {
  switch (status) {
    case "a_aguardar_pagamento_comprador":
    case "comprador_pagou_pendente_ops":
    case "payout_pendente":
    case "disputa":
      return "Manda";
    case "proposta":
    case "escrow_confirmado":
    case "vendedor_enviou_pendente":
    case "comprador_confirmou_rececao":
      return "Utilizador";
    default:
      return "—";
  }
}

function formatAmount(value: number): string {
  return value.toLocaleString("pt-PT");
}

function formatWhen(tx: TransactionSummaryDto): string {
  if (!tx.createdAt) {
    return "—";
  }
  return formatTransactionOpenedAt(tx.createdAt);
}

function participantName(name: string | undefined): string {
  return name?.trim() ? name : "—";
}

const CHIP_DEFS: Omit<ChipDef, "count">[] = [
  { key: "all", label: "Todas", match: () => true },
  {
    key: "em_curso",
    label: "Em curso",
    match: (tx) =>
      ["proposta", "escrow_confirmado", "comprador_confirmou_rececao"].includes(
        tx.status
      ),
  },
  {
    key: "aguardando_ops",
    label: "Aguardando ops",
    tone: "warn",
    match: (tx) =>
      [
        "a_aguardar_pagamento_comprador",
        "comprador_pagou_pendente_ops",
        "payout_pendente",
      ].includes(tx.status),
  },
  {
    key: "disputa",
    label: "Em disputa",
    tone: "danger",
    match: (tx) => tx.status === "disputa",
  },
  {
    key: "concluidas",
    label: "Concluídas",
    match: (tx) => tx.status === "concluida",
  },
  {
    key: "canceladas",
    label: "Canceladas",
    match: (tx) => tx.status === "cancelada",
  },
];

const COL_DEFS = [
  { key: "ref", label: "Ref", w: "0.9fr" },
  { key: "buyer", label: "Comprador", w: "1.3fr" },
  { key: "seller", label: "Vendedor", w: "1.3fr" },
  { key: "amount", label: "Montante (Kz)", w: "1fr", align: "right" as const },
  { key: "status", label: "Estado", w: "1.1fr" },
  { key: "opened", label: "Aberta", w: "1fr" },
  { key: "who", label: "Acção de quem?", w: "1fr" },
];

export function TransactionsListPage() {
  const [activeChip, setActiveChip] = useState("all");

  const query = useQuery({
    queryKey: ["staff", "transactions"],
    queryFn: () => fetchStaffTransactions(),
  });

  const txData = query.data ?? [];

  const chipDefsWithCount = useMemo(
    () =>
      CHIP_DEFS.map((def) => ({
        ...def,
        count: txData.filter(def.match).length,
      })),
    [txData]
  );

  const filteredTx = useMemo(
    () =>
      txData.filter(
        chipDefsWithCount.find((c) => c.key === activeChip)?.match ??
          (() => true)
      ),
    [txData, activeChip, chipDefsWithCount]
  );

  const navigate = useNavigate();

  return (
    <div className={styles.txPage}>
      <div className={styles.chips}>
        {chipDefsWithCount.map((chip) => {
          const active = chip.key === activeChip;
          const classes = [
            styles.chip,
            active ? styles.chipActive : "",
            chip.tone && active
              ? styles[
                  `chipTone${
                    chip.tone.charAt(0).toUpperCase() + chip.tone.slice(1)
                  }` as keyof typeof styles
                ]
              : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={chip.key}
              type="button"
              className={classes}
              onClick={() => setActiveChip(chip.key)}
            >
              {chip.label}
              {chip.count !== undefined && chip.count > 0 && chip.key !== "all"
                ? ` · ${chip.count}`
                : null}
            </button>
          );
        })}
      </div>

      {query.isError ? (
        <div className={styles.error}>
          {query.error instanceof ApiError
            ? query.error.message
            : "Não foi possível carregar as transações."}
        </div>
      ) : null}

      <div className={styles.tableWrap}>
        {query.isPending ? (
          <div className={styles.empty}>A carregar…</div>
        ) : !txData.length ? (
          <div className={styles.empty}>Nenhuma transação encontrada.</div>
        ) : (
          <>
            <div className={styles.tableHead}>
              {COL_DEFS.map((col) => (
                <div
                  key={col.key}
                  className={styles.th}
                  style={{ textAlign: col.align ?? "left" }}
                >
                  {col.label}
                </div>
              ))}
            </div>
            {filteredTx.map((tx) => {
              const badge = BADGE_MAP[tx.status];
              const who = whoValue(tx.status);
              const hiBg =
                tx.status === "disputa"
                  ? styles.rowHighlightDanger
                  : tx.status === "comprador_pagou_pendente_ops" ||
                    tx.status === "a_aguardar_pagamento_comprador" ||
                    tx.status === "payout_pendente"
                  ? styles.rowHighlightWarn
                  : undefined;

              return (
                <div
                  key={tx.id}
                  className={[styles.row, hiBg].filter(Boolean).join(" ")}
                  onClick={() => navigate(`/transactions/${tx.id}`)}
                >
                  <div className={styles.colRef}>{tx.refCode}</div>
                  <div className={styles.colName}>
                    {participantName(tx.buyerFullName)}
                  </div>
                  <div className={styles.colName}>
                    {participantName(tx.sellerFullName)}
                  </div>
                  <div className={styles.colAmount}>
                    {formatAmount(tx.buyerPaysKz)}
                  </div>
                  <div>
                    <span
                      className={[
                        styles.badge,
                        badge
                          ? styles[
                              `badge${
                                badge.tone.charAt(0).toUpperCase() +
                                badge.tone.slice(1)
                              }` as keyof typeof styles
                            ]
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className={styles.badgeDot} />
                      {badge?.label ?? tx.status}
                    </span>
                  </div>
                  <div className={styles.colWhen}>{formatWhen(tx)}</div>
                  <div
                    className={[
                      styles.colWho,
                      who === "Manda"
                        ? styles.colWhoManda
                        : who === "Utilizador"
                        ? styles.colWhoUser
                        : styles.colWhoNone,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {who}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
