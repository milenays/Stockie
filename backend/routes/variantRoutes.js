const express = require('express');
const router = express.Router();
const Variant = require('../models/variantModel');

// Varyant Ekleme
router.post('/add', async (req, res) => {
  const { name, options } = req.body;

  try {
    const newVariant = new Variant({ name, options });
    const savedVariant = await newVariant.save();
    res.status(201).json(savedVariant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Varyant Listeleme
router.get('/list', async (req, res) => {
  try {
    const variants = await Variant.find({});
    res.json(variants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Varyant Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, options } = req.body;

  try {
    const updatedVariant = await Variant.findByIdAndUpdate(id, { name, options }, { new: true });
    res.json(updatedVariant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Varyant Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Variant.findByIdAndDelete(id);
    res.json({ message: 'Variant deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
