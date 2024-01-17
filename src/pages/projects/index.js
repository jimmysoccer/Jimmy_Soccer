import './index.css';
import LinkIcon from '@mui/icons-material/Link';
import { projects } from '../../const/projects';
import TechStackIcon from '../components/techStackIcon';
export default function Projects(props) {
  const { style } = props;
  return (
    <div className='main-content' style={style}>
      <div className='project-list'>
        {projects.map((project) => {
          return (
            <div className='project'>
              <div className='project-logo-list'>
                {project.techStack.map((tech) => (
                  <TechStackIcon stack={tech} />
                ))}
              </div>
              <div className='project-title'>{project.title}</div>
              <div className='project-description'>{project.description}</div>
              <div className='project-link' onClick={() => {}}>
                <div className='project-link-icon'>
                  <LinkIcon></LinkIcon>
                </div>
                <div className='project-link-text'>View Project</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
