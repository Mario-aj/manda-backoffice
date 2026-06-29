import { Avatar } from "@/shared/ui/avatar";
import { useAuth } from "@/features/auth/providers/auth-provider";
import styles from "./topbar.module.css";

type TopbarProps = {
  title: string;
};

export function Topbar({ title }: TopbarProps) {
  const { staff } = useAuth();
  const displayName = staff?.fullName ?? "Staff";

  return (
    <header className={styles.topbar}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.search} title="Em breve">
        <svg
          className={styles.searchIcon}
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle className={styles.searchIconCircle} cx="11" cy="11" r="7" />
          <path className={styles.searchIconLine} d="M20 20l-4-4" />
        </svg>
        Procurar utilizador, ref MND…
      </div>
      <Avatar name={displayName} size={38} />
    </header>
  );
}
