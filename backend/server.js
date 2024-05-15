const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const tagRoutes = require('./routes/tagRoutes');
const taxRoutes = require('./routes/taxRoutes');
const variantRoutes = require('./routes/variantRoutes');

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
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/taxes', taxRoutes);
app.use('/api/variants', variantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
