const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Add Product
router.post('/add', async (req, res) => {
  const {
    name,
    stockCode,
    barcode,
    brand,
    category,
    weight,
    description,
    images,
    marketPrice,
    salePrice,
    purchasePrice,
    stock,
    fakeStock,
    criticalStock,
    uniqueId
  } = req.body;

  // Gelen verileri kontrol etmek için loglama
  console.log(req.body);

  // Check for required fields
  if (!name || !stockCode || !barcode || !brand || !category || !salePrice || !stock || !uniqueId) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const newProduct = new Product({
      name,
      stockCode,
      barcode,
      brand,
      category,
      weight,
      description,
      images,
      marketPrice,
      salePrice,
      purchasePrice,
      stock,
      fakeStock,
      criticalStock,
      uniqueId
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error); // Hata mesajını loglama
    res.status(400).json({ message: 'Error adding product', error });
  }
});

// Diğer endpointler
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching products', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;
