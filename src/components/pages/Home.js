import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Projects from './Projects';
import WorkingExperience from './Works';
import web_development_animation from '../../assets/animations/web_development.json';
import Lottie from 'lottie-react';
import { Grid } from '@mui/material';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { getCurrentLanguageText } from '../../utils/get-current-language-text';
import { NAV_BAR } from '../../constants/navbar-items';
import { motion } from 'framer-motion';
import Publications from './Publications';

export default function Home() {
  const language = useAtomValue(languageAtom);

  const TEXT_1 = getCurrentLanguageText(
    language,
    `
  🚀 Hi, I'm Heng Sun — a CS graduate from the University of Florida
  and a Research Assistant in AI for healthcare at UF.`,
    `
  🚀 你好，我是孙恒，佛罗里达大学计算机科学专业毕业生，
  现任佛罗里达大学医疗人工智能研究助理。`
  ).split(' ');

  const TEXT_2 = getCurrentLanguageText(
    language,
    `
  🎓 I'm applying for Ph.D. programs to advance AI systems that
  combine multimodal data and human-centered design for medicine.`,
    `
  🎓 我正在申请博士项目，致力于开发结合多模态数据
  与以人为本设计的医疗人工智能系统。`
  ).split(' ');

  return (
    <motion.div
      className='container'
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container className='my-5 px-3' justifyContent={'center'} gap={5}>
        <Grid item md={4}>
          <h2 className='text-center fw-bold'>
            {getCurrentLanguageText(
              language,
              'Full-stack web application developer',
              '全栈网络应用程序开发者'
            )}
          </h2>
          <p className='fs-5 text-secondary'>
            {TEXT_1.map((el, i) => (
              <motion.span
                className='fs-5 text-secondary'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i / 10 }}
              >
                {el}{' '}
              </motion.span>
            ))}
          </p>
          <p className='fs-5 text-secondary'>
            {TEXT_2.map((el, i) => (
              <motion.span
                className='fs-5 text-secondary'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i / 10 }}
              >
                {el}{' '}
              </motion.span>
            ))}
          </p>
        </Grid>
        <Grid item md={4}>
          <div className='mx-2'>
            <Lottie
              className='img-fluid'
              animationData={web_development_animation}
            ></Lottie>
          </div>
        </Grid>
      </Grid>

      <div className='d-flex justify-content-center mb-5 mt-2'>
        <GitHubIcon
          className='mx-3'
          role='button'
          color='action'
          fontSize='large'
          onClick={() => window.open('https://github.com/jimmysoccer')}
        ></GitHubIcon>
        <EmailIcon
          className='mx-3'
          role='button'
          fontSize='large'
          onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
        ></EmailIcon>
        <LinkedInIcon
          className='mx-3'
          role='button'
          fontSize='large'
          onClick={() =>
            window.open('https://www.linkedin.com/in/jimmysoccer/')
          }
        ></LinkedInIcon>
      </div>
      <h2 className='text-center my-5'>
        {getCurrentLanguageText(
          language,
          NAV_BAR.workingExperience.title,
          NAV_BAR.workingExperience.titleChinese
        )}
      </h2>
      <WorkingExperience hideHeader={true} />
      <h2 className='text-center my-5'>
        {getCurrentLanguageText(
          language,
          NAV_BAR.projects.title,
          NAV_BAR.projects.titleChinese
        )}
      </h2>
      <Projects hideHeader={true}></Projects>
      <h2 className='text-center my-5'>
        {getCurrentLanguageText(
          language,
          NAV_BAR.publications.title,
          NAV_BAR.publications.titleChinese
        )}
      </h2>
      <Publications hideHeader={true}></Publications>
    </motion.div>
  );
}
