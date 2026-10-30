/**
 * Session token storage (no network code, so it can be used anywhere
 * without pulling axios into the main bundle).
 * Stored in sessionStorage so it is cleared when the browser tab closes.
 */
const TOKEN_KEY = "jc_token";
const EXPIRY_KEY = "jc_token_exp";

const storage = {
  get(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* storage unavailable: session lasts for this page view only */
    }
  },
  remove(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

let memoryToken = null;

const listeners = new Set();

export function getToken() {
  const token = memoryToken || storage.get(TOKEN_KEY);
  const exp = Number(storage.get(EXPIRY_KEY) || 0);
  if (token && exp && exp * 1000 < Date.now()) {
    clearSession();
    return null;
  }
  return token;
}

export function hasSession() {
  return Boolean(getToken());
}

export function onSessionChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn(hasSession()));
}

export function clearSession() {
  memoryToken = null;
  storage.remove(TOKEN_KEY);
  storage.remove(EXPIRY_KEY);
  emit();
}

export function saveSession(token, expiresAt) {
  memoryToken = token;
  storage.set(TOKEN_KEY, token);
  if (expiresAt) storage.set(EXPIRY_KEY, String(expiresAt));
  emit();
}
