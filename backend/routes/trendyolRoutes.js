const express = require('express');
const router = express.Router();
const { saveIntegration, fetchTrendyolOrders, getIntegrationStatus } = require('../controllers/trendyolController');

router.post('/save-integration', saveIntegration);
router.get('/integration-status', getIntegrationStatus);
router.get('/fetch-orders', fetchTrendyolOrders);

module.exports = router;
