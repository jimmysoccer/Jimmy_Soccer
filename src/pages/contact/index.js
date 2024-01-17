import './indeix.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Contact() {
  return (
    <div className='main-content'>
      <div className='contact'>
        <h2 className='contact-title'>I am Heng Sun. I live in Gainesville.</h2>
        <text className='contact-description'>
          I am Heng Sun. You can call me Jimmy. I live in Gainesville, FL. I am
          working from home right now. I am passionate about creating
          high-quality code that follows best practices and industry standards.
          I am always looking for new challenges and opportunities to grow as a
          developer.
        </text>
        <div className='introduction-icon-list'></div>
      </div>
      <div className='contact'>
        <div
          className='contact-icon-container'
          onClick={() => window.open('https://github.com/jimmysoccer')}
        >
          <GitHubIcon className='about-icon'></GitHubIcon>
          <text className='about-icon-text'>Follow on GitHub</text>
        </div>
        <div
          className='contact-icon-container'
          onClick={() =>
            window.open('https://www.linkedin.com/in/jimmysoccer/')
          }
        >
          <LinkedInIcon className='about-icon'></LinkedInIcon>
          <text className='about-icon-text'>Follow on LinkedIn</text>
        </div>
        <div
          className='contact-icon-container'
          onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
        >
          <EmailIcon className='about-icon'></EmailIcon>
          <text className='about-icon-text'>Email</text>
        </div>
      </div>
    </div>
  );
}