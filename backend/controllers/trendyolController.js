const axios = require('axios');
const Order = require('../models/orderModel');
const Integration = require('../models/integrationModel');

const TRENDYOL_ORDERS_API_URL = 'https://api.trendyol.com/sapigw/suppliers/<your_supplier_id>/orders';

const saveIntegration = async (req, res) => {
  const { apiKey, apiSecret, sellerId } = req.body;
  try {
    const integration = await Integration.findOneAndUpdate(
      { platform: 'Trendyol' },
      { apiKey, apiSecret, sellerId },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Integration saved successfully', integration });
  } catch (error) {
    res.status(500).json({ message: 'Error saving integration', error });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne({ platform: 'Trendyol' });
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }
    res.status(200).json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const fetchTrendyolOrders = async (req, res) => {
  try {
    const integration = await Integration.findOne({ platform: 'Trendyol' });
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }

    const response = await axios.get(TRENDYOL_ORDERS_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${integration.apiKey}:${integration.apiSecret}`).toString('base64')}`
      }
    });

    const orders = response.data.content;
    const existingOrders = await Order.find();
    const updatedOrders = [];

    orders.forEach((order) => {
      const existingOrder = existingOrders.find(o => o.orderNumber === order.orderNumber);
      if (!existingOrder) {
        const newOrder = new Order({
          orderNumber: order.orderNumber,
          customerFirstName: order.customerFirstName,
          customerLastName: order.customerLastName,
          totalPrice: order.totalPrice,
          status: order.status,
          shipmentAddress: order.shipmentAddress,
          lines: order.lines,
          cargoTrackingNumber: order.cargoTrackingNumber,
          cargoProviderName: order.cargoProviderName,
        });
        updatedOrders.push(newOrder);
        newOrder.save();
      } else if (existingOrder.status !== order.status) {
        existingOrder.status = order.status;
        existingOrder.save();
        updatedOrders.push(existingOrder);
      }
    });

    res.status(200).json({ orders: updatedOrders });
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { fetchTrendyolOrders, saveIntegration, getIntegrationStatus };
