import './index.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import JavascriptIcon from '@mui/icons-material/Javascript';
import LinkIcon from '@mui/icons-material/Link';
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
            <image></image>
          </div>
        </div>
        <div className='introduction-icon-list'>
          <GitHubIcon
            className='introduction-icon'
            color='action'
            fontSize='large'
          ></GitHubIcon>
          <EmailIcon
            className='introduction-icon'
            color='action'
            fontSize='large'
          ></EmailIcon>
          <LinkedInIcon
            className='introduction-icon'
            color='action'
            fontSize='large'
          ></LinkedInIcon>
        </div>
      </div>
      <div className='project-list'>
        <div className='project'>
          <div className='project-logo'>
            <JavascriptIcon
              className='icon-item'
              color='action'
              sx={{ fontSize: 50, backgroundColor: 'yellow' }}
            ></JavascriptIcon>
          </div>
          <div className='project-title'>Project 1</div>
          <div className='project-description'>
            Lorem ipsum dolor sit amet. Et incidunt voluptatem ex tempore
            repellendus qui dicta nemo sit deleniti minima.
          </div>
          <div className='project-link'>
            <div className='project-link-icon'>
              <LinkIcon></LinkIcon>
            </div>
            <div className='project-link-text'>View Project</div>
          </div>
        </div>
        <div className='project'>
          <div className='project-logo'>
            <JavascriptIcon
              className='icon-item'
              color='action'
              sx={{ fontSize: 50 }}
            ></JavascriptIcon>
          </div>
          <div className='project-title'>Project 2</div>
          <div className='project-description'>
            Lorem ipsum dolor sit amet. Et incidunt voluptatem ex tempore
            repellendus qui dicta nemo sit deleniti minima.
          </div>
          <div className='project-link'>
            <div className='project-link-icon'>
              <LinkIcon></LinkIcon>
            </div>
            <div className='project-link-text'>View Project</div>
          </div>
        </div>
        <div className='project'>
          <div className='project-logo'>
            <JavascriptIcon
              className='icon-item'
              color='action'
              sx={{ fontSize: 50 }}
            ></JavascriptIcon>
          </div>
          <div className='project-title'>Project 3</div>
          <div className='project-description'>
            Lorem ipsum dolor sit amet. Et incidunt voluptatem ex tempore
            repellendus qui dicta nemo sit deleniti minima.
          </div>
          <div className='project-link'>
            <div className='project-link-icon'>
              <LinkIcon></LinkIcon>
            </div>
            <div className='project-link-text'>View Project</div>
          </div>
        </div>
        <div className='project'>
          <div className='project-logo'>
            <JavascriptIcon
              className='icon-item'
              color='action'
              sx={{ fontSize: 50 }}
            ></JavascriptIcon>
          </div>
          <div className='project-title'>Project 4</div>
          <div className='project-description'>
            Lorem ipsum dolor sit amet. Et incidunt voluptatem ex tempore
            repellendus qui dicta nemo sit deleniti minima.
          </div>
          <div className='project-link'>
            <div className='project-link-icon'>
              <LinkIcon></LinkIcon>
            </div>
            <div className='project-link-text'>View Project</div>
          </div>
        </div>
      </div>
    </div>
  );
}
