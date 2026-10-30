let fastAPiUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  fastAPiUrl = "http://127.0.0.1:8000";
} else {
  // production code
  fastAPiUrl = "https://backend-dot-jimmysoccer.uc.r.appspot.com";
}

export const apiBaseUrl = `${fastAPiUrl}/jimmy_website`;
export const getUserAuthenUrl = `${apiBaseUrl}/login`;
