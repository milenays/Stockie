const axios = require('axios');
const Order = require('../models/orderModel');
const Integration = require('../models/integrationModel');

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne({});
    if (!integration) {
      return res.status(400).json({ error: 'Integration not found' });
    }

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const params = {
      status: 'Created,Picking,Shipped',
      startDate: oneMonthAgo.toISOString(),
      endDate: new Date().toISOString(),
    };

    const response = await axios.get('https://api.trendyol.com/sapigw/suppliers/{supplierId}/orders', {
      params,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${integration.apiKey}:${integration.apiSecret}`).toString('base64')}`,
      },
    });

    const { content } = response.data;
    const orders = content.map(order => ({
      orderNumber: order.orderNumber,
      customerFirstName: order.customerFirstName,
      customerLastName: order.customerLastName,
      totalPrice: order.totalPrice,
      currencyCode: order.currencyCode,
      status: order.status,
      shipmentAddress: order.shipmentAddress,
      lines: order.lines,
      orderDate: new Date(order.orderDate),
    }));

    await Order.insertMany(orders, { ordered: false, rawResult: true });

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    res.status(500).json({ error: error.message });
  }
};

const saveIntegration = async (req, res) => {
  try {
    const { apiKey, apiSecret, sellerId } = req.body;
    let integration = await Integration.findOne({});
    if (!integration) {
      integration = new Integration({ apiKey, apiSecret, sellerId });
    } else {
      integration.apiKey = apiKey;
      integration.apiSecret = apiSecret;
      integration.sellerId = sellerId;
    }
    await integration.save();
    res.json({ status: 'Integration saved successfully', integration });
  } catch (error) {
    console.error('Error saving integration:', error);
    res.status(500).json({ error: error.message });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne({});
    if (!integration) {
      return res.status(404).json({ status: 'Integration not found' });
    }
    res.json({ status: 'Integration found', integration });
  } catch (error) {
    console.error('Error getting integration status:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchTrendyolOrders, saveIntegration, getIntegrationStatus };
