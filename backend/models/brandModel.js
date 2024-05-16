const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,  // Eğer description alanının zorunlu olmasını istemiyorsanız
  }
});

module.exports = mongoose.model('Brand', brandSchema);
