import { Link, useLocation } from 'react-router-dom';
import TechStackIcon from '../common/TechStackIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import NotFound from './NotFound';
import { Grid, useMediaQuery } from '@mui/material';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import ImageCarousel from '../common/ImageCarousel';
import { motion } from 'framer-motion';
import Publication from '../common/Publication';

export default function Project() {
  const location = useLocation();
  const project = location.state || {};
  const language = useAtomValue(languageAtom);
  const isMobileMatch = useMediaQuery('(max-width:600px)');

  if (project.title) {
    document.title = `Jimmy | ${getCurrentLanguageText(
      language,
      project.title,
      project.title_chinese
    )}`;
  }

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
          <Link className='text-success' to={NAV_BAR.projects.path}>
            <ArrowBackIcon></ArrowBackIcon>
          </Link>
        </div>
      </div>
      {Object.keys(project).length === 0 ? (
        <NotFound />
      ) : (
        <div className='d-flex justify-content-center'>
          <div className='text-center m-3 w-75'>
            {project.techStack.map((tech) => (
              <TechStackIcon key={`project-tech-stack-${tech}`} stack={tech} />
            ))}
            <h1>
              {getCurrentLanguageText(
                language,
                project.title,
                project.title_chinese
              )}
            </h1>
            <h2>
              {getCurrentLanguageText(
                language,
                project.time,
                project.time_chinese
              )}
            </h2>
            <ul className='text-start'>
              {(language === LANGUAGE.chinese.value
                ? project?.description_chinese
                : project?.description
              )?.map((des) => (
                <li key={`project-description-${des}`}>{des}</li>
              ))}
            </ul>

            {project?.papers && (
              <div className='mt-5'>
                <h2>
                  {getCurrentLanguageText(
                    language,
                    'Related Publications',
                    '相关刊物'
                  )}
                </h2>

                {project.papers.map((paper) => (
                  <Publication publication={paper}></Publication>
                ))}
              </div>
            )}
            {isMobileMatch ? (
              project?.images && (
                <Grid
                  container
                  className='d-flex mt-5'
                  justifyContent={'center'}
                  alignItems={'baseline'}
                >
                  {project.images.map((img) => (
                    <Grid
                      item
                      md={5}
                      className='m-2'
                      key={`project-images-${img}`}
                    >
                      <img src={img} alt='project' className='img-fluid'></img>
                    </Grid>
                  ))}
                  <Grid
                    item
                    md={5}
                    className='m-2'
                    key={`project-images-placeholder`}
                  ></Grid>
                </Grid>
              )
            ) : (
              <ImageCarousel images={project?.images}></ImageCarousel>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
