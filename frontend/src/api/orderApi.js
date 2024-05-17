import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/orders';

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchTrendyolOrders = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/trendyol/fetch-orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders from Trendyol:', error);
    throw error;
  }
};
