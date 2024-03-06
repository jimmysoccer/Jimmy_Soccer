import { techStack } from './techStack';

export const projects = [
  {
    title: 'Image Inpainting',
    description: [
      `Developed image inpainting algorithm using CNNs and ReLU.`,
      `Utilized TensorFlow and CV2 for model development and training.`,
      `Successfully restored damaged images and removed obstacles while preserving image
      coherence.`,
    ],
    time: 'March 2022 - April 2022',
    techStack: [techStack.python],
  },
  {
    title: 'Unity Game Development',
    description: [
      `Developed an adventure game and combined the game with the use of surface dial.`,
      `Implemented game mechanics, UI elements and visual effects using Unity and C#.`,
      `Utilized the dial to manipulate the character in the game.`,
    ],
    time: 'October 2022 - December 2022',
    techStack: [techStack.cSharp],
  },
  {
    title: 'Life and daily service web application',
    time: 'January 2022 - January 2023',
    description: [
      `Worked with 10 members of the creative team to develop a life and daily service online platform that allows the users to post recent activities, organize a small group of party and respond to other's
    invitations.`,
      `Mainly responsible for the front-end development by using React framework, Redux, and JavaScript.`,
      `Embedded an instant chatting API in the application that enables users to exchange recent activities'
    information.`,
      `Helped to build and manage the backend that controls the application's database and interfaces by
    using C++.`,
    ],
    techStack: [
      techStack.js,
      techStack.react,
      techStack.sql,
      techStack.figma,
      techStack.cPlusPlus,
    ],
  },
  {
    title: 'Solar Panel Website',
    description: [
      `Developed a website through using Python, Flask, Bootstrap framework, and HTML, CSS, JS that allows users to quickly find the best site to install the solar panel`,
      `Integrated Google Map on the website by using Google Map API for users to explicitly find the desired location`,
      `Built a persistent database by utilizing MongoDB to store, retrieve and modify the user's account and bookmark information`,
      `Incorporated a weather map and making graphs by using the weather app's API and Chart.js`,
    ],
    techStack: [
      techStack.js,
      techStack.python,
      techStack.sql,
      techStack.googleMap,
    ],
  },
  // {
  //   title: 'Question box web app',
  //   description: [
  //     `Developed a question box application that allows the users to answer and post questions by utilizing HTML, CSS, JS, Apache server`,
  //     `Embedded a 3D sphere by using Three.js to display the questions for users to rotate the sphere and find the questions`,
  //     `Established a connection to Oracle SQL database for users to send and retrieve posts information through PHP, SQL`,
  //   ],
  //   techStack: [techStack.js, techStack.threeDJS, techStack.sql, techStack.php],
  // },
  // {
  //   title: 'Minesweeper',
  //   description: [
  //     `Designed and implmented a typical minesweeper game by using C++, SFML.`,
  //   ],
  //   techStack: [techStack.cPlusPlus],
  // },
];
