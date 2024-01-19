let fastApiHost;
let fastApiPort;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  fastApiHost = 'http://127.0.0.1';
  fastApiPort = import.meta.env.FASTAPI_PORT_DEV;
} else {
  // production code
  fastApiHost = 'http://124.221.98.15';
  fastApiPort = import.meta.env.FASTAPI_PORT_PROD;
}
export const fastAPiUrl = `${fastApiHost}:${fastApiPort}`;
export const educationHistoryUrl = `${fastAPiUrl}/jimmy_website/get_education_history`;
