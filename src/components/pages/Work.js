import { Link, useLocation } from 'react-router-dom';
import TechStackIcon from '../common/TechStackIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import NotFound from './NotFound';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { workingExperience } from '../../constants/work-items';

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
    <div className='d-flex flex-column'>
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
        <div className='d-flex justify-content-center'>
          <div className='text-center m-3 w-75'>
            {work.techStack.map((tech) => (
              <TechStackIcon key={`project-tech-stack-${tech}`} stack={tech} />
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
      )}
    </div>
  );
}
