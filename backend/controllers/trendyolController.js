const axios = require('axios');
const Integration = require('../models/integrationModel');

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    const { apiKey, apiSecret, sellerId } = integration;

    // Tarih aralığını hesapla (son 1 ay)
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const startDate = Math.floor(oneMonthAgo.getTime());
    const endDate = Math.floor(Date.now());

    // Trendyol API isteği
    const response = await axios.get(`https://api.trendyol.com/sapigw/suppliers/${sellerId}/orders`, {
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

    const orders = response.data.content;
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching Trendyol orders', error: error.message });
  }
};

const saveIntegration = async (req, res) => {
  try {
    const { apiKey, apiSecret, sellerId } = req.body;
    let integration = await Integration.findOne();
    if (integration) {
      integration.apiKey = apiKey;
      integration.apiSecret = apiSecret;
      integration.sellerId = sellerId;
    } else {
      integration = new Integration({ apiKey, apiSecret, sellerId });
    }
    await integration.save();
    res.status(200).json({ message: 'Integration saved successfully' });
  } catch (error) {
    console.error('Error saving integration:', error.message);
    res.status(500).json({ message: 'Error saving integration', error: error.message });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ status: 'Integration not found' });
    }
    res.status(200).json({ status: 'Integration found', integration });
  } catch (error) {
    console.error('Error fetching integration status:', error.message);
    res.status(500).json({ message: 'Error fetching integration status', error: error.message });
  }
};

module.exports = { fetchTrendyolOrders, saveIntegration, getIntegrationStatus };
