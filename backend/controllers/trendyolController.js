const axios = require('axios');
const Integration = require('../models/integrationModel');

const saveIntegration = async (req, res) => {
  try {
    const { apiKey, apiSecret, sellerId } = req.body;
    let integration = await Integration.findOne();

    if (!integration) {
      integration = new Integration({ apiKey, apiSecret, sellerId });
    } else {
      integration.apiKey = apiKey;
      integration.apiSecret = apiSecret;
      integration.sellerId = sellerId;
    }

    await integration.save();
    res.json({ status: 'Integration saved', integration });
  } catch (error) {
    console.error('Error saving integration:', error);
    res.status(500).json({ error: 'Failed to save integration' });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      res.json({ status: 'No integration found' });
    } else {
      res.json({ status: 'Integration found', integration });
    }
  } catch (error) {
    console.error('Error fetching integration status:', error);
    res.status(500).json({ error: 'Failed to fetch integration status' });
  }
};

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(400).json({ error: 'No integration found' });
    }

    const { apiKey, apiSecret, sellerId } = integration;
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const response = await axios.get(`https://api.trendyol.com/sapigw/suppliers/${sellerId}/orders`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      params: {
        status: 'Created,Picking',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      },
    });

    const orders = response.data.content;
    res.json({ status: 'Orders fetched successfully', orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = { fetchTrendyolOrders, saveIntegration, getIntegrationStatus };
