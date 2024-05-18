import React, { useState, useEffect } from 'react';
import { saveIntegration, getIntegrationStatus } from '../api/orderApi';
import { Box, Button, Input, Text } from '@chakra-ui/react';

const IntegrationsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await getIntegrationStatus();
        setIntegrationStatus(status);
      } catch (error) {
        console.error('Error fetching integration status:', error);
      }
    };

    fetchStatus();
  }, []);

  const handleSaveIntegration = async () => {
    try {
      const integrationData = { apiKey, apiSecret, sellerId };
      const response = await saveIntegration(integrationData);
      setIntegrationStatus(response);
    } catch (error) {
      console.error('Error saving integration:', error);
    }
  };

  return (
    <Box p={5}>
      <Box mb={3}>
        <Text fontSize="xl">Trendyol Integration</Text>
        <Input
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="API Secret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          mb={3}
        />
        <Button onClick={handleSaveIntegration} colorScheme="blue">
          Save Integration
        </Button>
      </Box>
      {integrationStatus && (
        <Box mt={5}>
          <Text>Integration Status: {integrationStatus.status}</Text>
          {integrationStatus.integration && (
            <Box>
              <Text>API Key: {integrationStatus.integration.apiKey}</Text>
              <Text>API Secret: {integrationStatus.integration.apiSecret}</Text>
              <Text>Seller ID: {integrationStatus.integration.sellerId}</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default IntegrationsPage;
