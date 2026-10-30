import { Link, useLocation } from "react-router-dom";
import { LANGUAGE, MAIN_NAV, NAV_BAR } from "../../constants/navbar-items";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { getSectionByPath } from "../../utils/get-header-title-by-path";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { AnimatePresence, motion } from "framer-motion";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";

const isActivePath = (path, navPath) => {
  const direct =
    navPath === "/"
      ? path === "/"
      : path === navPath || path.startsWith(navPath + "/");
  // Pages grouped under a parent (e.g. CV under About) highlight the parent.
  return direct || getSectionByPath(path)?.navParent === navPath;
};

export function LanguageToggle() {
  const [language, setLanguage] = useAtom(languageAtom);
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={language === LANGUAGE.english.value ? "is-active" : ""}
        onClick={() => setLanguage(LANGUAGE.english.value)}
      >
        EN
      </button>
      <button
        type="button"
        className={language === LANGUAGE.chinese.value ? "is-active" : ""}
        onClick={() => setLanguage(LANGUAGE.chinese.value)}
      >
        中文
      </button>
    </div>
  );
}

export default function NavBar() {
  const { pathname: path } = useLocation();
  const [language] = useAtom(languageAtom);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [path]);

  const items = MAIN_NAV;
  const label = (item) =>
    getCurrentLanguageText(language, item.title, item.titleChinese);

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="site-nav__bar" aria-label="Main">
        <Link to="/" className="site-nav__brand">
          <img src="/j.png" alt="" width="34" height="34" />
          <span>Heng (Jimmy) Sun</span>
        </Link>

        <ul className="site-nav__links site-nav__links--desktop">
          {items.map((item) => {
            const active = isActivePath(path, item.path);
            return (
              <li key={`nav-${item.path}`}>
                <Link
                  to={item.path}
                  className={`nav ${active ? "is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav__pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}
                  <span>{label(item)}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="site-nav__actions">
          <Link
            to={NAV_BAR.corner.path}
            className={`site-nav__lock ${isActivePath(path, NAV_BAR.corner.path) ? "is-active" : ""}`}
            aria-label={label(NAV_BAR.corner)}
            title={label(NAV_BAR.corner)}
            rel="nofollow"
          >
            <LockRoundedIcon sx={{ fontSize: 17 }} />
          </Link>
          <LanguageToggle />
          <button
            type="button"
            className="site-nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="site-nav__sheet"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {items.map((item) => {
              const active = isActivePath(path, item.path);
              return (
                <Link
                  key={`nav-m-${item.path}`}
                  to={item.path}
                  className={`nav ${active ? "is-active" : ""}`}
                >
                  {label(item)}
                </Link>
              );
            })}
            <Link
              to={NAV_BAR.corner.path}
              className={`nav nav--private ${isActivePath(path, NAV_BAR.corner.path) ? "is-active" : ""}`}
              rel="nofollow"
            >
              <LockRoundedIcon sx={{ fontSize: 16 }} />
              {label(NAV_BAR.corner)}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
