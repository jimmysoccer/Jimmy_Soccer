import {
  UUCircle1Image,
  UUCircle2Image,
  UUCircle3Image,
  UUCircle4Image,
  UUCircle5Image,
  UUCircle6Image,
  UUCircle7Image,
  aiExtractionToolImage1,
  aiExtractionToolImage2,
  aiExtractionToolImage3,
  annotationToolActivity,
  annotationToolBboxTrack,
  annotationToolBboxTrackList,
  annotationToolFace,
  annotationToolFaceDetect,
  annotationToolFaceHelp,
  dialAdventure1Image,
  dialAdventure2Image,
  dialAdventure3Image,
  dialAdventure4Image,
  dialAdventure5Image,
  imageInpaintingImage1,
  imageInpaintingImage2,
  imageInpaintingImage3,
  roammEhrClinical,
  roammEhrDashboard,
  roammEhrNotification,
  roammEhrPatientList,
  sunSpotImage1,
  sunSpotImage2,
  sunSpotImage3,
} from '../assets/images/images';
import { publicationItems } from './publication-items';
import { techStack } from './tech-stack';

export const projects = [
  //   {
  //     "title": "Tibby: RFID-Enabled Voice Assistant for Patient-Physician Interaction",
  //     "description": [
  //       "Developed Tibby, a hybrid hardware-software system featuring a small wearable voice AI assistant in the form of a name tag.",
  //       "Integrated an RFID scanner that detects when a physician approaches a patient’s bed, triggering secure authentication and data retrieval.",
  //       "Built a synchronized workflow where the physician’s mobile app displays both doctor and patient information, while the web interface shows the same information in real time.",
  //       "Designed and prototyped the hardware using Raspberry Pi, Bluetooth, NFC, and 3D printing for the assistant device.",
  //       "Implemented Tibby’s voice interaction capabilities for quick access to patient data and contextual guidance."
  //     ],
  //     "time": "January 2025 - March 2025",
  //     "title_chinese": "Tibby: 面向医患交互的 RFID 语音助手",
  //     "description_chinese": [
  //       "开发了 Tibby，一种混合硬件与软件系统，配备可穿戴的语音 AI 助手，形态为姓名牌。",
  //       "集成 RFID 扫描器，当医生接近病床并刷卡时，可触发安全认证和数据检索。",
  //       "实现移动端应用与网页端界面同步，医生的移动端应用会显示医患信息，同时网页端界面实时展示相同信息。",
  //       "基于 Raspberry Pi、蓝牙、NFC 和 3D 打印完成硬件设计与原型构建。",
  //       "实现 Tibby 的语音交互功能，便于医生快速获取病人数据和上下文信息。"
  //     ],
  //     "time_chinese": "2025年1月 - 2025年3月",
  //     "techStack": [
  //       "python",
  //       "react",
  //       "raspberrypi",
  //       "hardware design",
  //       "3d printing",
  //       "android studio",
  //       "java",
  //       "bluetooth",
  //       "nfc"
  //     ],
  //     "images": [
  //       "tibbyImage1",
  //       "tibbyImage2",
  //       "tibbyImage3"
  //     ]
  //   }
  // ,
  {
    title: 'ICU-REACT Dataset Annotation Tool',
    description: [
      'Designed and implemented a web-based platform to streamline annotation of clinical contexts and questions for ICU-related datasets.',
      'Built the backend in Go and the frontend in React (Vite), enabling efficient validation workflows for annotators.',
      'Developed features for validating clinical contexts, answering supplemental questions, and managing annotator access.',
      'Implemented an admin page to monitor annotator progress and question assignment history, with functionality to assign questions directly to annotators.',
      'Used by more than 20 annotators, improving dataset quality and consistency to support downstream medical AI research and clinical decision-making tools.',
      'Deployed the application to Google Cloud Platform (GCP) for scalable and reliable access.',
    ],
    time: 'May 2025 - August 2025',
    title_chinese: 'ICU-REACT 数据集标注工具',
    description_chinese: [
      '设计并实现了一个基于网页的平台，用于简化 ICU 相关数据集的临床语境与问题标注流程。',
      '使用 Go 构建后端,React (Vite) 构建前端，为标注人员提供高效的验证工作流。',
      '开发了临床语境验证、补充问题回答和标注人员管理等功能。',
      '实现了管理员页面，可监控标注人员进度与问题分配历史，并支持直接向标注人员分配问题。',
      '被超过 20 名标注人员使用，有效提升了数据集质量与一致性，支持后续医学人工智能研究与临床决策工具。',
      '部署在 Google Cloud Platform (GCP)，实现可扩展和高可靠的访问。',
    ],
    time_chinese: '2025年5月 - 2025年8月',
    techStack: [techStack.go, techStack.react, techStack.gcp],
    images: [
      'https://res.cloudinary.com/ds4h9nepa/image/upload/v1756407342/Screenshot_2025-08-28_145137_ta3ezj.png',
      'https://res.cloudinary.com/ds4h9nepa/image/upload/v1756407342/Screenshot_2025-08-28_145419_dbq2ai.png',
      'https://res.cloudinary.com/ds4h9nepa/image/upload/v1756407342/Screenshot_2025-08-28_145512_d5pg9a.png',
    ],
  },
  {
    title: 'AI-Powered Content Summarization and Comment Extraction Tool',
    description: [
      `Built a web-based tool leveraging OpenAI's GPT API to extract the core content from 
      user-submitted text, enabling intelligent summarization and semantic filtering.`,
      `Developed an automated pipeline to scrape web pages and extract titles, comments, 
      and nested replies from a provided link, enabling real-time content analysis.`,
      `Implemented a hierarchical comment structure (comments, subcomments, nested replies) 
      to represent complex discussion threads.`,
      `Combined advanced NLP techniques and GPT-based reasoning to surface key 
      questions, opinions, and insights from long-form discussions.`,
    ],
    time: 'February 2025 - April 2025',
    title_chinese: '基于AI的内容摘要与评论提取工具',
    description_chinese: [
      `构建了一个基于网页的工具，利用 OpenAI 的 GPT API 从用户提交的文本中提取核心内容，实现智能摘要与语义过滤。`,
      `开发了自动化管道，用于抓取网页并从提供的链接中提取标题、评论和嵌套回复，实现实时内容分析。`,
      `实现了分层评论结构（评论、子评论、嵌套回复），以表示复杂的讨论线程。`,
      `结合先进的自然语言处理技术与基于 GPT 的推理能力，从长篇讨论中提取关键问题、观点与洞察。`,
    ],
    time_chinese: '2025年2月 - 2025年4月',
    techStack: [
      techStack.openAI,
      techStack.react,
      techStack.python,
      techStack.mongoDB,
      techStack.gcp,
    ],
    images: [
      aiExtractionToolImage1,
      aiExtractionToolImage2,
      aiExtractionToolImage3,
    ],
  },
  {
    title: 'Object Annotation Tool',
    description: [
      `Led the development of a web-based full stack annotation platform to support 
        large-scale labeling of medical videos for machine learning research.`,
      `Designed an intuitive ReactJS frontend integrated with a FastAPI backend, 
        supporting multi-user collaboration.`,
      `Utilized Python, OpenCV, and PyTorch for preprocessing and auto-suggestion 
          modules that assist annotators using tracking and ML-based predictions.`,
      `Generated side-by-side visualizations comparing original medical videos 
          with annotated outputs, enabling efficient quality control and demonstrating 
          annotation accuracy for ML training and validation.`,
    ],
    time: 'October 2023 - Present',
    title_chinese: '多目标注释工具',
    description_chinese: [
      '使用ReactJS、Atom、Python、MongoDB和FastAPI开发并维护了一款多目标注释工具',
      '与医生和教授合作，构建一个易于使用的应用程序',
    ],
    time_chinese: '2023年10月 - 至今',
    techStack: [techStack.react, techStack.python, techStack.mongoDB],
    images: [
      annotationToolActivity,
      annotationToolFace,
      annotationToolFaceHelp,
      annotationToolFaceDetect,
      annotationToolBboxTrack,
      annotationToolBboxTrackList,
    ],
  },
  {
    title: 'Healthcare Data Monitor Web',
    description: [
      `Designed and developed a real-time clinical data monitoring system for healthcare 
      providers to track patient data from wearable devices using ReactJS and 
      AWS Lambda Function.`,
      `Developed a role-based access control system for clinicians, researchers, and 
      administrators with custom data permissions.`,
      `Engineered an automated emergency alert system that triggers emails to physicians 
      when abnormal or high-risk data patterns are detected.`,
    ],
    time: 'October 2023 - Present',
    title_chinese: '医疗数据监控的网络应用程序',
    description_chinese: [
      '使用Figma、ReactJS、Redux和NodeJS设计并开发了一个医疗数据监控的网络应用程序',
      '与医生和教授合作，构建一个易于使用的应用程序',
    ],
    time_chinese: '2023年10月 - 至今',
    techStack: [
      techStack.react,
      techStack.python,
      techStack.mongoDB,
      techStack.aws,
      techStack.lambda,
    ],
    images: [
      roammEhrDashboard,
      roammEhrPatientList,
      roammEhrClinical,
      roammEhrNotification,
    ],
    papers: [publicationItems[0]],
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
    images: [
      UUCircle1Image,
      UUCircle6Image,
      UUCircle2Image,
      UUCircle7Image,
      UUCircle3Image,
      UUCircle5Image,
      UUCircle4Image,
    ],
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
    techStack: [techStack.python, techStack.ai],
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
    techStack: [techStack.cSharp, techStack.unity, techStack.hardware],
    images: [
      dialAdventure1Image,
      dialAdventure2Image,
      dialAdventure3Image,
      dialAdventure4Image,
      dialAdventure5Image,
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
