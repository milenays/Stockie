import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/trendyol';

export const fetchTrendyolOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/fetch-orders`);
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    throw error;
  }
};

export const saveIntegration = async (integrationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/save-integration`, integrationData);
    return response.data;
  } catch (error) {
    console.error('Error saving integration:', error);
    throw error;
  }
};

export const getIntegrationStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/integration-status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching integration status:', error);
    throw error;
  }
};
