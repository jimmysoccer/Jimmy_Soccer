import axios from 'axios';
import { educationHistoryUrl } from '../utils/url.store';

export const getEducationHistory = async () => {
  const res = await axios.get(educationHistoryUrl);
  console.log('res', res);
  return res;
};
