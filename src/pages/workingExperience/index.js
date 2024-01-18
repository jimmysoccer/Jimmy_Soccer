import TechStackIcon from '../../components/techStackIcon';
import { workingExperience } from '../../const/workingExperience';
import './index.css';
export default function WorkingExperience() {
  return (
    <div className='main-content'>
      <div className='contact'>
        <h2 className='contact-title'>
          Professional Journey: A Chronicle of Growth
        </h2>
        <p className='contact-description'>
          Embark on a retrospective journey through my professional experiences,
          where each role and project has played a pivotal role in shaping my
          skills and perspective. From early career milestones to challenging
          projects, this timeline reflects my commitment to continuous learning
          and excellence.
        </p>
        <div className='introduction-icon-list'></div>
      </div>

      <div className='project-list'>
        {workingExperience.map((experience) => {
          return (
            <div className='working-experience'>
              <div className='project-logo-list'>
                {experience.techStack.map((tech) => (
                  <TechStackIcon stack={tech} />
                ))}
              </div>
              <div className='project-title'>
                {experience.employer +
                  ', ' +
                  experience.location +
                  ' --- ' +
                  experience.position}
              </div>
              <div>{experience.time}</div>
              <ul>
                {experience.description.map((description) => (
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
