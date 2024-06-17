import { projects } from '../../constants/projects';
import TechStackIcon from '../common/TechStackIcon';
import { Link } from 'react-router-dom';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { motion } from 'framer-motion';

export default function Projects({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);

  useEffect(() => {
    if (!hideHeader)
      document.title = `Jimmy | ${getCurrentLanguageText(
        language,
        NAV_BAR.projects.title,
        NAV_BAR.projects.titleChinese
      )}`;
  }, [hideHeader, language]);

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
      <Grid container className='justify-content-center'>
        {projects.map((project, index) => {
          if (hideHeader && index > 1) return <div key={`work-${index}`}></div>;
          return (
            <Grid
              item
              md={5}
              key={`projects-${index}`}
              className='box shadow p-3 rounded m-4'
            >
              <Link
                to={`${NAV_BAR.projects.path}/${project.title}`}
                className='text-decoration-none'
                state={project}
              >
                <div>
                  {project.techStack.map((tech) => (
                    <TechStackIcon key={`projects-tech-${tech}`} stack={tech} />
                  ))}
                </div>
                <div className='fs-5 fw-bold text-black'>
                  {getCurrentLanguageText(
                    language,
                    project.title,
                    project.title_chinese
                  )}
                </div>
                <div className='text-black fst-italic'>
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
                      className='text-secondary'
                    >
                      {description}
                    </li>
                  ))}
                </ul>
                {project.images && (
                  <img
                    className='img-fluid'
                    src={project.images[0]}
                    alt='projects'
                  ></img>
                )}
              </Link>
            </Grid>
          );
        })}
        {projects.length % 2 !== 0 && (
          <Grid item md={5} className='p-3 rounded m-4' />
        )}
      </Grid>
    </motion.div>
  );
}
