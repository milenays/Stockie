const express = require('express');
const router = express.Router();
const { getOrders, createOrder, deleteOrder, fetchOrdersFromTrendyol } = require('../controllers/orderControllers');

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/:id')
  .delete(deleteOrder);

router.get('/fetch-orders', fetchOrdersFromTrendyol);

module.exports = router;
