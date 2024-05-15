const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

// Müşteri Ekleme
router.post('/add', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newCustomer = new Customer({ name, email, phone });
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Müşteri Listeleme
router.get('/list', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Müşteri Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Müşteri Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Customer.findByIdAndDelete(id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
