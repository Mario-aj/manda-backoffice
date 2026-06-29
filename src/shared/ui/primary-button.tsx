import type { ReactNode } from "react";
import styles from "./primary-button.module.css";

type PrimaryButtonProps = {
  children: ReactNode;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function PrimaryButton({
  children,
  full,
  disabled,
  loading,
  onClick,
  type = "button",
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const className = [styles.button, full ? styles.buttonFull : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={className}
    >
      {loading ? "A entrar…" : children}
    </button>
  );
}
