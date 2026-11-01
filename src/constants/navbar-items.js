/**
 * Site sections. `title`/`titleChinese` are the short navigation labels;
 * `seoTitle`/`description` feed the document title and meta description.
 * - `private: true`  → not indexed; reached via the lock icon.
 * - `hidden: true`   → has routes but no navigation entry.
 * - `navParent`      → highlights that nav item when on this section.
 */
export const NAV_BAR = {
  home: {
    path: '/',
    title: 'Home',
    titleChinese: '首页',
    seoTitle: 'AI, Learning, and Discovery',
    seoTitleChinese: '人工智能、学习与探索',
    description:
      'Heng (Jimmy) Sun — Computer Science Ph.D. student at Emory University researching machine learning, multimodal learning, foundation models, and healthcare AI.',
  },
  research: {
    path: '/research',
    title: 'Research',
    titleChinese: '研究',
    seoTitle: 'Research & Exploration',
    seoTitleChinese: '研究与探索',
    description:
      'Education, research interests, current work, research experience, publications, patents, and CV of Heng (Jimmy) Sun.',
  },
  projects: {
    path: '/projects',
    title: 'Projects',
    titleChinese: '项目',
    seoTitle: 'From Ideas to Systems',
    seoTitleChinese: '从想法到系统',
    description:
      'Selected research systems, AI applications, and software engineering projects.',
  },
  about: {
    path: '/about',
    title: 'About',
    titleChinese: '关于',
    seoTitle: 'Beyond the Code',
    seoTitleChinese: '代码之外',
    description:
      'Life beyond research — soccer, skiing, travel, technology — and how to get in touch with Heng (Jimmy) Sun.',
  },
  // Experience detail pages (/experience/:slug) live under Research.
  workingExperience: {
    path: '/experience',
    title: 'Experience',
    titleChinese: '经历',
    seoTitle: 'Experience',
    seoTitleChinese: '经历',
    description: 'Research and industry experience of Heng (Jimmy) Sun.',
    navParent: '/research',
    hidden: true,
  },
  corner: {
    path: '/corner',
    title: "Jimmy's Corner",
    titleChinese: 'Jimmy 的角落',
    seoTitle: 'A Little Space of My Own',
    seoTitleChinese: '属于我的小天地',
    description: 'A private personal space.',
    private: true,
  },
};

/** Top navigation and footer: four public sections (+ lock icon for the corner). */
export const MAIN_NAV = [
  NAV_BAR.home,
  NAV_BAR.research,
  NAV_BAR.projects,
  NAV_BAR.about,
];

/** In-page anchors used to link into consolidated sections. */
export const ANCHORS = {
  education: '/research#education',
  interests: '/research#interests',
  current: '/research#current',
  experience: '/research#experience',
  publications: '/research#publications',
  patents: '/research#patents',
  cv: '/research#cv',
  contact: '/about#contact',
};

export const LANGUAGE = {
  english: {
    value: 'english',
    title: 'English',
  },
  chinese: {
    value: 'chinese',
    title: '中文',
  },
};
