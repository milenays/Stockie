import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/orders';
const integrationUrl = 'http://localhost:5000/api/trendyol';

export const getOrders = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchTrendyolOrders = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/trendyol/fetch-orders');
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    throw error;
  }
};

export const getIntegrationStatus = async () => {
  try {
    const response = await axios.get(`${integrationUrl}/integration-status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching integration status:', error);
    throw error;
  }
};

export const saveIntegration = async (data) => {
  try {
    await axios.post(`${integrationUrl}/save-integration`, data);
  } catch (error) {
    console.error('Error saving integration:', error);
    throw error;
  }
};
