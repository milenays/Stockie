const express = require('express');
const { saveIntegration, fetchTrendyolOrders, getIntegrationStatus } = require('../controllers/trendyolController');

const router = express.Router();

router.post('/save-integration', saveIntegration);
router.get('/fetch-orders', fetchTrendyolOrders);
router.get('/integration-status', getIntegrationStatus);

module.exports = router;
