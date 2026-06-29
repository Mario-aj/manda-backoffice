import { useState } from "react";
import { ApiError } from "@/shared/api/api-error";
import { TextField } from "@/shared/ui/text-field";
import { PrimaryButton } from "@/shared/ui/primary-button";
import { useAuth } from "@/features/auth/providers/auth-provider";
import styles from "./login-form.module.css";

export function LoginForm() {
  const { loginMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage =
    loginMutation.error instanceof ApiError
      ? loginMutation.error.message
      : loginMutation.error
      ? "Erro de rede. Tente novamente."
      : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      email: email.trim().toLowerCase(),
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="rita.mendes@manda.ao"
          autoComplete="username"
          disabled={loginMutation.isPending}
        />
        <div>
          <TextField
            label="Palavra-passe"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            disabled={loginMutation.isPending}
          />
          {errorMessage && (
            <div className={styles.error} role="alert">
              <svg
                className={styles.errorIcon}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle
                  className={styles.errorIconCircle}
                  cx="12"
                  cy="12"
                  r="9"
                />
                <path
                  className={styles.errorIconLine}
                  d="M12 7.5v5.5M12 16h.01"
                />
              </svg>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <PrimaryButton
          type="submit"
          full
          loading={loginMutation.isPending}
          disabled={!email.trim() || !password}
        >
          Entrar
        </PrimaryButton>
      </div>
    </form>
  );
}
