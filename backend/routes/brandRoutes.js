const express = require('express');
const router = express.Router();
const Brand = require('../models/brandModel');

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new brand
router.post('/', async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
  });
  
  try {
    const newBrand = await brand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a brand
router.put('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    brand.name = req.body.name;

    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a brand
router.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    await brand.remove();
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
