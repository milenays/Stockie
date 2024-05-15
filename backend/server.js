const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // API rotaları

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Veritabanı bağlantısı
mongoose.connect('mongodb://localhost:27017/stockie', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.log(err);
});

// Rotalar
app.use('/api/products', productRoutes); // Ürün rotaları

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
