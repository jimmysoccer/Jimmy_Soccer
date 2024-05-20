import { Grid } from '@mui/material';
import TechStackIcon from '../../components/TechStackIcon';
import { workingExperience } from '../../const/workingExperience';

export default function WorkingExperience({ hideHeader = false }) {
  return (
    <div className='container'>
      {!hideHeader && (
        <>
          <h1 className='text-left w-50 mt-5'>
            Professional Journey: A Chronicle of Growth
          </h1>
          <p className='fs-5 text-secondary'>
            Embark on a retrospective journey through my professional
            experiences, where each role and project has played a pivotal role
            in shaping my skills and perspective. From early career milestones
            to challenging projects, this timeline reflects my commitment to
            continuous learning and excellence.
          </p>
        </>
      )}
      <Grid container className='justify-content-center'>
        {workingExperience.map((experience, index) => {
          if (hideHeader && index >= 1)
            return <div key={`work-${index}`}></div>;
          return (
            <Grid
              item
              md={hideHeader ? 10 : 5}
              className='shadow p-3 rounded m-4'
            >
              <div key={`work-${index}`}>
                <div>
                  {experience.techStack.map((tech) => (
                    <TechStackIcon key={`work-tech-${tech}`} stack={tech} />
                  ))}
                </div>
                <div className='fs-5 fw-bold text-black'>
                  {experience.employer +
                    ', ' +
                    experience.location +
                    ' --- ' +
                    experience.position}
                </div>
                <div>{experience.time}</div>
                <ul>
                  {experience.description.map((description) => (
                    <li
                      className='text-secondary'
                      key={`work-exper-des-${description}`}
                    >
                      {description}
                    </li>
                  ))}
                </ul>
              </div>
            </Grid>
          );
        })}
        {workingExperience.length % 2 !== 0 && (
          <Grid item md={5} className='p-3 rounded m-4' />
        )}
      </Grid>
    </div>
  );
}
