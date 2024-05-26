import {
  UUCircle1Image,
  UUCircle2Image,
  UUCircle3Image,
  UUCircle4Image,
  dialAdventure1Image,
  dialAdventure2Image,
  dialAdventure3Image,
  dialAdventure4Image,
  imageInpaintingImage1,
  imageInpaintingImage2,
  imageInpaintingImage3,
  sunSpotImage1,
  sunSpotImage2,
  sunSpotImage3,
} from '../imgs/images';
import { techStack } from './techStack';

export const projects = [
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
    title_chinese: '留学动态社区小程序',
    time_chinese: '2022年1月 - 2023年1月',
    description_chinese: [
      `与创意团队的10名成员合作开发了一个生活和日常服务的在线平台,
       允许用户发布最近的活动, 
      组织小型聚会并回复其他人的邀请。`,
      '主要负责使用React框架、Redux和JavaScript进行前端开发。',
      '在应用程序中嵌入了即时聊天API,使用户能够交换最近活动的信息。',
      '通过使用C++帮助构建和管理控制应用程序数据库和接口的后端。',
    ],
    techStack: [
      techStack.wechat,
      techStack.js,
      techStack.react,
      techStack.sql,
      techStack.figma,
      techStack.cPlusPlus,
    ],
    images: [UUCircle1Image, UUCircle2Image, UUCircle3Image, UUCircle4Image],
  },
  {
    title: 'Image Inpainting',
    description: [
      `Developed image inpainting algorithm using CNNs and ReLU.`,
      `Utilized TensorFlow and CV2 for model development and training.`,
      `Successfully restored damaged images and removed obstacles while preserving image
      coherence.`,
    ],
    time: 'March 2022 - April 2022',
    title_chinese: '图像修复',
    description_chinese: [
      '使用CNN和ReLU开发了图像修复算法。',
      '利用TensorFlow和CV2进行模型开发和训练。',
      '成功修复了受损图像并去除了障碍物，同时保持了图像的连贯性。',
    ],
    time_chinese: '2022年3月 - 2022年4月',
    techStack: [techStack.python],
    images: [
      imageInpaintingImage1,
      imageInpaintingImage2,
      imageInpaintingImage3,
    ],
    papers: ['/Image_Inpainting.pdf'],
  },
  {
    title: 'Unity Game Development',
    description: [
      `Developed an adventure game and combined the game with the use of surface dial.`,
      `Implemented game mechanics, UI elements and visual effects using Unity and C#.`,
      `Utilized the dial to manipulate the character in the game.`,
    ],
    time: 'October 2022 - December 2022',
    title_chinese: 'Unity游戏开发',
    description_chinese: [
      '开发了一款冒险游戏，并结合了表面转盘的使用。',
      '使用Unity和C#实现了游戏机制、UI元素和视觉效果。',
      '利用转盘来操控游戏中的角色。',
    ],
    time_chinese: '2022年10月 - 2022年12月',
    techStack: [techStack.cSharp],
    images: [
      dialAdventure1Image,
      dialAdventure2Image,
      dialAdventure3Image,
      dialAdventure4Image,
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
    title_chinese: '太阳能板网站',
    description_chinese: [
      `通过使用Python、Flask、Bootstrap框架和HTML、CSS、JS开发了一个网站,
      允许用户快速找到安装太阳能板的最佳位置`,
      '通过使用Google Map API在网站上集成了Google地图, 以便用户明确找到所需的位置',
      '利用MongoDB构建了一个持久数据库, 用于存储、检索和修改用户的账户和书签信息',
      '通过使用天气应用的API和Chart.js, 将天气图和图表集成到网站中',
    ],
    techStack: [
      techStack.js,
      techStack.python,
      techStack.sql,
      techStack.googleMap,
    ],
    images: [sunSpotImage1, sunSpotImage2, sunSpotImage3],
  },
  {
    title: 'Question box web app',
    description: [
      `Developed a question box application that allows the users to answer and post questions by utilizing HTML, CSS, JS, Apache server`,
      `Embedded a 3D sphere by using Three.js to display the questions for users to rotate the sphere and find the questions`,
      `Established a connection to Oracle SQL database for users to send and retrieve posts information through PHP, SQL`,
    ],
    title_chinese: '问题箱网络应用',
    description_chinese: [
      '通过使用HTML、CSS、JS、Apache服务器开发了一个问题箱应用程序, 允许用户回答和发布问题。',
      '通过使用Three.js嵌入了一个3D球体, 用于显示问题, 用户可以旋转球体找到问题。',
      '通过PHP、SQL与Oracle SQL数据库建立连接, 用户可以发送和检索帖子信息。',
    ],
    techStack: [techStack.js, techStack.threeDJS, techStack.sql, techStack.php],
  },
  {
    title: 'Minesweeper',
    description: [
      `Designed and implmented a classical minesweeper game by using C++, SFML.`,
    ],
    title_chinese: '扫雷游戏',
    description_chinese: ['使用C++和SFML设计并实现了一个经典的扫雷游戏。'],
    techStack: [techStack.cPlusPlus],
  },
];
