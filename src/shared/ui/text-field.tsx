import styles from "./text-field.module.css";

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "date";
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
};

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  disabled,
}: TextFieldProps) {
  return (
    <label className={styles.label}>
      <div className={styles.labelText}>{label}</div>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
      />
    </label>
  );
}
