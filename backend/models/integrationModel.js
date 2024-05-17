const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    unique: true
  },
  apiKey: {
    type: String,
    required: true
  },
  apiSecret: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  }
});

const Integration = mongoose.model('Integration', integrationSchema);

module.exports = Integration;
