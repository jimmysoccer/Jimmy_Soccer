import TechStackIcon from "./TechStackIcon";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import { LANGUAGE } from "../../constants/navbar-items";

export const PROJECT_PLACEHOLDER =
  "https://res.cloudinary.com/ds4h9nepa/image/upload/v1770679077/project_lzgyse.png";

export const projectKeywords = (project, language) =>
  (language === LANGUAGE.chinese.value && project.keywords_chinese
    ? project.keywords_chinese
    : project.keywords) || [];

export default function ProjectCard({
  project,
  language,
  onClick,
  featured = false,
}) {
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const keywords = projectKeywords(project, language);
  return (
    <div
      className={`box project-card ${featured ? "project-card--featured" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={project.title}
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      <div className="card-media">
        <img
          src={project?.images?.[0] || PROJECT_PLACEHOLDER}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="project-card__body">
        <h3 className="card-title">
          {t(project.title, project.title_chinese)}
        </h3>
        {project.summary && (
          <p className="project-card__summary">
            {t(project.summary, project.summary_chinese)}
          </p>
        )}
        {keywords.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mb-2">
            {keywords.map((k) => (
              <span key={k} className="tag tag--sm">
                {k}
              </span>
            ))}
          </div>
        )}
        <div className="project-card__foot">
          <span className="card-meta">
            {t(project.time, project.time_chinese)}
          </span>
          <div className="tech-row">
            {project.techStack.slice(0, 5).map((tech) => (
              <TechStackIcon key={`projects-tech-${tech}`} stack={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
