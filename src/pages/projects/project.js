import { Link, useLocation } from 'react-router-dom';
import TechStackIcon from '../../components/TechStackIcon';
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
        <div className='d-flex justify-content-center'>
          <div className='text-center m-3 w-75'>
            {project.techStack.map((tech) => (
              <TechStackIcon key={`project-tech-stack-${tech}`} stack={tech} />
            ))}
            <h1>{project.title}</h1>
            <h2>{project.time}</h2>
            <ul className='text-start'>
              {project?.description?.map((des) => (
                <li key={`project-description-${des}`}>{des}</li>
              ))}
            </ul>
            {project?.images ? (
              <div className='d-flex justify-content-center mt-5'>
                <ImageList variant='masonry' className='w-75' cols={2} gap={20}>
                  {project?.images?.map((img) => (
                    <ImageListItem key={`project-images-image-${img}`}>
                      <img src={img} alt='project'></img>
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            ) : (
              ''
            )}

            {project?.papers ? (
              <div className='mt-5'>
                {project.papers.map((paper) => (
                  <iframe
                    key={`project-papers-paper-${paper}`}
                    src={paper}
                    title='image_inpainting'
                    className='w-100'
                    height={600}
                  ></iframe>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </div>
  );
}
