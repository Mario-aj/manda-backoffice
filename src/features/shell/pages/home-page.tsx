import { useAuth } from "@/features/auth/providers/auth-provider";
import type { StaffRole } from "@/features/auth/api/types";
import styles from "./home-page.module.css";

const ROLE_LABELS: Record<StaffRole, string> = {
  ops: "Operações",
  support: "Suporte",
  compliance: "Compliance",
  superAdmin: "Administrador",
};

export function HomePage() {
  const { staff } = useAuth();

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Sessão iniciada</h2>
      <p className={styles.lead}>
        Bem-vindo ao backoffice Manda. As funcionalidades de KYC e transações
        estarão disponíveis em breve.
      </p>
      {staff && (
        <dl className={styles.details}>
          <dt className={styles.term}>Nome</dt>
          <dd className={styles.valueStrong}>{staff.fullName}</dd>
          <dt className={styles.term}>Email</dt>
          <dd className={styles.value}>{staff.email}</dd>
          <dt className={styles.term}>Função</dt>
          <dd className={styles.value}>{ROLE_LABELS[staff.role]}</dd>
        </dl>
      )}
    </div>
  );
}
