const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderControllers');

// Get All Orders
router.get('/', getOrders);

// Get Single Order
router.get('/:id', getOrder);

// Add Order
router.post('/', addOrder);

// Update Order
router.put('/:id', updateOrder);

// Delete Order
router.delete('/:id', deleteOrder);

module.exports = router;
