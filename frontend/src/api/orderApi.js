import axios from 'axios';

export const fetchTrendyolOrders = async () => {
  const response = await axios.get('http://localhost:5000/api/trendyol/fetch-orders');
  return response.data;
};

export const saveIntegration = async (data) => {
  const response = await axios.post('http://localhost:5000/api/trendyol/save-integration', data);
  return response.data;
};

export const getIntegrationStatus = async () => {
  const response = await axios.get('http://localhost:5000/api/trendyol/integration-status');
  return response.data;
};
