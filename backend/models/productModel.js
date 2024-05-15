const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  weight: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  marketPrice: {
    type: Number,
  },
  purchasePrice: {
    type: Number,
  },
  barcode: {
    type: String,
    unique: true,
  },
  images: [String],
});

module.exports = mongoose.model('Product', productSchema);
