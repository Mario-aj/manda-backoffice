import { MandaWordmark } from "@/shared/ui/manda-wordmark";
import { Avatar } from "@/shared/ui/avatar";
import { useAuth } from "@/features/auth/providers/auth-provider";
import type { StaffRole } from "@/features/auth/api/types";
import styles from "./sidebar.module.css";

const ROLE_LABELS: Record<StaffRole, string> = {
  ops: "Ops",
  support: "Suporte",
  compliance: "Compliance",
  superAdmin: "Admin",
};

function ShieldIcon() {
  return (
    <svg
      className={styles.navIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 3L4 6.5v5.8c0 4.2 3.4 8.1 8 9.7 4.6-1.6 8-5.5 8-9.7V6.5L12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg
      className={styles.navIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M7 7h11M14 4l4 3-4 3M17 17H6M10 20l-4-3 4-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: "kyc", label: "KYC", icon: ShieldIcon, disabled: true },
  { key: "tx", label: "Transações", icon: ExchangeIcon, disabled: true },
] as const;

export function Sidebar() {
  const { staff, logoutMutation } = useAuth();
  const displayName = staff?.fullName ?? "Staff";
  const roleLabel = staff ? ROLE_LABELS[staff.role] : "";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <MandaWordmark size={24} variant="light" />
        <div className={styles.brandLabel}>Backoffice</div>
      </div>

      <nav className={styles.nav} aria-label="Navegação principal">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className={[
                styles.navItem,
                item.disabled ? styles.navItemDisabled : "",
              ]
                .filter(Boolean)
                .join(" ")}
              title={item.disabled ? "Em breve" : undefined}
            >
              <Icon />
              <span className={styles.navItemLabel}>{item.label}</span>
              {item.disabled && (
                <span className={styles.navItemBadge}>Em breve</span>
              )}
            </div>
          );
        })}
      </nav>

      <div className={styles.spacer} />

      <div className={styles.footer}>
        <Avatar name={displayName} size={36} />
        <div className={styles.footerMeta}>
          <div className={styles.footerName}>{displayName}</div>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {roleLabel} ·{" "}
            {logoutMutation.isPending ? "A terminar…" : "Terminar sessão"}
          </button>
        </div>
      </div>
    </aside>
  );
}
