const axios = require('axios');
const Integration = require('../models/integrationModel');
const Order = require('../models/orderModel');

const fetchTrendyolOrders = async (req, res) => {
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

const saveIntegration = async (req, res) => {
  try {
    const { apiKey, apiSecret, sellerId } = req.body;

    const integration = await Integration.findOneAndUpdate({}, { apiKey, apiSecret, sellerId }, { upsert: true, new: true });

    res.status(200).json({ message: 'Integration saved successfully.', integration });
  } catch (error) {
    console.error('Error saving integration:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integration = await Integration.findOne();
    if (!integration) {
      return res.status(404).json({ message: 'No integration found' });
    }
    res.status(200).json(integration);
  } catch (error)
