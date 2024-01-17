import JavascriptIcon from '@mui/icons-material/Javascript';
import LinkIcon from '@mui/icons-material/Link';
export default function Projects() {
  return (
    <div className='main-content'>
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
