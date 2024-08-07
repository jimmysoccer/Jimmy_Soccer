import axios from 'axios';
import { getUserAuthenUrl } from './api-url';

export const getUserAuth = async (username, password) => {
  try {
    const res = await axios.get(getUserAuthenUrl, {
      params: {
        username,
        password,
      },
    });
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
