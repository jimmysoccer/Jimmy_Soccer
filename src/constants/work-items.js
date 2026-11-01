import { projects } from './projects';
import { techStack } from './tech-stack';

/**
 * type: "research" entries form the main Experience timeline;
 * type: "industry" entries are shown as supporting engineering background.
 * `slug` is used in the URL (/experience/:slug).
 */
export const workingExperience = [
  {
    type: 'research',
    slug: 'emory',
    employer: 'Emory University',
    location: 'Atlanta, GA',
    position: 'Ph.D. Researcher',
    time: 'August 2026 – Present',
    description: [
      'Explore wearable sensing, clinical measurements, and electronic health records for patient monitoring and health assessment.',
      'Study challenges in real-world clinical data, including signal quality, missing information, and temporal variability.',
      'Conduct research in machine learning and artificial intelligence for healthcare, focusing on multimodal learning and physiological data.',
      'Investigate foundation models and representation learning approaches for physiological time-series signals.',
    ],
    employer_chinese: '埃默里大学',
    location_chinese: '佐治亚州亚特兰大',
    position_chinese: '博士研究生（研究员）',
    time_chinese: '2026年8月 – 至今',
    description_chinese: [
      '探索可穿戴传感、临床测量与电子病历在患者监测与健康评估中的应用。',
      '研究真实临床数据中的挑战，包括信号质量、信息缺失与时间变异性。',
      '从事面向医疗健康的机器学习与人工智能研究，关注多模态学习与生理数据。',
      '研究面向生理时间序列信号的基础模型与表示学习方法。',
    ],
    techStack: [techStack.ai, techStack.python],
  },
  {
    type: 'research',
    slug: 'university-of-florida',
    employer: 'University of Florida, Department of Biomedical Engineering',
    location: 'Gainesville, FL',
    position: 'Undergraduate Research Assistant',
    time: 'August 2022 – May 2026',
    description: [
      'Developed AI-enabled healthcare systems integrating wearable sensors, clinical data, and software platforms for patient monitoring and research.',
      'Designed and implemented multimodal data acquisition and processing pipelines involving physiological signals, video, and environmental sensors.',
      'Applied computer vision and deep learning methods to medical video analysis.',
      'Contributed to intelligent wearable systems for clinical documentation and context-aware assistance.',
      'Built research software and visualization tools supporting interdisciplinary healthcare studies.',
    ],
    employer_chinese: '佛罗里达大学 生物医学工程系',
    location_chinese: '佛罗里达州盖恩斯维尔',
    position_chinese: '本科研究助理',
    time_chinese: '2022年8月 – 2026年5月',
    description_chinese: [
      '开发融合可穿戴传感器、临床数据与软件平台的AI医疗系统，用于患者监测与科研。',
      '设计并实现多模态数据采集与处理管线，涵盖生理信号、视频与环境传感器。',
      '将计算机视觉与深度学习方法应用于医学视频分析。',
      '参与面向临床文书与情境感知辅助的智能可穿戴系统研发。',
      '构建支持跨学科医疗研究的科研软件与可视化工具。',
    ],
    techStack: [
      techStack.python,
      techStack.ai,
      techStack.react,
      techStack.fastAPI,
      techStack.hardware,
    ],
    projects: projects.filter((p) =>
      [
        'multimodal-icu-monitoring',
        'tibby',
        'roamm-ehr',
        'icu-react-annotation',
        'object-annotation-tool',
      ].includes(p.slug)
    ),
  },
  {
    type: 'industry',
    slug: 'pathpoint-energy',
    employer: 'PathPoint Energy LLC',
    location: 'Houston, TX',
    position: 'Software Developer Intern',
    time: 'May 2023 - September 2023',
    description: [
      `Developed and maintained features of the company's gasoline trading platform.`,
      `Implemented interactive features using React and Redux.`,
      `Integrated RESTful APIs using Python and Django.`,
      `Collaborated with back-end developers to ensure a reliable user experience.`,
      `Participated in an agile development process using sprints.`,
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
    type: 'industry',
    slug: 'continental-tires',
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
