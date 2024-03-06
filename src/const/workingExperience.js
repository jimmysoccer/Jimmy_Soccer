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
  {
    employer: 'Continental Tires (China) Co., Ltd',
    location: 'Shanghai, China',
    position: 'Business System Intern',
    time: 'May 2021 - July 2021',
    description: [
      `Modified and updated the necessary user interface of the internal-use-only software by using HTML, CSS, 
      and JavaScript.`,
      `Utilized SQL to manage the company's Microsoft SQL database that is related to customers' detailed 
      information, which includes creating, modifying, and deleting information.`,
      `Improved speed and readability for employees to find a particular record through redesigning 
      the existed SQL script.`,
      `Designed an algorithm to transfer the CSV data collected from retailers to the correct format 
      required by the company's database through using C++.`,
    ],
    techStack: [techStack.js, techStack.sql, techStack.cPlusPlus],
  },
];
