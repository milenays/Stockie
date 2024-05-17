const express = require('express');
const router = express.Router();
const { getOrders, addOrder, updateOrder, deleteOrder, fetchTrendyolOrders } = require('../controllers/orderControllers');

// Order routes
router.route('/')
  .get(getOrders)  // Bu satırdaki hatanın nedeni muhtemelen getOrders fonksiyonunun tanımlı olmaması
  .post(addOrder);

router.route('/:id')
  .put(updateOrder)
  .delete(deleteOrder);

router.post('/fetch-trendyol', fetchTrendyolOrders);

module.exports = router;
