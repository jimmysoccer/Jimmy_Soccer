import './index.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { UFImage, aboutImage, aquinasImage } from '../../imgs/images';
import { educationExperience } from '../../const/education';
import { useEffect } from 'react';
import { Grid } from '@mui/material';
// import { getEducationHistory } from '../../fetch/getEducationHistory';

export default function About() {
  useEffect(() => {
    // const res = getEducationHistory();
  }, []);

  return (
    <div className='main-content'>
      <div className='introduction'>
        <div className='introduction-main-content'>
          <div className='introduction-main-content-text'>
            <h2
              className='introduction-main-content-text-title'
              style={{ textAlign: 'left' }}
            >
              I am Heng Sun. I live in Gainesville.
            </h2>
            <p className='introduction-main-content-text-description'>
              I am Heng Sun. You can call me Jimmy. I live in Gainesville, FL. I
              am working from home right now. I am passionate about creating
              high-quality code that follows best practices and industry
              standards. I am always looking for new challenges and
              opportunities to grow as a developer.
            </p>
          </div>
          <div className='introduction-main-content-image'>
            <img className='about-image' src={aboutImage} alt='about me' />
            <div
              className='about-icon-container'
              onClick={() => window.open('https://github.com/jimmysoccer')}
            >
              <GitHubIcon className='about-icon'></GitHubIcon>
              <div className='about-icon-text'>Follow on GitHub</div>
            </div>
            <div
              className='about-icon-container'
              onClick={() =>
                window.open('https://www.linkedin.com/in/jimmysoccer/')
              }
            >
              <LinkedInIcon className='about-icon'></LinkedInIcon>
              <div className='about-icon-text'>Follow on LinkedIn</div>
            </div>
            <div
              className='about-icon-container'
              onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
            >
              <EmailIcon className='about-icon'></EmailIcon>
              <div className='about-icon-text'>Email</div>
            </div>
          </div>
        </div>
        <div className='introduction-icon-list'></div>
      </div>
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
              {exp.school + ', ' + exp.location + ' --- ' + exp.degree}
            </h3>
            <div className='fs-4'>{exp.time}</div>
            <div className='fs-5 text-secondary'>
              Main courses:{' ' + exp.courses.map((des) => des)}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
