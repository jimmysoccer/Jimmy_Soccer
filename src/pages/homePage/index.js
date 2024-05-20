import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Projects from '../projects/projects';
import WorkingExperience from '../workingExperience';
import web_development_animation from '../../assets/web_development.json';
import Lottie from 'lottie-react';
import { Grid } from '@mui/material';

export default function Home() {
  return (
    <div className='container'>
      <Grid container className='mt-5'>
        <Grid item md={8}>
          <h2 className='text-center fw-bold'>
            Full-stack web application developer
          </h2>
          <p className='fs-5 text-secondary'>
            🚀 Hi, I'm Heng Sun, a recent graduate with a Bachelor of Science in
            Computer Science from the University of Florida.
          </p>
          <p className='fs-5 text-secondary'>
            🎓 Eager to further my academic journey, I aspire to pursue a Ph.D.
            position that aligns with my passion for human-centered interaction,
            machine learning models, and the exciting realm of IoT.
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
      <h2 className='text-center'>Work</h2>
      <WorkingExperience hideHeader={true} />
      <h2 className='text-center'>Projects</h2>
      <Projects hideHeader={true}></Projects>
    </div>
  );
}
