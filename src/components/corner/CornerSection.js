import { useAtomValue } from "jotai";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";

/**
 * Placeholder for a corner section. Real content must be loaded from an
 * authenticated backend endpoint (see privateApi in services/auth.js) —
 * never bundled into the frontend.
 */
export default function CornerSection({ section }) {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const { Icon } = section;
  return (
    <section className="corner-card corner-empty">
      <span className="corner-empty__icon" aria-hidden>
        <Icon />
      </span>
      <h2 className="fs-4 fw-bold mb-1">{t(section.en, section.zh)}</h2>
      <p className="corner-muted mb-0">{t(section.den, section.dzh)}</p>
      <p className="corner-muted small mt-3 mb-0">
        {t(
          "Nothing here yet — this page is waiting for its first entry.",
          "这里还空着，等待第一条记录。",
        )}
      </p>
    </section>
  );
}
