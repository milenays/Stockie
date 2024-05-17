const axios = require('axios');
const Integration = require('../models/integrationModel');

// Save integration details
const saveIntegration = async (req, res) => {
  try {
    const { apiKey, apiSecret, sellerId } = req.body;
    const integration = await Integration.findOneAndUpdate(
      {},
      { apiKey, apiSecret, sellerId },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Integration saved successfully', integration });
  } catch (error) {
    console.error('Error saving integration:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Fetch orders from Trendyol
const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }

    const response = await axios.get(`https://api.trendyol.com/sapigw/suppliers/${integration.sellerId}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${integration.apiKey}:${integration.apiSecret}`).toString('base64')}`
      },
    });

    const orders = response.data.content;
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get integration status
const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }
    res.status(200).json({ integration });
  } catch (error) {
    console.error('Error fetching integration status:', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { fetchTrendyolOrders, saveIntegration, getIntegrationStatus };
