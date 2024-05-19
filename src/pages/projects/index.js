import './index.css';
import { projects } from '../../const/projects';
import TechStackIcon from '../../components/techStackIcon';
import { Link } from 'react-router-dom';
import { NAV_BAR } from '../../const/navBar';

export default function Projects({ style, hideHeader = false }) {
  return (
    <div className='main-content' style={style}>
      {!hideHeader && (
        <div className='contact'>
          <h2 className='contact-title'>
            Things I've made trying to put my dent in the universe.
          </h2>
          <p className='contact-description'>
            Embark on a journey through the projects that define my quest for
            innovation and impact. Over the years, I've poured my heart and soul
            into a diverse array of endeavors, each contributing to my ongoing
            mission to make a meaningful mark on the world.
          </p>
          <div className='introduction-icon-list'></div>
        </div>
      )}
      <div className='project-list'>
        {projects.map((project, index) => {
          if (hideHeader && index > 2) return <div></div>;
          return (
            <Link
              to={`${NAV_BAR.projects.path}/${project.title}`}
              state={project}
              className='project shadow p-3 rounded my-3  text-decoration-none'
            >
              <div className='project-logo-list'>
                {project.techStack.map((tech) => (
                  <TechStackIcon stack={tech} />
                ))}
              </div>
              <div className='project-title text-black'>{project.title}</div>
              <div className='text-black'>{project?.time}</div>
              <ul>
                {project.description.map((description) => (
                  <li className='project-description'>{description}</li>
                ))}
              </ul>
              {/* <div className='project-link' onClick={() => {}}>
                <div className='project-link-icon'>
                  <LinkIcon></LinkIcon>
                </div>
                <div className='project-link-text'>View Project</div>
              </div> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
