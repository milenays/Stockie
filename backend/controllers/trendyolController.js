const axios = require('axios');
const Order = require('../models/orderModel'); // Düzenlendi

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

module.exports = { fetchTrendyolOrders };
