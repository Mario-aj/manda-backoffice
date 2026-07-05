import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchStaffTransactions } from "@/features/transactions/api/transactions";
import { ApiError } from "@/shared/api/api-error";
import styles from "./transactions.module.css";

const STATUS_LABELS: Record<string, string> = {
  comprador_pagou_pendente_ops: "Aguardando ops",
  escrow_confirmado: "Escrow confirmado",
  a_aguardar_pagamento_comprador: "Aguardando pagamento",
  proposta: "Proposta",
};

function formatKz(value: number): string {
  return `${value.toLocaleString("pt-PT")} Kz`;
}

export function TransactionsListPage() {
  const query = useQuery({
    queryKey: ["staff", "transactions", "pending-ops"],
    queryFn: () => fetchStaffTransactions("comprador_pagou_pendente_ops"),
  });

  return (
    <div className={styles.txPage}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Transações</h1>
          <p className={styles.lead}>
            Fila de confirmação de Kz recebidos (ops).
          </p>
        </div>
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
            Nenhuma transação aguardando confirmação de Kz.
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
