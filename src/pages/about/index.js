import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { UFImage, aboutImage, aquinasImage } from '../../imgs/images';
import { educationExperience } from '../../const/education';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { language_correct } from '../../utils/switch_language';
import { useAtomValue } from 'jotai';
import { languageAtom } from '../../atoms/primitive.atom';
// import { getEducationHistory } from '../../fetch/getEducationHistory';

export default function About() {
  const language = useAtomValue(languageAtom);
  useEffect(() => {
    // const res = getEducationHistory();
  }, []);

  return (
    <div className='container'>
      <Grid container className='mt-5 justify-content-center'>
        <Grid item md={7}>
          <h2 className='text-center fw-bold'>
            {language_correct(
              language,
              `I am Heng Sun. I live in Gainesville.`,
              `我是孙恒，现居于盖恩斯维尔，佛罗里达州`
            )}
          </h2>
          <p className='fs-5 text-secondary'>
            {language_correct(
              language,
              `I am Heng Sun. You can call me Jimmy. I live in Gainesville, FL. I
            am working from home right now. I am passionate about creating
            high-quality code that follows best practices and industry
            standards. I am always looking for new challenges and opportunities
            to grow as a developer.`,
              `我是孙恒, 你可以叫我Jimmy。我住在佛罗里达州的盖恩斯维尔。
              目前在家工作。我热衷于编写遵循最佳实践和行业标准的高质量代码，
              并且始终在寻找新的挑战和机会，以便在开发者的道路上不断成长。`
            )}
          </p>
        </Grid>
        <Grid item md={5}>
          <img className='img-fluid' src={aboutImage} alt='about me' />
          <div
            className='d-flex justify-content-center my-2'
            onClick={() => window.open('https://github.com/jimmysoccer')}
          >
            <GitHubIcon className='me-3'></GitHubIcon>
            <div>
              {language_correct(language, 'Follow on Github', '关注我的Github')}
            </div>
          </div>
          <div
            className='d-flex justify-content-center my-2'
            onClick={() =>
              window.open('https://www.linkedin.com/in/jimmysoccer/')
            }
          >
            <LinkedInIcon className='me-3'></LinkedInIcon>
            <div>
              {language_correct(language, 'Follow on LinkedIn', '关注我的领英')}
            </div>
          </div>
          <div
            className='d-flex justify-content-center my-2'
            onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
          >
            <EmailIcon className='me-3'></EmailIcon>
            <div>{language_correct(language, 'Email', '电子邮箱')}</div>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        {educationExperience.map((exp) => (
          <Grid
            item
            md={12}
            key={`about-education-${exp.school}`}
            className='text-center my-5'
          >
            <div className='d-flex justify-content-center'>
              <img
                src={
                  exp.school === 'University of Florida'
                    ? UFImage
                    : aquinasImage
                }
                alt='school-logo'
                className='img-fluid'
              ></img>
            </div>
            <h3 className='mt-2 mb-0 fs-5'>
              {language_correct(
                language,
                exp.school + ', ' + exp.location + ' --- ' + exp.degree,
                exp.school_chinese +
                  ', ' +
                  exp.location_chinese +
                  ' --- ' +
                  exp.degree_chinese
              )}
            </h3>
            <div className='fs-4'>
              {language_correct(language, exp.time, exp.time_chinese)}
            </div>
            <div className='fs-5 text-secondary'>
              {language_correct(
                language,
                'Main courses: ' + exp.courses.map((des) => des),
                '主要课程: ' + exp.courses_chinese.map((des) => des)
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
