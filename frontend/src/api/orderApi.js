import axios from 'axios';

export const fetchTrendyolOrders = async () => {
  try {
    const response = await axios.get('/api/trendyol/fetch-orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    throw error;
  }
};

export const saveIntegration = async (integrationData) => {
  try {
    const response = await axios.post('/api/trendyol/save-integration', integrationData);
    return response.data;
  } catch (error) {
    console.error('Error saving integration:', error);
    throw error;
  }
};

export const getIntegrationStatus = async (integrationType) => {
  try {
    const response = await axios.get(`/api/${integrationType}/integration-status`);
    return response.data;
  } catch (error) {
    console.error('Error fetching integration status:', error);
    throw error;
  }
};
