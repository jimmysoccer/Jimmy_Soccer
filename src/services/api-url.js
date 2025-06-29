let fastApiHost;
let fastApiPort;
let fastAPiUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  fastApiHost = 'http://127.0.0.1';
  fastApiPort = 8000;
  fastAPiUrl = `${fastApiHost}:${fastApiPort}`;
} else {
  // production code
  fastApiHost = 'https://backend-dot-jimmysoccer.uc.r.appspot.com';
  fastAPiUrl = fastApiHost;
}
export const getUserAuthenUrl = `${fastAPiUrl}/jimmy_website/login`;
