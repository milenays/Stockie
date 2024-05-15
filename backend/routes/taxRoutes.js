const express = require('express');
const router = express.Router();
const Tax = require('../models/taxModel');

// Get all taxes
router.get('/', async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.json(taxes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new tax
router.post('/', async (req, res) => {
  const tax = new Tax({
    name: req.body.name,
    rate: req.body.rate,
  });

  try {
    const newTax = await tax.save();
    res.status(201).json(newTax);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a tax
router.put('/:id', async (req, res) => {
  try {
    const tax = await Tax.findById(req.params.id);
    if (!tax) {
      return res.status(404).json({ message: 'Tax not found' });
    }

    tax.name = req.body.name;
    tax.rate = req.body.rate;

    const updatedTax = await tax.save();
    res.json(updatedTax);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tax
router.delete('/:id', async (req, res) => {
  try {
    const tax = await Tax.findById(req.params.id);
    if (!tax) {
      return res.status(404).json({ message: 'Tax not found' });
    }

    await tax.remove();
    res.json({ message: 'Tax deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
