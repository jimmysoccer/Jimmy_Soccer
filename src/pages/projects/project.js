import { Link, useLocation } from 'react-router-dom';
import TechStackIcon from '../../components/techStackIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NAV_BAR } from '../../const/navBar';

export default function Project() {
  const location = useLocation();
  const project = location.state || {};

  return (
    <div className='d-flex flex-column mb-5'>
      <div className='px-5 my-5'>
        <Link className='text-success' to={NAV_BAR.projects.path}>
          <ArrowBackIcon></ArrowBackIcon>
        </Link>
      </div>
      <div className='text-center m-3'>
        {project.techStack.map((tech) => (
          <TechStackIcon stack={tech} />
        ))}
        <h1>{project.title}</h1>
        <h2>{project.time}</h2>
        {project.description.map((des) => (
          <div>{des}</div>
        ))}
      </div>
    </div>
  );
}
