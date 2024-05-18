const axios = require('axios');
const Integration = require('../models/integrationModel'); // Model adını doğru kullandığınızdan emin olun

const fetchTrendyolOrders = async (req, res) => {
    try {
        const integration = await Integration.findOne();
        if (!integration) {
            return res.status(404).json({ message: 'No integration found' });
        }

        const response = await axios.get('https://api.trendyol.com/sapigw/suppliers/{supplierId}/orders', {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${integration.apiKey}:${integration.apiSecret}`).toString('base64')}`,
            },
            params: {
                status: ['Created', 'Picking'],
                size: 100,
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching Trendyol orders:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const saveIntegration = async (req, res) => {
    try {
        const { apiKey, apiSecret } = req.body;
        let integration = await Integration.findOne();

        if (integration) {
            integration.apiKey = apiKey;
            integration.apiSecret = apiSecret;
        } else {
            integration = new Integration({ apiKey, apiSecret });
        }

        await integration.save();
        res.status(200).json({ message: 'Integration saved successfully' });
    } catch (error) {
        console.error('Error saving integration:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getIntegrationStatus = async (req, res) => {
    try {
        const integration = await Integration.findOne();
        if (!integration) {
            return res.status(404).json({ message: 'No integration found' });
        }

        res.status(200).json({ status: 'Integration found', integration });
    } catch (error) {
        console.error('Error fetching integration status:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = { fetchTrendyolOrders, saveIntegration, getIntegrationStatus };
