import { techStack } from '../constants/tech-stack';

export function getCategoriesFromTechStack(stack) {
  const techCategoryMap = {
    frontend: ['javascript', 'react', 'figma', '3d.js'],
    backend: ['nodejs', 'fastapi', 'django', 'php'],
    database: ['mongodb', 'sql'],
    mobile: ['wechat'],
    ai: ['openai'],
    languages: ['python', 'c#', 'c++'],
    map: ['googlemap'],
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
