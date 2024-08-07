import axios from 'axios';
import { devRecordsUrl } from './api-url';

export const fetchDevRecords = async () => {
  try {
    const res = await axios.get(devRecordsUrl);
    return res?.data;
  } catch (error) {
    console.log('error', error);
  }
};
