const express = require('express');
const router = express.Router();
const Brand = require('../models/brandModel');

// Marka Ekleme
router.post('/add', async (req, res) => {
  const { name } = req.body;

  try {
    const newBrand = new Brand({ name });
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Marka Listeleme
router.get('/list', async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.json(brands);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Marka Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Marka Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Brand.findByIdAndDelete(id);
    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
