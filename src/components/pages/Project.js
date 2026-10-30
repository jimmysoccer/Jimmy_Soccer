import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { useMediaQuery } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import TechStackIcon from "../common/TechStackIcon";
import { LANGUAGE, NAV_BAR } from "../../constants/navbar-items";
import NotFound from "./NotFound";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import ImageCarousel from "../common/ImageCarousel";
import Publication from "../common/Publication";
import { Page, Reveal } from "../common/Motion";
import { projects } from "../../constants/projects";
import { PROJECT_PLACEHOLDER } from "../common/ProjectCard";

export default function Project() {
  const { name } = useParams();
  const project =
    projects.find((p) => p.slug === name || p.title === name) || {};
  const language = useAtomValue(languageAtom);
  const isMobileMatch = useMediaQuery("(max-width:600px)");
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);

  useEffect(() => {
    if (project.title)
      document.title = `${t(project.title, project.title_chinese)} | Heng (Jimmy) Sun`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.title, language]);

  if (!project.title) return <NotFound />;

  const images = project.images || [PROJECT_PLACEHOLDER];

  return (
    <Page className="detail">
      <Link className="back-link" to={NAV_BAR.projects.path}>
        <ArrowBackRoundedIcon fontSize="small" />
        {t("All projects", "全部项目")}
      </Link>

      <div className="detail__hero">
        <div className="tech-row">
          {project.techStack.map((tech) => (
            <TechStackIcon key={`project-tech-stack-${tech}`} stack={tech} />
          ))}
        </div>
        <h1 className="detail__title">
          {t(project.title, project.title_chinese)}
        </h1>
        <div className="card-meta fs-6">
          {t(project.time, project.time_chinese)}
        </div>
      </div>

      <Reveal className="card-surface detail__body">
        <ul>
          {(language === LANGUAGE.chinese.value
            ? project?.description_chinese
            : project?.description
          )?.map((des) => (
            <li key={`project-description-${des}`}>{des}</li>
          ))}
        </ul>
      </Reveal>

      {project?.papers && (
        <section className="mt-5">
          <h2 className="subsection-title mx-0">
            {t("Related Publications", "相关刊物")}
          </h2>
          <div className="stack px-0">
            {project.papers.map((paper) => (
              <Publication
                key={paper.link || paper.title}
                publication={paper}
              />
            ))}
          </div>
        </section>
      )}

      <Reveal className="mt-5">
        {isMobileMatch ? (
          <div className="detail__gallery">
            {images.map((img) => (
              <img
                key={`project-images-${img}`}
                src={img}
                alt="project"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <ImageCarousel images={images} />
        )}
      </Reveal>
    </Page>
  );
}
