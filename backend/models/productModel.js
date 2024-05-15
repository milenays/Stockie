const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  stockCode: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
  marketPrice: {
    type: Number,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: true,
  },
  fakeStock: {
    type: Number,
  },
  criticalStock: {
    type: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
