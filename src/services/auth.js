import axios from "axios";
import { apiBaseUrl } from "./api-url";
import { clearSession, getToken, saveSession } from "./session";

export { clearSession, getToken, hasSession, onSessionChange } from "./session";

/**
 * Session handling for the private area (Jimmy's Corner).
 * The token is issued by the backend on login and must be sent as a bearer
 * token; the backend rejects private requests without a valid token.
 */
/** Log in; resolves true on success, false on invalid credentials. */
export async function login(username, password) {
  try {
    const res = await axios.post(`${apiBaseUrl}/login`, { username, password });
    const { token, expires_at: expiresAt } = res.data || {};
    if (!token) return false;
    saveSession(token, expiresAt);
    return true;
  } catch (error) {
    if (error?.response?.status === 401) return false;
    throw error;
  }
}

/** Ask the backend whether the stored token is still valid. */
export async function verifySession() {
  if (!getToken()) return false;
  try {
    await privateApi.get("/me");
    return true;
  } catch {
    return false;
  }
}

/** Axios instance for private endpoints: adds the bearer token, drops the session on 401. */
export const privateApi = axios.create({ baseURL: apiBaseUrl });

privateApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) clearSession();
    return Promise.reject(error);
  },
);
