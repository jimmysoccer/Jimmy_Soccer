import { useAtomValue } from "jotai";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import { technicalSkills } from "../../constants/research-items";
import { Reveal } from "../common/Motion";

// CV PDF lives in /public so it is served as a static asset
export const CV_PATH = "/HENG_SUN_CV.pdf";

/** CV block rendered inside the Research page: actions, skills, embedded PDF. */
export default function CvSection() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);

  return (
    <div className="px-3">
      <div className="d-flex flex-wrap gap-2 mb-4">
        <a className="btn-brand" href={CV_PATH} download="HENG_SUN_CV.pdf">
          <DownloadRoundedIcon fontSize="small" />
          {t("Download PDF", "下载 PDF")}
        </a>
        <a
          className="btn-ghost"
          href={CV_PATH}
          target="_blank"
          rel="noreferrer"
        >
          {t("Open in new tab", "在新标签页打开")}
          <OpenInNewRoundedIcon fontSize="small" />
        </a>
      </div>

      <Reveal className="card-surface cv-skills">
        <h3 className="cv-section__title mb-3">
          {t("Technical Skills", "技术能力")}
        </h3>
        <div className="cv-skills__grid">
          {technicalSkills.map((g) => (
            <div key={g.group}>
              <div className="fw-semibold mb-2">
                {t(g.group, g.group_chinese)}
              </div>
              <div className="d-flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="card-surface cv-frame mt-4">
        <iframe src={`${CV_PATH}#zoom=100`} title="CV" loading="lazy" />
      </Reveal>
    </div>
  );
}
