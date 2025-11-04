import { Link, useLocation, useNavigate } from 'react-router-dom';
import TechStackIcon from '../common/TechStackIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import NotFound from './NotFound';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { workingExperience } from '../../constants/work-items';
import { useMediaQuery, Modal, Box, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Work() {
  const location = useLocation();
  const navigate = useNavigate();
  const work = location.state || {};
  const language = useAtomValue(languageAtom);
  const isMobileMatch = useMediaQuery('(max-width:600px)');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (work.employer) {
    document.title = `Jimmy | ${getCurrentLanguageText(
      language,
      work.employer,
      work.employer_chinese
    )}`;
  }
  workingExperience.map((a) => a.description);

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

  return (
    <motion.div
      className='d-flex flex-column'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='px-5 my-5 d-flex justify-content-center'>
        <div className='w-75'>
          <Link className='text-success' to={NAV_BAR.workingExperience.path}>
            <ArrowBackIcon></ArrowBackIcon>
          </Link>
        </div>
      </div>
      {Object.keys(work).length === 0 ? (
        <NotFound />
      ) : (
        <>
          <div className='d-flex justify-content-center'>
            <div className='text-center m-3 w-75'>
              {work.techStack.map((tech) => (
                <TechStackIcon
                  key={`project-tech-stack-${tech}`}
                  stack={tech}
                />
              ))}
              <h1>
                {getCurrentLanguageText(
                  language,
                  work.employer,
                  work.employer_chinese
                )}
              </h1>
              <h2>
                {getCurrentLanguageText(
                  language,
                  work.position,
                  work.position_chinese
                )}
              </h2>
              <h3 className='fs-5'>
                {getCurrentLanguageText(
                  language,
                  work.location,
                  work.location_chinese
                )}
              </h3>
              <h3 className='fs-5'>
                {getCurrentLanguageText(language, work.time, work.time_chinese)}
              </h3>
              <ul className='text-start'>
                {(language === LANGUAGE.chinese.value
                  ? work?.description_chinese
                  : work?.description
                )?.map((des) => (
                  <li key={`project-description-${des}`}>{des}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className='w-75'>
              {work?.projects && (
                <h2 className='w-100 m-3 text-center'>Sample Projects</h2>
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
                {work?.projects?.map((project, index) => {
                  return (
                    <div
                      key={`work-projects-${index}`}
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
                              height: '160px',
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
                })}
              </div>
            </div>
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
                        <TechStackIcon
                          key={`modal-tech-${tech}`}
                          stack={tech}
                        />
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
        </>
      )}
    </motion.div>
  );
}
