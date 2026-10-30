import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { Button, CircularProgress } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { languageAtom, loggedInAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import {
  clearSession,
  onSessionChange,
  verifySession,
} from "../../services/auth";
import { Page } from "../common/Motion";
import CornerLogin from "./CornerLogin";
import CornerOverview from "./CornerOverview";
import CornerSection from "./CornerSection";
import { CORNER_SECTIONS } from "./sections";
import "../../assets/styles/corner.css";

/**
 * Jimmy's Corner — private area. Every route below /corner renders only
 * after the backend confirms the session token; the backend independently
 * rejects unauthenticated requests for private data.
 */
export default function CornerRoutes() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const [checking, setChecking] = useState(loggedIn);

  // Keep the atom in sync if the token is cleared (e.g. a 401 from the API).
  useEffect(() => onSessionChange(setLoggedIn), [setLoggedIn]);

  // Re-validate a stored token with the server before showing private UI.
  useEffect(() => {
    let alive = true;
    if (!loggedIn) {
      setChecking(false);
      return undefined;
    }
    setChecking(true);
    verifySession().then((ok) => {
      if (!alive) return;
      if (!ok) clearSession();
      setLoggedIn(ok);
      setChecking(false);
    });
    return () => {
      alive = false;
    };
    // Only on mount: later logins are validated by the login request itself.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page className="container corner">
      <header className="corner__header">
        <span className="corner__eyebrow">{t("Private", "私人空间")}</span>
        <h1 className="corner__title">{t("Jimmy's Corner", "Jimmy 的角落")}</h1>
        <p className="corner__subtitle">
          {t("A Little Space of My Own", "属于我的小天地")}
        </p>
        <p className="corner__lead">
          {t(
            "A little space of my own, filled with thoughts, memories, inspirations, and moments worth keeping.",
            "一个属于我的小天地，装着思绪、回忆、灵感，以及值得珍藏的瞬间。",
          )}
        </p>
      </header>

      {checking ? (
        <div className="d-flex justify-content-center py-5">
          <CircularProgress size={28} sx={{ color: "var(--corner-accent)" }} />
        </div>
      ) : !loggedIn ? (
        <CornerLogin onSuccess={() => setLoggedIn(true)} />
      ) : (
        <>
          <div className="corner__bar">
            <nav
              className="corner__tabs"
              aria-label={t("Corner sections", "角落分区")}
            >
              {CORNER_SECTIONS.map((s) => (
                <NavLink
                  key={s.key}
                  to={s.path}
                  end={s.path === ""}
                  className={({ isActive }) =>
                    `corner__tab ${isActive ? "is-active" : ""}`
                  }
                >
                  <s.Icon sx={{ fontSize: 18 }} />
                  {t(s.en, s.zh)}
                </NavLink>
              ))}
            </nav>
            <Button
              size="small"
              variant="text"
              startIcon={<LogoutRoundedIcon />}
              onClick={() => {
                clearSession();
                setLoggedIn(false);
              }}
              sx={{ color: "var(--corner-ink-2)" }}
            >
              {t("Log out", "退出")}
            </Button>
          </div>

          <Routes>
            <Route index element={<CornerOverview />} />
            {CORNER_SECTIONS.filter((s) => s.path).map((s) => (
              <Route
                key={s.key}
                path={s.path}
                element={<CornerSection section={s} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/corner" replace />} />
          </Routes>
        </>
      )}
    </Page>
  );
}
