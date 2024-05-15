const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

// Get all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one customer
router.get('/customers/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// Create a customer
router.post('/customers', async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a customer
router.put('/customers/:id', getCustomer, async (req, res) => {
  if (req.body.name != null) {
    res.customer.name = req.body.name;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.customer.phone = req.body.phone;
  }
  if (req.body.address != null) {
    res.customer.address = req.body.address;
  }
  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a customer
router.delete('/customers/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: 'Deleted Customer' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCustomer(req, res, next) {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: 'Cannot find customer' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.customer = customer;
  next();
}

module.exports = router;
