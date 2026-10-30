import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAtomValue } from "jotai";
import { languageAtom } from "../../atoms/primitive.atom";
import getHeaderTitleByPath, {
  getSectionByPath,
} from "../../utils/get-header-title-by-path";

const SITE_NAME = "Heng (Jimmy) Sun";
const DEFAULT_DESCRIPTION =
  "Heng (Jimmy) Sun — AI Researcher & Computer Scientist. Research-driven. Engineering-minded.";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps document title, meta description, Open Graph tags and robots in sync with the route. */
export default function SeoManager() {
  const { pathname } = useLocation();
  const language = useAtomValue(languageAtom);

  useEffect(() => {
    const section = getSectionByPath(pathname);
    const title = getHeaderTitleByPath(pathname, language);
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : section
        ? SITE_NAME
        : `${language === "chinese" ? "页面未找到" : "Page Not Found"} | ${SITE_NAME}`;
    const description = section?.description || DEFAULT_DESCRIPTION;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    // Private sections must never be indexed.
    // Private sections and unknown routes (404) must never be indexed.
    setMeta(
      "name",
      "robots",
      !section || section.private ? "noindex, nofollow" : "index, follow",
    );
  }, [pathname, language]);

  return null;
}
