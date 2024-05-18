const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customerFirstName: String,
  customerLastName: String,
  totalPrice: Number,
  currencyCode: String,
  status: String,
  shipmentAddress: Object,
  lines: Array,
  orderDate: Date,
});

module.exports = mongoose.model('Order', orderSchema);
