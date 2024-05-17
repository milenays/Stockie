const axios = require('axios');
const Integration = require('../models/integrationModel'); // veya trendyolIntegrationModel
const Order = require('../models/orderModel');

const fetchOrdersFromTrendyol = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }

    const response = await axios.get(`https://api.trendyol.com/sapigw/suppliers/${integration.sellerId}/orders`, {
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
      const orderData = {
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName: `${order.customerFirstName} ${order.customerLastName}`,
        address: order.shipmentAddress.address1,
        city: order.shipmentAddress.city,
        district: order.shipmentAddress.district,
        totalPrice: order.grossAmount,
        cargoTrackingNumber: order.cargoTrackingNumber,
        cargoProviderName: order.cargoProviderName,
        status: order.status,
        orderLines: order.lines.map(line => ({
          quantity: line.quantity,
          productName: line.productName
        }))
      };

      if (existingOrder) {
        await Order.updateOne({ orderId: order.id }, orderData);
      } else {
        const newOrder = new Order(orderData);
        await newOrder.save();
      }
    }

    res.status(200).json({ message: 'Orders fetched and saved successfully.' });
  } catch (error) {
    console.error('Error fetching Trendyol orders:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { getOrders, createOrder, deleteOrder, fetchOrdersFromTrendyol };
