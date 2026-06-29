import { MandaGlyph } from "@/shared/ui/manda-glyph";
import { MandaWordmark } from "@/shared/ui/manda-wordmark";
import { LoginForm } from "@/features/auth/components/login-form";
import styles from "./login-page.module.css";

export function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.decoration} aria-hidden />
      <div className={styles.card}>
        <div className={styles.brandRow}>
          <MandaGlyph size={36} />
          <MandaWordmark size={24} />
        </div>
        <h1 className={styles.title}>Entrar no backoffice</h1>
        <p className={styles.subtitle}>
          Acesso restrito à equipa de operações.
        </p>
        <div className={styles.formWrap}>
          <LoginForm />
        </div>
        <p className={styles.footer}>
          Acesso restrito à equipa Manda · sessões auditadas
        </p>
      </div>
    </div>
  );
}
