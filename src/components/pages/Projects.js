import { projects } from '../../constants/projects';
import TechStackIcon from '../common/TechStackIcon';
import { Link } from 'react-router-dom';
import { LANGUAGE, NAV_BAR } from '../../constants/navbar-items';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { motion } from 'framer-motion';
import Masonry from '@mui/lab/Masonry';
import { useMediaQuery } from '@mui/material';
import {
  getAllCategories,
  getCategoriesFromTechStack,
  getCategoriesText,
} from '../../utils/get-projects-categories';

export default function Projects({ hideHeader = false }) {
  const language = useAtomValue(languageAtom);
  const isMobileMatch = useMediaQuery('(max-width:600px)');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const allCategories = getAllCategories();

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

      <Masonry
        columns={isMobileMatch ? 1 : 2}
        spacing={2}
        className='container '
      >
        {(hideHeader ? filteredProjects.slice(0, 2) : filteredProjects).map(
          (project, index) => {
            return (
              <div
                key={`projects-${index}`}
                className='box shadow p-3 rounded m-2 fs-5'
                style={{
                  height: `${hideHeader ? '500px' : 'auto'}`,
                  overflow: 'hidden',
                }}
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
              </div>
            );
          }
        )}
      </Masonry>
    </motion.div>
  );
}
