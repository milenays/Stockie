const express = require('express');
const router = express.Router();
const Tax = require('../models/taxModel');

// Vergi Ekleme
router.post('/add', async (req, res) => {
  const { name, rate } = req.body;

  try {
    const newTax = new Tax({ name, rate });
    const savedTax = await newTax.save();
    res.status(201).json(savedTax);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vergi Listeleme
router.get('/list', async (req, res) => {
  try {
    const taxes = await Tax.find({});
    res.json(taxes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vergi Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, rate } = req.body;

  try {
    const updatedTax = await Tax.findByIdAndUpdate(id, { name, rate }, { new: true });
    res.json(updatedTax);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vergi Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Tax.findByIdAndDelete(id);
    res.json({ message: 'Tax deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
