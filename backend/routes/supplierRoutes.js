const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');

router.post('/add', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newSupplier = new Supplier({ name, email, phone, address });
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.json(suppliers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, { name, email, phone, address }, { new: true });
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
