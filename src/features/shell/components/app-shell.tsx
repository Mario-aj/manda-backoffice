import { Outlet } from "react-router-dom";
import { Sidebar } from "@/features/shell/components/sidebar";
import { Topbar } from "@/features/shell/components/topbar";
import styles from "./app-shell.module.css";

type AppShellProps = {
  title?: string;
};

export function AppShell({ title = "Início" }: AppShellProps) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.mainColumn}>
        <Topbar title={title} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
