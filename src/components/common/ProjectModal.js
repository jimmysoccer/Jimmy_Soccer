import { Modal, IconButton, Button, Fade } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import TechStackIcon from "./TechStackIcon";
import { PROJECT_PLACEHOLDER, projectKeywords } from "./ProjectCard";
import { LANGUAGE } from "../../constants/navbar-items";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";

export default function ProjectModal({
  project,
  open,
  onClose,
  onViewDetails,
  language,
  showPlaceholder = true,
}) {
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="project-modal-title"
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backgroundColor: "rgba(15,23,42,0.45)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      <Fade in={open} timeout={300}>
        <div className="modal-card">
          {project && (
            <>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <h2 id="project-modal-title" className="fs-3 fw-bold mb-1">
                    {t(project.title, project.title_chinese)}
                  </h2>
                  <div className="card-meta">
                    {t(project.time, project.time_chinese)}
                  </div>
                </div>
                <IconButton
                  onClick={onClose}
                  aria-label="Close"
                  sx={{ bgcolor: "rgba(15,23,42,0.05)" }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </div>
              {project.summary && (
                <p
                  className="page-lead mt-3 mb-2"
                  style={{ fontSize: "1.02rem" }}
                >
                  {t(project.summary, project.summary_chinese)}
                </p>
              )}
              <div className="d-flex flex-wrap gap-2 mb-1">
                {projectKeywords(project, language).map((k) => (
                  <span key={k} className="tag">
                    {k}
                  </span>
                ))}
              </div>
              <div className="tech-row mt-3">
                {project.techStack.map((tech) => (
                  <TechStackIcon key={`modal-tech-${tech}`} stack={tech} />
                ))}
              </div>
              {(project.images || showPlaceholder) && (
                <div className="modal-card__media">
                  <img
                    src={project?.images?.[0] || PROJECT_PLACEHOLDER}
                    alt={project.title}
                  />
                </div>
              )}
              <ul className="list-clean">
                {(language === LANGUAGE.chinese.value
                  ? project.description_chinese
                  : project.description
                )?.map((description, idx) => (
                  <li key={`modal-des-${idx}`}>{description}</li>
                ))}
              </ul>
              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="contained"
                  size="large"
                  onClick={onViewDetails}
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  {t("View Full Details", "查看完整详情")}
                </Button>
              </div>
            </>
          )}
        </div>
      </Fade>
    </Modal>
  );
}
