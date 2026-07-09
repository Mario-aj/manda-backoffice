import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  fetchStaffTransactions,
  type StaffTransactionFilters,
} from "@/features/transactions/api/transactions";
import { ApiError } from "@/shared/api/api-error";
import { TextField } from "@/shared/ui/text-field";
import styles from "./transactions.module.css";

const STATUS_OPTIONS = [
  { value: "", label: "Todos os estados" },
  { value: "proposta", label: "Proposta" },
  { value: "rejeitada", label: "Rejeitada" },
  { value: "proposta_expirada", label: "Proposta expirada" },
  {
    value: "a_aguardar_pagamento_comprador",
    label: "Aguardando pagamento",
  },
  {
    value: "comprador_pagou_pendente_ops",
    label: "Aguardando ops",
  },
  { value: "escrow_confirmado", label: "Escrow confirmado" },
  { value: "vendedor_enviou_pendente", label: "Vendedor enviou" },
  {
    value: "comprador_confirmou_rececao",
    label: "Comprador confirmou receção",
  },
  { value: "payout_pendente", label: "Payout pendente" },
  { value: "concluida", label: "Concluída" },
  { value: "cancelada", label: "Cancelada" },
  { value: "disputa", label: "Disputa" },
] as const;

const STATUS_LABELS = Object.fromEntries(
  STATUS_OPTIONS.filter((option) => option.value).map((option) => [
    option.value,
    option.label,
  ])
) as Record<string, string>;

function formatKz(value: number): string {
  return `${value.toLocaleString("pt-PT")} Kz`;
}

export function TransactionsListPage() {
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filters = useMemo<StaffTransactionFilters>(() => {
    const next: StaffTransactionFilters = {};

    if (status) next.status = status;
    if (from) next.from = from;
    if (to) next.to = to;

    return next;
  }, [status, from, to]);

  const query = useQuery({
    queryKey: ["staff", "transactions", filters],
    queryFn: () => fetchStaffTransactions(filters),
  });

  return (
    <div className={styles.txPage}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Transações</h1>
          <p className={styles.lead}>
            Todas as transações da plataforma, com filtros por estado e data.
          </p>
        </div>
      </div>

      <div className={styles.filters}>
        <label className={styles.filterField}>
          <span className={styles.filterLabel}>Estado</span>
          <select
            className={styles.filterSelect}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <TextField
          label="Data inicial"
          type="date"
          value={from}
          onChange={setFrom}
        />
        <TextField label="Data final" type="date" value={to} onChange={setTo} />
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
        ) : !query.data?.length ? (
          <div className={styles.empty}>
            Nenhuma transação encontrada para estes filtros.
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Referência</th>
                <th>Estado</th>
                <th>Comprador paga</th>
                <th>Moeda</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {query.data.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.refCode}</td>
                  <td>
                    <span className={styles.badge}>
                      {STATUS_LABELS[tx.status] ?? tx.status}
                    </span>
                  </td>
                  <td>{formatKz(tx.buyerPaysKz)}</td>
                  <td>
                    {tx.foreignAmount} {tx.foreignCurrency}
                  </td>
                  <td>
                    <Link className={styles.link} to={`/transactions/${tx.id}`}>
                      Abrir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
