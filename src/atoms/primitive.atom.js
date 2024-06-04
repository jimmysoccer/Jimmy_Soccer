import { atom } from 'jotai';
import { LANGUAGE } from '../constants/navbar-items';

export const languageAtom = atom(LANGUAGE.english.value);
export const loggedInAtom = atom(false);
