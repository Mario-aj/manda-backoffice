import styles from "./manda-glyph.module.css";

type MandaGlyphProps = {
  size?: 32 | 36;
};

export function MandaGlyph({ size = 32 }: MandaGlyphProps) {
  const className = [styles.glyph, size === 36 ? styles.size36 : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          className={styles.iconFill}
          d="M3 5.2C3 4.1 3.9 3.2 5 3.2H19C20.1 3.2 21 4.1 21 5.2V15.6C21 16.7 20.1 17.6 19 17.6H13.4L9.8 21.2C9.2 21.8 8.2 21.4 8.2 20.6V17.6H5C3.9 17.6 3 16.7 3 15.6V5.2Z"
        />
        <path className={styles.iconStroke} d="M7 10.5L11 13.5L17 7.5" />
      </svg>
    </div>
  );
}
