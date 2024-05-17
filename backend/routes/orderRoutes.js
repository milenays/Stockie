const express = require('express');
const router = express.Router();
const {
  getOrders,
  addOrder,
  deleteOrder,
  updateOrder
} = require('../controllers/orderControllers');
const {
  fetchTrendyolOrders,
  saveIntegration,
  getIntegrationStatus
} = require('../controllers/trendyolController');

router.route('/').get(getOrders).post(addOrder);
router.route('/:id').delete(deleteOrder).put(updateOrder);
router.route('/trendyol/fetch-orders').get(fetchTrendyolOrders);
router.route('/trendyol/save-integration').post(saveIntegration);
router.route('/trendyol/integration-status').get(getIntegrationStatus);

module.exports = router;
