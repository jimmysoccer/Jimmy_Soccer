import { Link, useLocation } from 'react-router-dom';
import TechStackIcon from '../../components/techStackIcon';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NAV_BAR } from '../../const/navBar';
import NotFound from '../../components/NotFound';
import { ImageList, ImageListItem } from '@mui/material';

export default function Project() {
  const location = useLocation();
  const project = location.state || {};

  return (
    <div className='d-flex flex-column'>
      <div className='px-5 my-5'>
        <Link className='text-success' to={NAV_BAR.projects.path}>
          <ArrowBackIcon></ArrowBackIcon>
        </Link>
      </div>
      {Object.keys(project).length === 0 ? (
        <NotFound />
      ) : (
        <div className='text-center m-3'>
          {project.techStack.map((tech) => (
            <TechStackIcon stack={tech} />
          ))}
          <h1>{project.title}</h1>
          <h2>{project.time}</h2>
          {project?.description?.map((des) => (
            <div>{des}</div>
          ))}

          {project?.images ? (
            <div className='d-flex justify-content-center mt-5'>
              <ImageList variant='masonry' className='w-75' cols={2} gap={20}>
                {project?.images?.map((img) => (
                  <ImageListItem>
                    <img src={img} alt='project'></img>
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}
