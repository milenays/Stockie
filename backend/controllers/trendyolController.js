const axios = require('axios');
const Integration = require('../models/integrationModel');

// Function to save integration details
const saveIntegration = async (req, res) => {
  const { apiKey, apiSecret, sellerId } = req.body;
  try {
    let integration = await Integration.findOne();
    if (integration) {
      integration.apiKey = apiKey;
      integration.apiSecret = apiSecret;
      integration.sellerId = sellerId;
      await integration.save();
    } else {
      integration = new Integration({ apiKey, apiSecret, sellerId });
      await integration.save();
    }
    res.status(200).json({ message: 'Integration details saved successfully' });
  } catch (error) {
    console.error('Error saving integration details:', error.message);
    res.status(500).json({ message: 'Error saving integration details', error: error.message });
  }
};

// Function to fetch orders from Trendyol
const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }

    const { apiKey, apiSecret, sellerId } = integration;
    const url = `https://api.trendyol.com/sapigw/suppliers/${sellerId}/orders`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Function to get integration status
const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (integration) {
      res.status(200).json(integration);
    } else {
      res.status(404).json({ message: 'No integration found' });
    }
  } catch (error) {
    console.error('Error fetching integration status:', error.message);
    res.status(500).json({ message: 'Error fetching integration status', error: error.message });
  }
};

module.exports = { saveIntegration, fetchTrendyolOrders, getIntegrationStatus };
