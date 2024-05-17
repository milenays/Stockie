import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchTrendyolOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trendyol/fetch-orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    throw error;
  }
};

export const getIntegrationStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trendyol/integration-status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching integration status:', error);
    throw error;
  }
};

export const saveIntegration = async (integrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/trendyol/save-integration`, integrationData);
    return response.data;
  } catch (error) {
    console.error('Error saving integration:', error);
    throw error;
  }
};
