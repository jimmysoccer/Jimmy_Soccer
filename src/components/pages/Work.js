import { Link, useLocation } from 'react-router-dom';
import TechStackIcon from '../common/TechStackIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import NotFound from './NotFound';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { workingExperience } from '../../constants/work-items';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';

export default function Work() {
  const location = useLocation();
  const work = location.state || {};
  const language = useAtomValue(languageAtom);

  if (work.employer) {
    document.title = `Jimmy | ${getCurrentLanguageText(
      language,
      work.employer,
      work.employer_chinese
    )}`;
  }
  workingExperience.map((a) => a.description);

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
            <Grid container justifyContent={'center'} className='w-75'>
              {work?.projects && (
                <h2 className='w-100 m-3 text-center'>Sample Projects</h2>
              )}
              {work?.projects?.map((project, index) => (
                <Grid
                  item
                  md={5}
                  key={`work-projects-${index}`}
                  className='box shadow p-3 rounded m-4'
                >
                  <Link
                    to={`${NAV_BAR.projects.path}/${project.title}`}
                    className='text-decoration-none'
                    state={project}
                  >
                    <div>
                      {project.techStack.map((tech) => (
                        <TechStackIcon
                          key={`projects-tech-${tech}`}
                          stack={tech}
                        />
                      ))}
                    </div>
                    <div className='fs-5 fw-bold text-black'>
                      {getCurrentLanguageText(
                        language,
                        project.title,
                        project.title_chinese
                      )}
                    </div>
                    <div className='text-black'>
                      {getCurrentLanguageText(
                        language,
                        project.time,
                        project.time_chinese
                      )}
                    </div>
                    <ul>
                      {(language === LANGUAGE.chinese.value
                        ? project.description_chinese
                        : project.description
                      ).map((description) => (
                        <li
                          key={`projects-project-des-${description}`}
                          className='text-secondary text-start'
                        >
                          {description}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </motion.div>
  );
}
