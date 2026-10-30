/**
 * Public research directions. Keep descriptions broad; do not describe
 * unpublished findings, private datasets, or restricted clinical data here.
 */
export const researchAreas = [
  {
    key: "multimodal",
    title: "Multimodal Machine Learning",
    title_chinese: "多模态机器学习",
    description:
      "Learning from heterogeneous sources such as physiological signals, video, clinical measurements, and text, and understanding how these modalities complement one another.",
    description_chinese:
      "从生理信号、视频、临床测量和文本等异构数据中学习，并理解不同模态之间如何互为补充。",
  },
  {
    key: "foundation",
    title: "Foundation Models & Representation Learning",
    title_chinese: "基础模型与表示学习",
    description:
      "Investigating pretrained models and self-supervised representations that transfer across tasks, populations, and recording settings.",
    description_chinese:
      "研究可在不同任务、人群与采集环境之间迁移的预训练模型与自监督表示。",
  },
  {
    key: "timeseries",
    title: "Physiological Signal & Time-Series Modeling",
    title_chinese: "生理信号与时间序列建模",
    description:
      "Modeling continuous physiological time series while accounting for noise, artifacts, missing segments, and variability over time.",
    description_chinese:
      "对连续生理时间序列进行建模，同时考虑噪声、伪影、数据缺失以及随时间的变化。",
  },
  {
    key: "healthcare",
    title: "Healthcare AI & Clinical Applications",
    title_chinese: "医疗AI与临床应用",
    description:
      "Developing machine learning approaches that are robust and practical enough to support patient monitoring and clinical decision-making.",
    description_chinese:
      "开发足够稳健、实用的机器学习方法，以支持患者监测与临床决策。",
  },
  {
    key: "wearable",
    title: "Wearable Sensing & Intelligent Monitoring",
    title_chinese: "可穿戴传感与智能监测",
    description:
      "Building systems that turn wearable and ambient sensor data into meaningful, longitudinal insight about health in everyday and clinical settings.",
    description_chinese:
      "构建将可穿戴与环境传感数据转化为日常及临床场景中纵向健康洞察的系统。",
  },
];

export const currentResearch = {
  title: "Current Work at Emory",
  title_chinese: "在埃默里大学的当前工作",
  points: [
    "Exploring machine learning and foundation models for physiological signals.",
    "Investigating how multimodal clinical data — wearable sensing, bedside measurements, and electronic health records — can be combined for patient monitoring.",
    "Studying practical challenges of real-world clinical data, including signal quality, missing information, and temporal variability.",
  ],
  points_chinese: [
    "探索面向生理信号的机器学习与基础模型。",
    "研究如何结合多模态临床数据（可穿戴传感、床旁测量与电子病历）用于患者监测。",
    "研究真实临床数据的实际挑战，包括信号质量、信息缺失与时间变异性。",
  ],
};

export const researchInterests = [
  ["Artificial Intelligence", "人工智能"],
  ["Machine Learning", "机器学习"],
  ["Multimodal Learning", "多模态学习"],
  ["Foundation Models", "基础模型"],
  ["Healthcare AI", "医疗AI"],
  ["Intelligent Systems", "智能系统"],
];

/** Skills drawn from existing project and work descriptions. */
export const technicalSkills = [
  {
    group: "Machine Learning",
    group_chinese: "机器学习",
    items: ["PyTorch", "TensorFlow", "OpenCV", "YOLO", "OpenAI API"],
  },
  {
    group: "Languages",
    group_chinese: "编程语言",
    items: ["Python", "JavaScript", "Go", "C++", "C#", "SQL"],
  },
  {
    group: "Systems & Web",
    group_chinese: "系统与Web",
    items: ["React", "FastAPI", "Node.js", "Django", "MongoDB"],
  },
  {
    group: "Cloud & Hardware",
    group_chinese: "云与硬件",
    items: ["Google Cloud", "AWS Lambda", "Raspberry Pi", "RFID / NFC"],
  },
];
