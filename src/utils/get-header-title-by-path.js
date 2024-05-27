import { LANGUAGE, NAV_BAR } from '../constants/navbar-items';

export default function getHeaderTitleByPath(path, language) {
  switch (language) {
    case LANGUAGE.english.value:
      return Object.values(NAV_BAR).find((item) => item.path === path)?.title;
    case LANGUAGE.chinese.value:
      return Object.values(NAV_BAR).find((item) => item.path === path)
        ?.titleChinese;
    default:
      return Object.values(NAV_BAR).find((item) => item.path === path)?.title;
  }
}
