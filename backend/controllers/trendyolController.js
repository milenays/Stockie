const Integration = require('../models/integrationModel');

const saveIntegration = async (req, res) => {
  try {
    const { apiKey, apiSecret, sellerId } = req.body;
    // Save the integration details to the database
    const integration = new Integration({ apiKey, apiSecret, sellerId });
    await integration.save();
    res.status(201).json({ message: 'Integration saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save integration', error });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    res.status(200).json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch integration status', error });
  }
};

const fetchTrendyolOrders = async (req, res) => {
  try {
    // Fetch orders from Trendyol API using stored integration details
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }
    const orders = await getOrdersFromTrendyol(integration.apiKey, integration.apiSecret, integration.sellerId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

module.exports = { saveIntegration, fetchTrendyolOrders, getIntegrationStatus };
