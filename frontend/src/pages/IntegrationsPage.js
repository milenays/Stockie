import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { saveIntegration, getIntegrationStatus } from '../api/orderApi';

const IntegrationsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState(null);

  useEffect(() => {
    const fetchIntegrationStatus = async () => {
      try {
        const status = await getIntegrationStatus();
        setIntegrationStatus(status);
      } catch (error) {
        console.error('Error fetching integration status:', error);
      }
    };

    fetchIntegrationStatus();
  }, []);

  const handleSaveIntegration = async () => {
    try {
      const response = await saveIntegration({ apiKey, apiSecret, sellerId });
      setIntegrationStatus(response);
    } catch (error) {
      console.error('Error saving integration:', error);
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>Trendyol Integration</Text>
      <Input
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        mb={4}
      />
      <Input
        placeholder="API Secret"
        value={apiSecret}
        onChange={(e) => setApiSecret(e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Seller ID"
        value={sellerId}
        onChange={(e) => setSellerId(e.target.value)}
        mb={4}
      />
      <Button onClick={handleSaveIntegration} colorScheme="blue">Save Integration</Button>
      {integrationStatus && (
        <Box mt={4}>
          <Text>Integration Status: {integrationStatus.status}</Text>
          <Text>API Key: {integrationStatus.integration.apiKey}</Text>
          <Text>API Secret: {integrationStatus.integration.apiSecret}</Text>
          <Text>Seller ID: {integrationStatus.integration.sellerId}</Text>
        </Box>
      )}
    </Box>
  );
};

export default IntegrationsPage;
