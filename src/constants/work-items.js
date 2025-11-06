import { projects } from './projects';
import { techStack } from './tech-stack';

export const workingExperience = [
  {
    employer: 'University of Florida Biomedical Engineering Department',
    location: 'Gainesville, FL',
    position: 'Full Stack & ML Developer',
    time: 'August 2022 - Present',
    description: [
      'Conceived and developed TIBBY, an AI-powered wearable assistant that integrates RFID, mobile, and web interfaces to automate clinical documentation and support real-time decision-making (patent pending).',
      'Processed medical video datasets to develop ML pipelines for automated annotation and behavior recognition in clinical research by using Python.',
      'Developed an AI-assisted web tool leveraging OpenAI’s GPT API to automatically extract core insights, titles, and hierarchical comment structures from user input and external web content for downstream NLP analysis.',
      'Developed and evaluated deep learning models for multi-object detection and tracking using PyTorch and TensorFlow, including fine-tuning YOLO-based architectures for medical video analysis.',
      'Designed and developed a healthcare data monitoring web application using Figma, ReactJS, Redux, and NodeJS, supporting real-time data visualization and clinical analysis.',
      'Built and maintained a full stack face annotation tool using ReactJS, Python, FastAPI, MongoDB, and Atom, enabling efficient labeling workflows for medical video data.',
    ],
    employer_chinese: '佛罗里达大学生物医学工程系',
    location_chinese: '佛罗里达州盖恩斯维尔',
    position_chinese: '全栈开发者',
    time_chinese: '2022年8月 - 至今',
    description_chinese: [
      '构想并开发了 TIBBY，一款 AI 驱动的可穿戴临床助手，集 RFID、移动和网页界面于一体，自动化临床文书并支持实时决策（专利申请中）。',
      '处理医学视频数据集，开发 ML 管线用于自动化注释与行为识别，支持临床研究。',
      '开发基于 OpenAI GPT API 的 AI 辅助网页工具，自动提取用户输入与外部网页内容的核心见解、标题与分层评论结构，支持下游 NLP 分析。',
      '开发和评估多目标检测与跟踪的深度学习模型，包括基于 YOLO 架构的医学视频分析微调。',
      '设计并开发了支持实时数据可视化与临床分析的医疗数据监控网页应用，使用 Figma、ReactJS、Redux 和 NodeJS。',
      '构建并维护了全栈面部注释工具，使用 ReactJS、Python、FastAPI、MongoDB 和 Atom，实现高效医学视频标注工作流。',
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
