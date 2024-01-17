import './index.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import JavascriptIcon from '@mui/icons-material/Javascript';
import LinkIcon from '@mui/icons-material/Link';
import { fullStackImage } from '../../imgs/images';
import Projects from '../projects';
export default function Home() {
  return (
    <div className='main-content'>
      <div className='introduction'>
        <div className='introduction-main-content'>
          <div className='introduction-main-content-text'>
            <h2 className='introduction-main-content-text-title'>
              Full-stack web application developer
            </h2>
            <text>
              I am a backend developer with expertise in Node.js. I have
              experience in building scalable, secure and reliable web
              applications using various frameworks and technologies. I enjoy
              solving complex problems and learning new skills. I am passionate
              about creating high-quality code that follows best practices and
              industry standards. I am always looking for new challenges and
              opportunities to grow as a developer.
            </text>
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
      <Projects style={{ margin: '0', width: '100%' }}></Projects>
    </div>
  );
}
