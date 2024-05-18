import axios from 'axios';

export const fetchTrendyolOrders = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/trendyol/fetch-orders');
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error.response?.data || error.message);
    throw error;
  }
};

export const saveIntegration = async (apiKey, apiSecret, sellerId) => {
  try {
    const response = await axios.post('http://localhost:5000/api/trendyol/save-integration', {
      apiKey,
      apiSecret,
      sellerId,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving integration:', error.response?.data || error.message);
    throw error;
  }
};

export const getIntegrationStatus = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/trendyol/integration-status');
    return response.data;
  } catch (error) {
    console.error('Error fetching integration status:', error.response?.data || error.message);
    throw error;
  }
};
