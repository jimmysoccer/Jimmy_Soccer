import { privateApi } from "./auth";

// All JS-IH-1 endpoints are private and require a valid session token.
const BASE = "/js-ih-1";

// Add a new record
export const addJSIHRecord = async (date, number) => {
  try {
    const response = await privateApi.post(`${BASE}/add`, { date, number });
    return response.data;
  } catch (error) {
    console.error("Error adding record:", error);
    throw error;
  }
};

// Get records by year
export const getJSIHByYear = async (year) => {
  try {
    const response = await privateApi.get(`${BASE}/year/${year}`);
    return response.data;
  } catch (error) {
    console.error("Error getting records by year:", error);
    throw error;
  }
};

// Get records by month
export const getJSIHByMonth = async (year, month) => {
  try {
    const response = await privateApi.get(`${BASE}/month/${year}/${month}`);
    return response.data;
  } catch (error) {
    console.error("Error getting records by month:", error);
    throw error;
  }
};

// Get records by week
export const getJSIHByWeek = async (year, week) => {
  try {
    const response = await privateApi.get(`${BASE}/week/${year}/${week}`);
    return response.data;
  } catch (error) {
    console.error("Error getting records by week:", error);
    throw error;
  }
};

// Get all records
export const getAllJSIHRecords = async () => {
  try {
    const response = await privateApi.get(`${BASE}/all`);
    return response.data;
  } catch (error) {
    console.error("Error getting all records:", error);
    throw error;
  }
};
