import { Grid } from '@mui/material';
import TechStackIcon from '../common/TechStackIcon';
import { workingExperience } from '../../constants/work-items';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { LANGUAGE } from '../../constants/navbar-items';

export default function WorkingExperience({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);
  return (
    <div className='container'>
      {!hideHeader && (
        <>
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
        </>
      )}
      <Grid container className='justify-content-center'>
        {workingExperience.map((experience, index) => {
          if (hideHeader && index >= 1)
            return <div key={`work-${index}`}></div>;
          return (
            <Grid
              item
              md={hideHeader ? 10 : 5}
              className='shadow p-3 rounded m-4'
              key={`work-${index}`}
            >
              <div>
                <div>
                  {experience.techStack.map((tech) => (
                    <TechStackIcon key={`work-tech-${tech}`} stack={tech} />
                  ))}
                </div>
                <div className='fs-5 fw-bold text-black'>
                  {getCurrentLanguageText(
                    language,
                    experience.employer +
                      ', ' +
                      experience.location +
                      ' --- ' +
                      experience.position,
                    experience.employer_chinese +
                      ', ' +
                      experience.location_chinese +
                      ' --- ' +
                      experience.position_chinese
                  )}
                </div>
                <div>
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
              </div>
            </Grid>
          );
        })}
        {workingExperience.length % 2 !== 0 && (
          <Grid item md={5} className='p-3 rounded m-4' />
        )}
      </Grid>
    </div>
  );
}
