import { projects } from '../../constants/projects';
import TechStackIcon from '../common/TechStackIcon';
import { useNavigate } from 'react-router-dom';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { motion } from 'framer-motion';
import { useMediaQuery, Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  getAllCategories,
  getCategoriesFromTechStack,
  getCategoriesText,
} from '../../utils/get-projects-categories';

export default function Projects({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);
  const navigate = useNavigate();
  const isMobileMatch = useMediaQuery('(max-width:600px)');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allCategories = getAllCategories();

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleViewDetails = () => {
    if (selectedProject) {
      navigate(`${NAV_BAR.projects.path}/${selectedProject.title}`, {
        state: selectedProject,
      });
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (!hideHeader)
      document.title = `Jimmy | ${getCurrentLanguageText(
        language,
        NAV_BAR.projects.title,
        NAV_BAR.projects.titleChinese
      )}`;
  }, [hideHeader, language]);

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) =>
          getCategoriesFromTechStack(project.techStack).includes(
            selectedCategory
          )
        );

  return (
    <motion.div
      className='container'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!hideHeader && (
        <div className='px-3'>
          <h1 className='text-left w-50 mt-5'>
            {getCurrentLanguageText(
              language,
              `Things I've made trying to put my dent in the universe.`,
              '我为之努力，试图在世界上留下自己的一点印记。'
            )}
          </h1>
          <p className='fs-5 text-secondary'>
            {getCurrentLanguageText(
              language,
              `Embark on a journey through the projects that define my quest for
            innovation and impact. Over the years, I've poured my heart and soul
            into a diverse array of endeavors, each contributing to my ongoing
            mission to make a meaningful mark on the world.`,
              `踏上一段旅程，穿越那些定义了我追求创新和影响力的项目。
              多年来，我倾注了心血和灵魂在各种不同的努力中，
              每一个都为我不断前行的使命做出了贡献，
              希望在世界上留下有意义的印记。`
            )}
          </p>
        </div>
      )}
      {/* CATEGORY FILTER UI */}
      {!hideHeader && (
        <div className='d-flex flex-wrap justify-content-center gap-3 mt-4 mb-4'>
          <button
            className={`btn btn-sm rounded-pill shadow-sm px-3 py-2 transition-all ${
              selectedCategory === 'all'
                ? 'text-white'
                : 'btn-outline-secondary'
            }`}
            style={{
              backgroundColor:
                selectedCategory === 'all' ? '#14b8a6' : 'transparent',
              borderColor: selectedCategory === 'all' ? '#14b8a6' : '#6c757d',
              color: selectedCategory === 'all' ? 'white' : '#6c757d',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setSelectedCategory('all')}
            onMouseEnter={(e) => {
              if (selectedCategory !== 'all') {
                e.target.style.backgroundColor = '#14b8a6';
                e.target.style.borderColor = '#14b8a6';
                e.target.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== 'all') {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = '#6c757d';
                e.target.style.color = '#6c757d';
              }
            }}
          >
            {`${getCategoriesText('all', language)} (${projects.length})`}
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill shadow-sm text-capitalize px-3 py-2 transition-all ${
                selectedCategory === cat
                  ? 'text-white'
                  : 'btn-outline-secondary'
              }`}
              style={{
                backgroundColor:
                  selectedCategory === cat ? '#14b8a6' : 'transparent',
                borderColor: selectedCategory === cat ? '#14b8a6' : '#6c757d',
                color: selectedCategory === cat ? 'white' : '#6c757d',
                transition: 'all 0.3s ease',
              }}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.backgroundColor = '#14b8a6';
                  e.target.style.borderColor = '#14b8a6';
                  e.target.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#6c757d';
                  e.target.style.color = '#6c757d';
                }
              }}
            >
              {`${getCategoriesText(cat, language)} (${
                projects.filter((project) =>
                  getCategoriesFromTechStack(project.techStack).includes(cat)
                ).length
              })`}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobileMatch
            ? '1fr'
            : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          padding: '0 16px',
          width: '100%',
        }}
      >
        {(hideHeader ? filteredProjects.slice(0, 2) : filteredProjects).map(
          (project, index) => {
            return (
              <div
                key={`projects-${index}`}
                className='box shadow rounded'
                style={{
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => handleCardClick(project)}
              >
                <div
                  className='p-3'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: '280px',
                  }}
                >
                  {project.images && (
                    <div
                      style={{
                        width: '100%',
                        maxHeight: hideHeader ? '280px' : '160px',
                        overflow: 'hidden',
                        borderRadius: '4px',
                        marginBottom: '12px',
                      }}
                    >
                      <img
                        src={project.images[0]}
                        alt='projects'
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      ></img>
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                      justifyContent: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    {project.techStack.slice(0, 6).map((tech) => (
                      <TechStackIcon
                        key={`projects-tech-${tech}`}
                        stack={tech}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h2
                      className='fs-6 fw-bold mb-1'
                      style={{
                        margin: 0,
                        lineHeight: '1.3',
                        textAlign: 'center',
                        marginBottom: '8px',
                        color: 'black',
                      }}
                    >
                      {getCurrentLanguageText(
                        language,
                        project.title,
                        project.title_chinese
                      )}
                    </h2>
                    <div
                      className='fst-italic text-secondary text-center'
                      style={{ fontSize: '0.875rem', marginTop: 'auto' }}
                    >
                      {getCurrentLanguageText(
                        language,
                        project.time,
                        project.time_chinese
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby='project-modal-title'
        aria-describedby='project-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobileMatch ? '90%' : '80%',
            maxWidth: '800px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
          }}
        >
          {selectedProject && (
            <>
              <div className='d-flex justify-content-between align-items-start mb-3'>
                <h2
                  id='project-modal-title'
                  className='fs-4 fw-bold'
                  style={{ margin: 0 }}
                >
                  {getCurrentLanguageText(
                    language,
                    selectedProject.title,
                    selectedProject.title_chinese
                  )}
                </h2>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{ color: '#14b8a6' }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div className='mb-3'>
                <div className='d-flex flex-wrap gap-2 mb-3'>
                  {selectedProject.techStack.map((tech) => (
                    <TechStackIcon key={`modal-tech-${tech}`} stack={tech} />
                  ))}
                </div>
                <div className='fst-italic text-secondary mb-3'>
                  {getCurrentLanguageText(
                    language,
                    selectedProject.time,
                    selectedProject.time_chinese
                  )}
                </div>
                {selectedProject.images && (
                  <div className='mb-3'>
                    <img
                      className='img-fluid'
                      src={selectedProject.images[0]}
                      alt='project'
                      style={{
                        borderRadius: '4px',
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
                <ul>
                  {(language === LANGUAGE.chinese.value
                    ? selectedProject.description_chinese
                    : selectedProject.description
                  ).map((description, idx) => (
                    <li
                      key={`modal-des-${idx}`}
                      className='text-secondary mb-2'
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='d-flex justify-content-end mt-4'>
                <Button
                  variant='contained'
                  onClick={handleViewDetails}
                  sx={{
                    backgroundColor: '#14b8a6',
                    '&:hover': {
                      backgroundColor: '#0d9488',
                    },
                  }}
                >
                  {getCurrentLanguageText(
                    language,
                    'View Full Details',
                    '查看完整详情'
                  )}
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </motion.div>
  );
}
