import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Projects from '../projects/projects';
import WorkingExperience from '../workingExperience';
import web_development_animation from '../../assets/web_development.json';
import Lottie from 'lottie-react';
import { Grid } from '@mui/material';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
import { language_correct } from '../../utils/switch_language';
import { NAV_BAR } from '../../const/navBar_const';

export default function Home() {
  const language = useAtomValue(languageAtom);
  return (
    <div className='container'>
      <Grid container className='mt-5'>
        <Grid item md={8}>
          <h2 className='text-center fw-bold'>
            {language_correct(
              language,
              'Full-stack web application developer',
              '全栈网络应用程序开发者'
            )}
          </h2>
          <p className='fs-5 text-secondary'>
            {language_correct(
              language,
              `
            🚀 Hi, I'm Heng Sun, a recent graduate with a Bachelor of Science in
            Computer Science from the University of Florida.`,
              `
            🚀 你好，我是孙恒，刚刚从佛罗里达大学计算机科学专业毕业，获得理学学士学位`
            )}
          </p>
          <p className='fs-5 text-secondary'>
            {language_correct(
              language,
              `🎓 Eager to further my academic journey, I aspire to pursue a Ph.D.
            position that aligns with my passion for human-centered interaction,
            machine learning models, and the exciting realm of IoT.`,
              `🎓 渴望进一步我的学术之旅，我希望攻读与我对以人为中心的交互、
              机器学习模型和物联网领域的激情相符的博士学位。`
            )}
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
      <h2 className='text-center'>
        {language_correct(
          language,
          NAV_BAR.workingExperience.title,
          NAV_BAR.workingExperience.titleChinese
        )}
      </h2>
      <WorkingExperience hideHeader={true} />
      <h2 className='text-center'>
        {language_correct(
          language,
          NAV_BAR.projects.title,
          NAV_BAR.projects.titleChinese
        )}
      </h2>
      <Projects hideHeader={true}></Projects>
    </div>
  );
}
