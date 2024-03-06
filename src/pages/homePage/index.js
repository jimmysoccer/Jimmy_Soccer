import './index.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fullStackImage } from '../../imgs/images';
import Projects from '../projects';
import WorkingExperience from '../workingExperience';
export default function Home() {
  return (
    <div className='main-content'>
      <div className='introduction'>
        <div className='introduction-main-content'>
          <div className='introduction-main-content-text'>
            <h2 className='introduction-main-content-text-title'>
              Full-stack web application developer
            </h2>
            <p className='introduction-main-content-text-description'>
              🚀 Hi, I'm Heng Sun, a recent graduate with a Bachelor of Science
              in Computer Science from the University of Florida.
            </p>
            <p className='introduction-main-content-text-description'>
              🎓 Eager to further my academic journey, I aspire to pursue a
              Ph.D. position that aligns with my passion for human-centered
              interaction, machine learning models, and the exciting realm of
              IoT.
            </p>
          </div>
          <div className='introduction-main-content-image'>
            <img src={fullStackImage} alt='full stack'></img>
          </div>
        </div>
        <div className='introduction-icon-list'>
          <GitHubIcon
            className='introduction-icon'
            color='action'
            fontSize='large'
            onClick={() => window.open('https://github.com/jimmysoccer')}
          ></GitHubIcon>
          <EmailIcon
            className='introduction-icon'
            color='action'
            fontSize='large'
            onClick={() => window.open('mailto:jimmysoccer0927@gmail.com')}
          ></EmailIcon>
          <LinkedInIcon
            className='introduction-icon'
            color='action'
            fontSize='large'
            onClick={() =>
              window.open('https://www.linkedin.com/in/jimmysoccer/')
            }
          ></LinkedInIcon>
        </div>
      </div>
      <h2 style={{ width: '100%', textAlign: 'center' }}>Work</h2>
      <WorkingExperience
        style={{ margin: '20px 0 0 0', maxWidth: '1500px' }}
        hideHeader={true}
      />
      <h2 style={{ width: '100%', textAlign: 'center' }}>Projects</h2>
      <Projects
        style={{ margin: '20px 0 0 0', maxWidth: '1500px' }}
        hideHeader={true}
      ></Projects>
    </div>
  );
}
