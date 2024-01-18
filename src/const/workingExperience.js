import { techStack } from './techStack';

export const workingExperience = [
  {
    employer: 'Biomedical Engineering at University of Florida',
    location: 'Gainesville, FL',
    position: 'Full Stack Developer',
    time: 'August 2022 - Present',
    description: [
      `Designed and developed a healthcare data monitor web application using Figma,
      ReactJS, Redux, and NodeJS`,
      `Developed and maintained a face annotation tool using ReactJS, Atom, Python,
      MongoDB, and FastAPI.`,
      `Collaborated with PhD students on in-depth discussions regarding
      multiple-object detection and tracking ML models.`,
      `Collaborated with physicians, and professors to build an easy to use application`,
    ],
    techStack: [
      techStack.react,
      techStack.nodeJS,
      techStack.python,
      techStack.mongoDB,
      techStack.figma,
    ],
  },
  {
    employer: 'PathPoint Energy LLC',
    location: 'Houston, TX',
    position: 'Software Developer Intern',
    time: 'May 2023 - September 2023',
    description: [
      `Developed and maintained the current gasoline trading platform`,
      `Implemented interactive features using ReactJS, and Redux.`,
      `Integrated RESTful APIs using Python, and Django.`,
      `Collaborated with back-end developers to ensure high-quality user experience`,
      `Participated in the agile development process using Sprint methodology.`,
    ],
    techStack: [
      techStack.js,
      techStack.react,
      techStack.dJango,
      techStack.python,
    ],
  },
];
