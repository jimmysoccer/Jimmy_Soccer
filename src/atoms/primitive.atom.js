import { atom } from "jotai";
import { LANGUAGE } from "../constants/navbar-items";
import { hasSession } from "../services/session";

export const languageAtom = atom(LANGUAGE.english.value);
// Client-side hint only; the backend enforces access on every private request.
export const loggedInAtom = atom(hasSession());
