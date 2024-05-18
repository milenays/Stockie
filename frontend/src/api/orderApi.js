import axios from 'axios';

const fetchTrendyolOrders = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/trendyol/fetch-orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching Trendyol orders:', error);
        throw error;
    }
};

export { fetchTrendyolOrders };
