import { atom } from 'jotai';
import { LANGUAGE } from '../const/navBar_const';

export const languageAtom = atom(LANGUAGE.english.value);
