import { techStack } from '../constants/tech-stack';

export function getCategoriesFromTechStack(stack) {
  const techCategoryMap = {
    frontend: ['javascript', 'react', 'figma', '3d.js'],
    backend: ['nodejs', 'fastapi', 'django', 'php', 'mongodb', 'sql', 'go'],
    database: ['mongodb', 'sql'],
    mobile: ['wechat'],
    ai: ['openai', 'ai'],
    map: ['googlemap'],
    game: ['c#', 'unity'],
    cloud: ['gcp', 'aws', 'lambda'],
    hardware: ['hardware'],
  };

  // Normalize input: map techStack keys to values, or fall back to lowercased input
  const normalizedStack = stack.map((tech) => {
    const mapped = techStack[tech];
    return mapped ? mapped.toLowerCase() : tech.toLowerCase();
  });

  const categories = new Set();

  for (const category in techCategoryMap) {
    const techs = techCategoryMap[category];
    if (techs.some((t) => normalizedStack.includes(t))) {
      categories.add(category);
    }
  }

  return Array.from(categories);
}

export function getCategoriesText(category, language) {
  return CATEGORY_TEXTS[category][language];
}

export function getAllCategories() {
  return allCategories;
}

const allCategories = [
  'frontend',
  'backend',
  'database',
  'mobile',
  'ai',
  'map',
  'game',
  'cloud',
  'hardware',
];

// Category translations for getCurrentLanguageText
const CATEGORY_TEXTS = {
  all: {
    english: 'All',
    chinese: '全部',
  },
  frontend: {
    english: 'frontend',
    chinese: '前端',
  },
  backend: {
    english: 'backend',
    chinese: '后端',
  },
  database: {
    english: 'database',
    chinese: '数据库',
  },
  mobile: {
    english: 'mobile',
    chinese: '移动端',
  },
  ai: {
    english: 'ai',
    chinese: '人工智能',
  },
  map: {
    english: 'map',
    chinese: '地图',
  },
  game: {
    english: 'game',
    chinese: '游戏',
  },
  cloud: {
    english: 'cloud',
    chinese: '云计算',
  },
  hardware: {
    english: 'hardware',
    chinese: '硬件',
  },
};
