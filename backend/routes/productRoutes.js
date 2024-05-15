const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');

// Ürün Ekleme
router.post('/add', async (req, res) => {
  const { name, stockCode, barcode, brand, category, weight, description, images, marketPrice, salePrice, purchasePrice, stock, fakeStock, criticalStock } = req.body;

  try {
    const newProduct = new Product({
      uniqueId: uuidv4(),
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
      criticalStock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ürün Listeleme
router.get('/list', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ürün Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, stockCode, barcode, brand, category, weight, description, images, marketPrice, salePrice, purchasePrice, stock, fakeStock, criticalStock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
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
      criticalStock
    }, { new: true });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ürün Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
