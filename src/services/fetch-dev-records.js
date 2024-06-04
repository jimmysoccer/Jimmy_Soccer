//   axios
//     .get('http://111.229.172.53/api/dev/get_all_records')
//     .then((res) => {
//       const data = res?.data;
//       setRecords(data);
//     })
//     .catch((error) => {
//       console.log('error', error);
//     });

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
