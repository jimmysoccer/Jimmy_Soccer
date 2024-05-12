import './index.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { UFImage, aboutImage, aquinasImage } from '../../imgs/images';
import { educationExperience } from '../../const/education';
import { useEffect } from 'react';
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
              <text className='about-icon-text'>Follow on GitHub</text>
            </div>
            <div
              className='about-icon-container'
              onClick={() =>
                window.open('https://www.linkedin.com/in/jimmysoccer/')
              }
            >
              <LinkedInIcon className='about-icon'></LinkedInIcon>
              <text className='about-icon-text'>Follow on LinkedIn</text>
            </div>
            <div
              className='about-icon-container'
              onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
            >
              <EmailIcon className='about-icon'></EmailIcon>
              <text className='about-icon-text'>Email</text>
            </div>
          </div>
        </div>
        <div className='introduction-icon-list'></div>
      </div>
      <div className='project-list'>
        {educationExperience.map((experience) => {
          return (
            <div className='working-experience'>
              <div className='project-logo-list'>
                {experience.school === 'University of Florida' ? (
                  <img
                    src={UFImage}
                    alt='UF'
                    style={{ height: '57px', width: '300px' }}
                    className='project-logo'
                  ></img>
                ) : experience.school === 'Aquinas High School' ? (
                  <img
                    src={aquinasImage}
                    alt='aquinas'
                    style={{ width: '100px', height: '100px' }}
                    className='project-logo'
                  ></img>
                ) : (
                  ''
                )}
              </div>
              <div className='project-title'>
                {experience.school +
                  ', ' +
                  experience.location +
                  ' --- ' +
                  experience.degree}
              </div>
              <div>{experience.time}</div>
              <ul>
                {experience.courses.map((description) => (
                  <li className='project-description'>{description}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
