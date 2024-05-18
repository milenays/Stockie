const express = require('express');
const { fetchTrendyolOrders, saveIntegration, getIntegrationStatus } = require('../controllers/trendyolController');

const router = express.Router();

router.get('/fetch-orders', fetchTrendyolOrders);
router.post('/save-integration', saveIntegration);
router.get('/integration-status', getIntegrationStatus);

module.exports = router;
