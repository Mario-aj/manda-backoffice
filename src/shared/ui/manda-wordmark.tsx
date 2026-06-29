import styles from "./manda-wordmark.module.css";

type MandaWordmarkProps = {
  size?: 24 | 28;
  variant?: "default" | "light";
};

export function MandaWordmark({
  size = 28,
  variant = "default",
}: MandaWordmarkProps) {
  const className = [
    styles.wordmark,
    size === 24 ? styles.size24 : "",
    variant === "light" ? styles.light : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className}>
      manda<span className={styles.dot}>.</span>
    </span>
  );
}
