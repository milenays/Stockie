const TrendyolIntegration = require('../models/trendyolIntegrationModel');
const { fetchOrdersFromTrendyol } = require('../api/trendyolApi');

const saveIntegration = async (req, res) => {
  const { apiKey, apiSecret, sellerId } = req.body;

  try {
    let integration = await TrendyolIntegration.findOne({});
    if (integration) {
      integration.apiKey = apiKey;
      integration.apiSecret = apiSecret;
      integration.sellerId = sellerId;
    } else {
      integration = new TrendyolIntegration({ apiKey, apiSecret, sellerId });
    }
    await integration.save();
    res.status(200).json({ message: 'Integration saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save integration', error });
  }
};

const fetchTrendyolOrders = async (req, res) => {
  try {
    const orders = await fetchOrdersFromTrendyol();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await TrendyolIntegration.findOne({});
    if (integration) {
      res.status(200).json({ status: 'ON' });
    } else {
      res.status(200).json({ status: 'OFF' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get integration status', error });
  }
};

module.exports = { saveIntegration, fetchTrendyolOrders, getIntegrationStatus };
