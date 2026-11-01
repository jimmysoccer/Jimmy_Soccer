import { projects } from '../../constants/projects';
import { PROJECT_CATEGORIES } from '../../constants/project-categories';
import { useNavigate } from 'react-router-dom';
import { NAV_BAR } from '../../constants/navbar-items';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { EASE, Page, PageHeader, Reveal } from '../common/Motion';
import ProjectCard from '../common/ProjectCard';
import ProjectModal from '../common/ProjectModal';

const countOf = (key) =>
  key === 'all'
    ? projects.length
    : projects.filter((p) => p.category === key).length;

export default function Projects({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const modal = (
    <ProjectModal
      project={selectedProject}
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onViewDetails={handleViewDetails}
      language={language}
    />
  );

  // Home page: featured projects only.
  if (hideHeader) {
    return (
      <>
        <div className="card-grid card-grid--3">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <Reveal key={`projects-${project.slug}`} delay={index * 0.07}>
                <ProjectCard
                  project={project}
                  language={language}
                  onClick={handleCardClick}
                />
              </Reveal>
            ))}
        </div>
        {modal}
      </>
    );
  }

  const groups = PROJECT_CATEGORIES.filter(
    (c) => filter === 'all' || c.key === filter
  );

  return (
    <Page>
      <PageHeader
        eyebrow={t('Projects', '项目')}
        title={t('From Ideas to Systems', '从想法到系统')}
        lead={t(
          'Selected research systems, AI applications, and software engineering projects — described by the problem they address and what I contributed, not just the tools used.',
          '精选的科研系统、AI 应用与软件工程项目——重点介绍它们要解决的问题以及我的贡献，而不只是所用的技术。'
        )}
      />

      <div
        className="filter-bar"
        role="toolbar"
        aria-label={t('Filter projects', '筛选项目')}
      >
        {[{ key: 'all', en: 'All', zh: '全部' }, ...PROJECT_CATEGORIES].map(
          (f) => (
            <button
              key={f.key}
              type="button"
              className={`chip ${filter === f.key ? 'is-active' : ''}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              <span>{t(f.en, f.zh)}</span>
              <span className="chip-count">{countOf(f.key)}</span>
            </button>
          )
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {groups.map((group) => (
            <section key={group.key} className="project-group">
              <div className="project-group__head">
                <h2 className="subsection-title mb-1">
                  {t(group.en, group.zh)}
                  <span className="count">{countOf(group.key)}</span>
                </h2>
                <p className="card-meta mb-0">{t(group.den, group.dzh)}</p>
              </div>
              <div className="card-grid card-grid--3">
                {projects
                  .filter((p) => p.category === group.key)
                  .map((project) => (
                    <ProjectCard
                      key={`projects-${project.slug}`}
                      project={project}
                      language={language}
                      onClick={handleCardClick}
                    />
                  ))}
              </div>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
      {modal}
    </Page>
  );
}
