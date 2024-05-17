const mongoose = require('mongoose');

const orderLineSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  productName: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true },
  orderNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  cargoTrackingNumber: { type: String, required: true },
  cargoProviderName: { type: String, required: true },
  status: { type: String, required: true },
  orderLines: [orderLineSchema]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
