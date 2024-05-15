const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');

// Tedarikçi Ekleme
router.post('/add', async (req, res) => {
  const { name, contactInfo } = req.body;

  try {
    const newSupplier = new Supplier({ name, contactInfo });
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Tedarikçi Listeleme
router.get('/list', async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.json(suppliers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Tedarikçi Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contactInfo } = req.body;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, { name, contactInfo }, { new: true });
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Tedarikçi Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Supplier.findByIdAndDelete(id);
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
