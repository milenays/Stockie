const express = require('express');
const router = express.Router();
const Variant = require('../models/variantModel');

// Get all variants
router.get('/', async (req, res) => {
  try {
    const variants = await Variant.find();
    res.json(variants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new variant
router.post('/', async (req, res) => {
  const variant = new Variant({
    name: req.body.name,
  });

  try {
    const newVariant = await variant.save();
    res.status(201).json(newVariant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a variant
router.put('/:id', async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);
    if (!variant) {
      return res.status(404).json({ message: 'Variant not found' });
    }

    variant.name = req.body.name;

    const updatedVariant = await variant.save();
    res.json(updatedVariant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a variant
router.delete('/:id', async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);
    if (!variant) {
      return res.status(404).json({ message: 'Variant not found' });
    }

    await variant.remove();
    res.json({ message: 'Variant deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
