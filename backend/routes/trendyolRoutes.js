const express = require('express');
const router = express.Router();
const { saveIntegration, fetchTrendyolOrders, getIntegrationStatus } = require('../controllers/trendyolController');

router.post('/save-integration', saveIntegration);
router.get('/fetch-orders', fetchTrendyolOrders);
router.get('/integration-status', getIntegrationStatus);

module.exports = router;
