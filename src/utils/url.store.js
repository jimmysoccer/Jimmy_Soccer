let fastApiHost;
let fastApiPort;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  fastApiHost = 'http://127.0.0.1';
  fastApiPort = 8000;
} else {
  // production code
  fastApiHost = 'http://124.221.98.15';
  fastApiPort = 443;
}
export const fastAPiUrl = `${fastApiHost}:${fastApiPort}`;
export const educationHistoryUrl = `${fastAPiUrl}/jimmy_website/get_education_history`;
