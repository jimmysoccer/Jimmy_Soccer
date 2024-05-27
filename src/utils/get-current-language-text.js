import { LANGUAGE } from '../constants/navbar-items';

export function getCurrentLanguageText(language, englishValue, chineseValue) {
  switch (language) {
    case LANGUAGE.english.value:
      return englishValue;
    case LANGUAGE.chinese.value:
      return chineseValue;
    default:
      return englishValue;
  }
}
