import { Link, useLocation } from 'react-router-dom';
import TechStackIcon from '../common/TechStackIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import NotFound from './NotFound';
import { Grid } from '@mui/material';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';

export default function Project() {
  const location = useLocation();
  const project = location.state || {};
  const language = useAtomValue(languageAtom);

  if (project.title) {
    document.title = `Jimmy | ${getCurrentLanguageText(
      language,
      project.title,
      project.title_chinese
    )}`;
  }

  return (
    <div className='d-flex flex-column'>
      <div className='px-5 my-5'>
        <Link className='text-success' to={NAV_BAR.projects.path}>
          <ArrowBackIcon></ArrowBackIcon>
        </Link>
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
                {project.papers.map((paper) => (
                  <button
                    key={`project-paper-${paper}`}
                    type='button'
                    className='btn btn-primary'
                  >
                    <a
                      key={`project-papers-paper-${paper}`}
                      href={paper}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-100 text-decoration-none text-white'
                    >
                      {getCurrentLanguageText(
                        language,
                        'Click here to view the paper',
                        '点此处阅读文献'
                      )}
                    </a>
                  </button>
                ))}
              </div>
            )}

            {project?.images && (
              <Grid
                container
                className='d-flex mt-5'
                justifyContent={'center'}
                alignItems={'baseline'}
              >
                {project?.images?.map((img) => (
                  <Grid
                    item
                    md={5}
                    className='m-2'
                    key={`project-images-${img}`}
                  >
                    <img src={img} alt='project' className='img-fluid'></img>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
