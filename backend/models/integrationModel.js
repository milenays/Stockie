const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  apiKey: { type: String, required: true },
  apiSecret: { type: String, required: true },
  sellerId: { type: String, required: true },
});

const Integration = mongoose.model('Integration', integrationSchema);

module.exports = Integration;
