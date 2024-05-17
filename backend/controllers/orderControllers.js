const Order = require('../models/orderModel');
const { fetchOrders } = require('../api/trendyolApi');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Siparişler getirilemedi', error });
  }
};

const addOrder = async (req, res) => {
  // Add order logic
};

const updateOrder = async (req, res) => {
  // Update order logic
};

const deleteOrder = async (req, res) => {
  // Delete order logic
};

const fetchTrendyolOrders = async (req, res) => {
  try {
    const orders = await fetchOrders();

    // Trendyol'dan gelen siparişleri işle ve veritabanına ekle/güncelle
    for (const order of orders) {
      const existingOrder = await Order.findOne({ orderId: order.id });
      if (existingOrder) {
        existingOrder.status = order.status;
        await existingOrder.save();
      } else {
        await Order.create({
          orderId: order.id,
          customer: order.customer,
          products: order.products,
          totalPrice: order.totalPrice,
          cargo: order.cargo,
          cargoNumber: order.cargoNumber,
          status: order.status
        });
      }
    }

    res.status(200).json({ message: 'Siparişler başarıyla güncellendi' });
  } catch (error) {
    res.status(500).json({ message: 'Siparişler güncellenemedi', error });
  }
};

module.exports = { getOrders, addOrder, updateOrder, deleteOrder, fetchTrendyolOrders };
