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
    <div className='container'>
      <Grid container className='mt-5 justify-content-center'>
        <Grid item md={7}>
          <h2 className='text-center fw-bold'>
            I am Heng Sun. I live in Gainesville.
          </h2>
          <p className='fs-5 text-secondary'>
            I am Heng Sun. You can call me Jimmy. I live in Gainesville, FL. I
            am working from home right now. I am passionate about creating
            high-quality code that follows best practices and industry
            standards. I am always looking for new challenges and opportunities
            to grow as a developer.
          </p>
        </Grid>
        <Grid item md={5}>
          <img className='img-fluid' src={aboutImage} alt='about me' />
          <div
            className='d-flex justify-content-center my-2'
            onClick={() => window.open('https://github.com/jimmysoccer')}
          >
            <GitHubIcon className='me-3'></GitHubIcon>
            <div>Follow on GitHub</div>
          </div>
          <div
            className='d-flex justify-content-center my-2'
            onClick={() =>
              window.open('https://www.linkedin.com/in/jimmysoccer/')
            }
          >
            <LinkedInIcon className='me-3'></LinkedInIcon>
            <div>Follow on LinkedIn</div>
          </div>
          <div
            className='d-flex justify-content-center my-2'
            onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
          >
            <EmailIcon className='me-3'></EmailIcon>
            <div>Email</div>
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
