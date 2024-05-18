import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text, Stack } from '@chakra-ui/react';
import { saveIntegration, getIntegrationStatus } from '../api/orderApi';

const IntegrationsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await getIntegrationStatus();
      setIntegrationStatus(status);
    };
    fetchStatus();
  }, []);

  const handleSaveIntegration = async () => {
    try {
      await saveIntegration({ apiKey, apiSecret, sellerId });
      setIntegrationStatus('Integration saved successfully');
    } catch (error) {
      setIntegrationStatus(`Error: ${error.message}`);
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Text fontSize="xl">Trendyol Integration</Text>
        <Input
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Input
          placeholder="API Secret"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
        />
        <Input
          placeholder="Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
        />
        <Button onClick={handleSaveIntegration} colorScheme="blue">
          Save Integration
        </Button>
        <Text>Integration Status: {integrationStatus}</Text>
      </Stack>
    </Box>
  );
};

export default IntegrationsPage;
