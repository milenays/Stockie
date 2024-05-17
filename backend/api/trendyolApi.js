const Integration = require('../models/integrationModel');
const axios = require('axios');

const saveIntegration = async (req, res) => {
  const { apiKey, apiSecret, sellerId } = req.body;
  try {
    let integration = await Integration.findOne({ platform: 'trendyol' });
    if (integration) {
      integration.apiKey = apiKey;
      integration.apiSecret = apiSecret;
      integration.sellerId = sellerId;
      await integration.save();
    } else {
      integration = new Integration({ platform: 'trendyol', apiKey, apiSecret, sellerId });
      await integration.save();
    }
    res.status(200).json({ message: 'Integration saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving integration', error });
  }
};

module.exports = { saveIntegration };
