import './indeix.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Contact() {
  return (
    <div className='main-content'>
      <div className='contact'>
        <h2 className='contact-title'>
          Let's Get in Touch: Ways to Connect with Me
        </h2>
        <p className='contact-description'>
          Thank you for your interest in getting in touch with me. I welcome
          your feedback, questions, and suggestions. If you have a specific
          question or comment, please feel free to email me. I make an effort to
          respond to all messages within 24 hours, although it may take me
          longer during busy periods. Thanks again for your interest, and I look
          forward to hearing from you!
        </p>
        <div className='introduction-icon-list'></div>
      </div>
      <div className='contact' style={{ width: '100%' }}>
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
