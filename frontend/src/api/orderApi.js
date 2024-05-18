import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/trendyol';

export const saveIntegration = async (integrationData) => {
  const response = await axios.post(`${API_BASE_URL}/save-integration`, integrationData);
  return response.data;
};

export const getIntegrationStatus = async () => {
  const response = await axios.get(`${API_BASE_URL}/integration-status`);
  return response.data;
};

export const fetchTrendyolOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/fetch-orders`);
  return response.data;
};
