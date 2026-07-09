import type { ReactNode } from "react";
import styles from "./confirm-danger-dialog.module.css";

type ConfirmDangerDialogProps = {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDangerDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading,
  onConfirm,
  onCancel,
}: ConfirmDangerDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={() => {
        if (!loading) onCancel();
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-danger-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-danger-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            disabled={loading}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "A processar…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
