import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On route change: scroll to the `#hash` target if present (waiting briefly
 * for lazily-loaded pages to render it), otherwise to the top.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 30) {
        timer = setTimeout(attempt, 100);
      }
    };
    attempt();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
