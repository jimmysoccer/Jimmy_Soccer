import TechStackIcon from '../common/TechStackIcon';
import { workingExperience } from '../../constants/work-items';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import { Link } from 'react-router-dom';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Reveal } from '../common/Motion';

export function WorkCard({ experience, language }) {
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  return (
    <Link
      to={`${NAV_BAR.workingExperience.path}/${experience.slug}`}
      className="box work-card text-decoration-none"
    >
      <div className="work-card__head">
        <div>
          <h3 className="card-title fs-5">
            {t(experience.employer, experience.employer_chinese)}
          </h3>
          <div className="work-card__role">
            {t(experience.position, experience.position_chinese)}
          </div>
        </div>
        <div className="tech-row">
          {experience.techStack.slice(0, 6).map((tech) => (
            <TechStackIcon key={`work-tech-${tech}`} stack={tech} />
          ))}
        </div>
      </div>
      <div className="work-card__meta card-meta">
        <span>
          <PlaceRoundedIcon fontSize="inherit" />
          {t(experience.location, experience.location_chinese)}
        </span>
        <span>
          <CalendarMonthRoundedIcon fontSize="inherit" />
          {t(experience.time, experience.time_chinese)}
        </span>
      </div>
      <ul className="list-clean">
        {(language === LANGUAGE.chinese.value
          ? experience.description_chinese
          : experience.description
        ).map((description) => (
          <li key={`work-exper-des-${description}`}>{description}</li>
        ))}
      </ul>
    </Link>
  );
}

export function ExperienceGrid({ list, language, single = false }) {
  return (
    <div
      className={`card-grid ${single ? 'card-grid--single' : 'card-grid--2'}`}
    >
      {list.map((experience, index) => (
        <Reveal
          key={`experience-${experience.slug}`}
          delay={(index % 2) * 0.08}
        >
          <WorkCard experience={experience} language={language} />
        </Reveal>
      ))}
    </div>
  );
}

/** Research + industry experience, rendered inside the Research page. */
export default function ExperienceSection() {
  const language = useAtomValue(languageAtom);
  const t = (en, zh) => getCurrentLanguageText(language, en, zh);
  const research = workingExperience.filter((e) => e.type === 'research');
  const industry = workingExperience.filter((e) => e.type === 'industry');

  return (
    <>
      <ExperienceGrid list={research} language={language} single />
      <h3 className="subsection-title subsection-title--minor">
        {t('Industry Experience', '业界经历')}
        <span className="count">{industry.length}</span>
      </h3>
      <ExperienceGrid list={industry} language={language} />
    </>
  );
}
