const TrendyolIntegration = require('../models/trendyolIntegrationModel');
const axios = require('axios');

const saveIntegration = async (req, res) => {
  try {
    const { apiKey, apiSecret, sellerId } = req.body;
    await TrendyolIntegration.findOneAndUpdate(
      {},
      { apiKey, apiSecret, sellerId },
      { upsert: true }
    );
    res.status(200).json({ message: 'Integration saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving integration', error });
  }
};

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await TrendyolIntegration.findOne({});
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }
    const { apiKey, apiSecret, sellerId } = integration;

    // Fetch orders from Trendyol API
    const response = await axios.get('https://api.trendyol.com/sapigw/suppliers/${sellerId}/orders', {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
      }
    });

    const orders = response.data;
    // Process and save orders in your database here...

    res.status(200).json({ message: 'Orders fetched successfully', orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await TrendyolIntegration.findOne({});
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }
    res.status(200).json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching integration status', error });
  }
};

module.exports = { saveIntegration, fetchTrendyolOrders, getIntegrationStatus };
