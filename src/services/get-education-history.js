import axios from 'axios';
import { educationHistoryUrl } from './api-url';

export const getEducationHistory = async () => {
  const res = await axios.get(educationHistoryUrl);
  return res;
};
