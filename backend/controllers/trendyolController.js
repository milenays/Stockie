const axios = require('axios');
const Integration = require('../models/integrationModel');
const Order = require('../models/orderModel');

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }

    const response = await axios.get('https://api.trendyol.com/sapigw/suppliers/{supplierId}/orders', {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${integration.apiKey}:${integration.apiSecret}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      params: {
        status: 'Created,Picking'
      }
    });

    const orders = response.data.content;
    for (const order of orders) {
      const existingOrder = await Order.findOne({ orderId: order.id });
      if (existingOrder) {
        existingOrder.status = order.status;
        await existingOrder.save();
      } else {
        const newOrder = new Order({
          orderId: order.id,
          customerName: order.customer.fullName,
          totalPrice: order.totalPrice,
          status: order.status,
          // Diğer alanları ekleyin
        });
        await newOrder.save();
      }
    }

    res.status(200).json({ message: 'Orders fetched and saved successfully.' });
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { fetchTrendyolOrders, saveIntegration, getIntegrationStatus };
