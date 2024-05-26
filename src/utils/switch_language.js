import { LANGUAGE } from '../const/navBar_const';

export function language_correct(language, englishValue, chineseValue) {
  switch (language) {
    case LANGUAGE.english.value:
      return englishValue;
    case LANGUAGE.chinese.value:
      return chineseValue;
    default:
      return englishValue;
  }
}
