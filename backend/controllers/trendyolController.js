const axios = require('axios');
const Integration = require('../models/integration');

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    const { apiKey, apiSecret, sellerId } = integration;

    // Tarih aralığını hesapla (son bir ay)
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const startDate = oneMonthAgo.toISOString();
    const endDate = new Date().toISOString();

    // Trendyol API isteği
    const response = await axios.get('https://api.trendyol.com/sapigw/suppliers/{sellerId}/orders', {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
      },
      params: {
        'status': 'Created,Picking,Shipped',
        'startDate': startDate,
        'endDate': endDate,
        'orderByField': 'CreatedDate',
        'orderByDirection': 'DESC',
      },
    });

    const orders = response.data;
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching Trendyol orders', error: error.message });
  }
};

module.exports = { fetchTrendyolOrders };
