import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/orders';

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
    await axios.get('http://localhost:5000/api/trendyol/fetch-orders');
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    throw error;
  }
};
