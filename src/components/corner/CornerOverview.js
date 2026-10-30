import { useState } from "react";
import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import { Tab, Tabs } from "@mui/material";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import JSIHCalendar from "../common/JSIHCalendar";
import JSIHSummary from "../common/JSIHSummary";
import { CORNER_SECTIONS } from "./sections";

export default function CornerOverview() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="corner-grid">
        {CORNER_SECTIONS.filter((s) => s.path).map((s) => (
          <Link key={s.key} to={s.path} className="corner-card corner-tile">
            <span className="corner-empty__icon" aria-hidden>
              <s.Icon fontSize="small" />
            </span>
            <span className="fw-semibold">{t(s.en, s.zh)}</span>
            <span className="corner-muted small">{t(s.den, s.dzh)}</span>
          </Link>
        ))}
      </div>

      <section className="corner-card mt-4 p-3 p-md-4">
        <h2 className="fs-5 fw-bold mb-1">{t("Daily Tracker", "每日记录")}</h2>
        <p className="corner-muted mb-2">
          {t("Recent activity at a glance.", "近期动态一览。")}
        </p>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{
            mb: 2,
            "& .MuiTabs-indicator": { backgroundColor: "var(--corner-accent)" },
            "& .Mui-selected": {
              color: "var(--corner-accent-dark) !important",
            },
          }}
        >
          <Tab label={t("Calendar", "日历")} />
          <Tab label={t("Summary", "汇总")} />
        </Tabs>
        {tab === 0 ? <JSIHCalendar /> : <JSIHSummary />}
      </section>
    </>
  );
}
