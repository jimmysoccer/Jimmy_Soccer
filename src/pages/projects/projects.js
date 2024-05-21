import { projects } from '../../const/projects';
import TechStackIcon from '../../components/techStackIcon';
import { Link } from 'react-router-dom';
import { NAV_BAR } from '../../const/navBar';
import { Grid } from '@mui/material';
import { useEffect } from 'react';

export default function Projects({ hideHeader = false }) {
  useEffect(() => {
    document.title = `Jimmy | Projects`;
  }, []);
  return (
    <div className='container'>
      {!hideHeader && (
        <>
          <h1 className='text-left w-50 mt-5'>
            Things I've made trying to put my dent in the universe.
          </h1>
          <p className='fs-5 text-secondary'>
            Embark on a journey through the projects that define my quest for
            innovation and impact. Over the years, I've poured my heart and soul
            into a diverse array of endeavors, each contributing to my ongoing
            mission to make a meaningful mark on the world.
          </p>
        </>
      )}
      <Grid container className='justify-content-center'>
        {projects.map((project, index) => {
          if (hideHeader && index > 1) return <div key={`work-${index}`}></div>;
          return (
            <Grid
              item
              md={5}
              key={`projects-${index}`}
              className='shadow p-3 rounded m-4'
            >
              <Link
                to={`${NAV_BAR.projects.path}/${project.title}`}
                className='text-decoration-none'
                state={project}
              >
                <div>
                  {project.techStack.map((tech) => (
                    <TechStackIcon key={`projects-tech-${tech}`} stack={tech} />
                  ))}
                </div>
                <div className='fs-5 fw-bold text-black'>{project.title}</div>
                <div className='text-black'>{project?.time}</div>
                <ul>
                  {project.description.map((description) => (
                    <li
                      key={`projects-project-des-${description}`}
                      className='text-secondary'
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              </Link>
            </Grid>
          );
        })}
        {projects.length % 2 !== 0 && (
          <Grid item md={5} className='p-3 rounded m-4' />
        )}
      </Grid>
    </div>
  );
}
