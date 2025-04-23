import { projects } from './projects';
import { techStack } from './tech-stack';

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
    employer_chinese: '佛罗里达大学生物医学工程系',
    location_chinese: '佛罗里达州盖恩斯维尔',
    position_chinese: '全栈开发者',
    time_chinese: '2022年8月 - 至今',
    description_chinese: [
      '使用Figma、ReactJS、Redux和NodeJS设计并开发了一个医疗数据监控的网络应用程序',
      '使用ReactJS、Atom、Python、MongoDB和FastAPI开发并维护了一款面部注释工具',
      '与博士生深入讨论多目标检测和跟踪的机器学习模型',
      '与医生和教授合作，构建一个易于使用的应用程序',
    ],
    techStack: [
      techStack.react,
      techStack.nodeJS,
      techStack.python,
      techStack.mongoDB,
      techStack.figma,
    ],
    projects: [projects[0], projects[1], projects[2]],
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
    employer_chinese: 'PathPoint能源有限责任公司',
    location_chinese: '德克萨斯州休斯顿',
    position_chinese: '软件开发实习生',
    time_chinese: '2023年5月 - 2023年9月',
    description_chinese: [
      '开发并维护当前的汽油交易平台',
      '使用ReactJS和Redux实现交互功能。',
      '使用Python和Django集成RESTful API。',
      '与后端开发人员合作，确保高质量的用户体验',
      '参与采用Sprint方法论的敏捷开发过程。',
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
    employer_chinese: '大陆轮胎（中国）有限公司',
    location_chinese: '中国上海',
    position_chinese: '业务系统实习生',
    time_chinese: '2021年5月 - 2021年7月',
    description_chinese: [
      '使用HTML、CSS和JavaScript修改和更新了内部专用软件的必要用户界面。',
      '利用SQL管理与客户详细信息相关的公司Microsoft SQL数据库, 包括创建、修改和删除信息。',
      '通过重新设计现有的SQL脚本, 提高了员工查找特定记录的速度和可读性。',
      '设计了一个算法, 通过使用C++将从零售商收集的CSV数据转换为公司数据库所需的正确格式。',
    ],
    techStack: [techStack.js, techStack.sql, techStack.cPlusPlus],
  },
];
