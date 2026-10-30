import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import TechStackIcon from "../common/TechStackIcon";
import { ANCHORS, LANGUAGE, NAV_BAR } from "../../constants/navbar-items";
import NotFound from "./NotFound";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import { Page, Reveal } from "../common/Motion";
import { workingExperience } from "../../constants/work-items";
import ProjectCard from "../common/ProjectCard";
import ProjectModal from "../common/ProjectModal";

export default function Work() {
  const navigate = useNavigate();
  const { name } = useParams();
  const work =
    workingExperience.find((w) => w.slug === name || w.employer === name) || {};
  const language = useAtomValue(languageAtom);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);

  useEffect(() => {
    if (work.employer)
      document.title = `${t(work.employer, work.employer_chinese)} | Heng (Jimmy) Sun`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [work.employer, language]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleViewDetails = () => {
    if (selectedProject) {
      setIsModalOpen(false);
      navigate(`${NAV_BAR.projects.path}/${selectedProject.slug}`);
    }
  };

  if (!work.employer) return <NotFound />;

  return (
    <Page className="detail">
      <Link className="back-link" to={ANCHORS.experience}>
        <ArrowBackRoundedIcon fontSize="small" />
        {t("Research experience", "科研经历")}
      </Link>

      <div className="detail__hero">
        <div className="tech-row">
          {work.techStack.map((tech) => (
            <TechStackIcon key={`work-tech-stack-${tech}`} stack={tech} />
          ))}
        </div>
        <h1 className="detail__title">
          {t(work.employer, work.employer_chinese)}
        </h1>
        <div className="detail__subtitle">
          {t(work.position, work.position_chinese)}
        </div>
        <div className="work-card__meta card-meta">
          <span>
            <PlaceRoundedIcon fontSize="inherit" />
            {t(work.location, work.location_chinese)}
          </span>
          <span>
            <CalendarMonthRoundedIcon fontSize="inherit" />
            {t(work.time, work.time_chinese)}
          </span>
        </div>
      </div>

      <Reveal className="card-surface detail__body">
        <ul>
          {(language === LANGUAGE.chinese.value
            ? work?.description_chinese
            : work?.description
          )?.map((des) => (
            <li key={`work-description-${des}`}>{des}</li>
          ))}
        </ul>
      </Reveal>

      {work?.projects && (
        <section className="mt-5">
          <h2 className="subsection-title mx-0">
            {t("Related Projects", "相关项目")}
            <span className="count">{work.projects.length}</span>
          </h2>
          <div className="card-grid card-grid--auto px-0">
            {work.projects.map((project, index) => (
              <Reveal key={`work-projects-${index}`} delay={(index % 3) * 0.06}>
                <ProjectCard
                  project={project}
                  language={language}
                  onClick={handleCardClick}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <ProjectModal
        project={selectedProject}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onViewDetails={handleViewDetails}
        language={language}
        showPlaceholder={false}
      />
    </Page>
  );
}
