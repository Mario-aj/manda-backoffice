import type { ReactNode } from "react";
import styles from "./loading-screen.module.css";

type LoadingScreenProps = {
  children: ReactNode;
};

export function LoadingScreen({ children }: LoadingScreenProps) {
  return <div className={styles.screen}>{children}</div>;
}
