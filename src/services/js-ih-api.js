import axios from 'axios';

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

const baseUrl = `${fastAPiUrl}/jimmy_website`;

// Add a new record
export const addJSIHRecord = async (date, number) => {
  try {
    const response = await axios.post(`${baseUrl}/js-ih-1/add`, {
      date: date,
      number: number,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding record:', error);
    throw error;
  }
};

// Get records by year
export const getJSIHByYear = async (year) => {
  try {
    const response = await axios.get(`${baseUrl}/js-ih-1/year/${year}`);
    return response.data;
  } catch (error) {
    console.error('Error getting records by year:', error);
    throw error;
  }
};

// Get records by month
export const getJSIHByMonth = async (year, month) => {
  try {
    const response = await axios.get(
      `${baseUrl}/js-ih-1/month/${year}/${month}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting records by month:', error);
    throw error;
  }
};

// Get records by week
export const getJSIHByWeek = async (year, week) => {
  try {
    const response = await axios.get(`${baseUrl}/js-ih-1/week/${year}/${week}`);
    return response.data;
  } catch (error) {
    console.error('Error getting records by week:', error);
    throw error;
  }
};

// Get all records
export const getAllJSIHRecords = async () => {
  try {
    const response = await axios.get(`${baseUrl}/js-ih-1/all`);
    return response.data;
  } catch (error) {
    console.error('Error getting all records:', error);
    throw error;
  }
};
