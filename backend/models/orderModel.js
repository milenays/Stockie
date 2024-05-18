const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customerFirstName: String,
  customerLastName: String,
  totalPrice: Number,
  currencyCode: String,
  status: String,
  shipmentAddress: {
    fullName: String,
    address1: String,
    address2: String,
    city: String,
    district: String,
    postalCode: String,
    countryCode: String,
    phone: String,
  },
  lines: [
    {
      productName: String,
      quantity: Number,
      price: Number,
      productCode: String,
    },
  ],
  orderDate: Date,
});

module.exports = mongoose.model('Order', orderSchema);
