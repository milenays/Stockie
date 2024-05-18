const express = require('express');
const router = express.Router();
const { fetchTrendyolOrders, saveIntegration, getIntegrationStatus } = require('../controllers/trendyolController');

router.get('/fetch-orders', fetchTrendyolOrders);
router.post('/save-integration', saveIntegration);
router.get('/get-integration-status', getIntegrationStatus);

module.exports = router;
