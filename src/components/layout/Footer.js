import { Link, useLocation } from "react-router-dom";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { LANGUAGE, MAIN_NAV, NAV_BAR } from "../../constants/navbar-items";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import { useAtom } from "jotai";
import { languageAtom } from "../../atoms/primitive.atom";
import { chinaImage, usImage } from "../../assets/images/images";
import SocialLinks from "../common/SocialLinks";

const isActive = (path, navPath) =>
  navPath === "/"
    ? path === "/"
    : path === navPath || path.startsWith(navPath + "/");

export default function Footer() {
  const { pathname: path } = useLocation();
  const [language, setLanguage] = useAtom(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-nav__brand">
            <img src="/j.png" alt="" width="34" height="34" />
            <span>Heng (Jimmy) Sun</span>
          </Link>
          <p>
            <strong className="d-block text-body mb-1">
              {t(
                "AI Researcher & Computer Scientist",
                "AI研究者 & 计算机科学家",
              )}
            </strong>
            {t(
              "Research-driven. Engineering-minded.",
              "以研究为驱动，以工程为根基。",
            )}
          </p>
          <SocialLinks />
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          {MAIN_NAV.map((navItem) => (
            <Link
              key={`footer-${navItem.path}`}
              to={navItem.path}
              className={`footer-nav ${isActive(path, navItem.path) ? "is-active" : ""}`}
            >
              {t(navItem.title, navItem.titleChinese)}
            </Link>
          ))}
          <Link
            to={NAV_BAR.corner.path}
            className={`footer-nav footer-nav--private ${
              isActive(path, NAV_BAR.corner.path) ? "is-active" : ""
            }`}
            rel="nofollow"
          >
            <LockRoundedIcon sx={{ fontSize: 14 }} />
            {t(NAV_BAR.corner.title, NAV_BAR.corner.titleChinese)}
          </Link>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Heng (Jimmy) Sun</span>
        <div className="d-flex gap-2">
          {Object.values(LANGUAGE).map((lan) => (
            <button
              type="button"
              key={`footer-${lan.value}`}
              onClick={() => setLanguage(lan.value)}
              className={`lang-option ${lan.value === language ? "is-active" : ""}`}
            >
              <img
                src={
                  lan.value === LANGUAGE.chinese.value ? chinaImage : usImage
                }
                alt=""
              />
              {lan.title}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
