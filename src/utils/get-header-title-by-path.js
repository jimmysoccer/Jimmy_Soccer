import { LANGUAGE, NAV_BAR } from "../constants/navbar-items";

/** Find the site section a path belongs to (longest matching prefix). */
export function getSectionByPath(path) {
  return Object.values(NAV_BAR)
    .filter((item) =>
      item.path === "/"
        ? path === "/"
        : path === item.path || path.startsWith(item.path + "/"),
    )
    .sort((a, b) => b.path.length - a.path.length)[0];
}

export default function getHeaderTitleByPath(path, language) {
  const item = getSectionByPath(path);
  if (!item) return undefined;
  return language === LANGUAGE.chinese.value
    ? item.seoTitleChinese || item.titleChinese
    : item.seoTitle || item.title;
}
