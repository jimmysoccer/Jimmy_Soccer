import { Grid } from '@mui/material';
import TechStackIcon from '../common/TechStackIcon';
import { workingExperience } from '../../constants/work-items';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WorkingExperience({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);
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
              'Professional Journey: A Chronicle of Growth',
              '职业旅程：成长的历程'
            )}
          </h1>
          <p className='fs-5 text-secondary'>
            {getCurrentLanguageText(
              language,
              `Embark on a retrospective journey through my professional
            experiences, where each role and project has played a pivotal role
            in shaping my skills and perspective. From early career milestones
            to challenging projects, this timeline reflects my commitment to
            continuous learning and excellence.`,
              `踏上回顾我职业经历的旅程，每一个角色和项目都在塑造我的技能和视角方面发挥了关键作用。
              从早期的职业里程碑到富有挑战性的项目，
              这条时间线反映了我对持续学习和卓越的承诺。`
            )}
          </p>
        </div>
      )}
      <Grid container className='justify-content-center'>
        {workingExperience.map((experience, index) => {
          if (hideHeader && index >= 1)
            return <div key={`work-${index}`}></div>;
          return (
            <Grid
              item
              md={hideHeader ? 10 : 5}
              className='box shadow p-3 rounded m-4'
              key={`work-${index}`}
            >
              <Link
                to={`${NAV_BAR.workingExperience.path}/${experience.employer}`}
                className='text-decoration-none text-black'
                state={experience}
              >
                <div>
                  {experience.techStack.map((tech) => (
                    <TechStackIcon key={`work-tech-${tech}`} stack={tech} />
                  ))}
                </div>
                <h1 className='fs-5 fw-bold'>
                  {getCurrentLanguageText(
                    language,
                    experience.employer,
                    experience.employer_chinese
                  )}
                </h1>
                <div className='fs-5'>
                  {getCurrentLanguageText(
                    language,
                    experience.position,
                    experience.position_chinese
                  )}
                </div>
                <div>
                  {getCurrentLanguageText(
                    language,
                    experience.location,
                    experience.location_chinese
                  )}
                </div>
                <div className='fst-italic'>
                  {getCurrentLanguageText(
                    language,
                    experience.time,
                    experience.time_chinese
                  )}
                </div>
                <ul>
                  {(language === LANGUAGE.chinese.value
                    ? experience.description_chinese
                    : experience.description
                  ).map((description) => (
                    <li
                      className='text-secondary'
                      key={`work-exper-des-${description}`}
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              </Link>
            </Grid>
          );
        })}
        {workingExperience.length % 2 !== 0 && (
          <Grid item md={5} className='p-3 rounded m-4' />
        )}
      </Grid>
    </motion.div>
  );
}
