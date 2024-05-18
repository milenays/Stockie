import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Input } from '@chakra-ui/react';
import { getIntegrationStatus, saveIntegration } from '../api/orderApi';

const IntegrationPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [status, setStatus] = useState('');

  const fetchIntegrationStatus = async () => {
    try {
      const response = await getIntegrationStatus();
      const { apiKey, apiSecret, sellerId } = response.integration;
      setApiKey(apiKey);
      setApiSecret(apiSecret);
      setSellerId(sellerId);
    } catch (error) {
      console.error('Error fetching integration status:', error.message);
    }
  };

  useEffect(() => {
    fetchIntegrationStatus();
  }, []);

  const handleSaveIntegration = async () => {
    try {
      await saveIntegration({ apiKey, apiSecret, sellerId });
      setStatus('Integration saved successfully');
    } catch (error) {
      setStatus('Error saving integration: ' + error.message);
    }
  };

  return (
    <Box p={4}>
      <Input
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="API Secret"
        value={apiSecret}
        onChange={(e) => setApiSecret(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Seller ID"
        value={sellerId}
        onChange={(e) => setSellerId(e.target.value)}
        mb={2}
      />
      <Button onClick={handleSaveIntegration}>Save Integration</Button>
      {status && <Text mt={4}>{status}</Text>}
    </Box>
  );
};

export default IntegrationPage;
