import { useState } from "react";
import { useAtomValue } from "jotai";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import { login } from "../../services/auth";

export default function CornerLogin({ onSuccess }) {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const ok = await login(username, password);
      if (ok) {
        setPassword("");
        onSuccess();
      } else {
        setError(t("Incorrect username or password.", "用户名或密码错误。"));
      }
    } catch {
      setError(
        t(
          "Could not reach the server. Please try again.",
          "无法连接服务器，请稍后再试。",
        ),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="corner-card corner-login" onSubmit={submit}>
      <span className="corner-login__icon" aria-hidden>
        <LockRoundedIcon />
      </span>
      <h2 className="fs-5 fw-bold mb-1">{t("Members only", "仅限本人")}</h2>
      <p className="corner-muted mb-3">
        {t("Please sign in to continue.", "请登录后继续。")}
      </p>
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label={t("Username", "用户名")}
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={busy}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label={t("Password", "密码")}
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={busy}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={busy}
        sx={{
          bgcolor: "var(--corner-accent)",
          "&:hover": { bgcolor: "var(--corner-accent-dark)" },
        }}
      >
        {busy ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          t("Sign in", "登录")
        )}
      </Button>
    </form>
  );
}
