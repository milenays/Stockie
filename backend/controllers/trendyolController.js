const { fetchOrdersFromTrendyol } = require('../api/trendyolApi');
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

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }

    const { apiKey, apiSecret, sellerId } = integration;
    const orders = await fetchOrdersFromTrendyol(apiKey, apiSecret, sellerId);

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};
module.exports = { saveIntegration, fetchTrendyolOrders, getIntegrationStatus };
