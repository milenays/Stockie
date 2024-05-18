import React, { useState, useEffect } from 'react';
import { getIntegrationStatus, saveIntegration } from '../api/orderApi';
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const IntegrationsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIntegrationStatus = async () => {
      try {
        const status = await getIntegrationStatus();
        setIntegrationStatus(status);
      } catch (error) {
        setError(error);
      }
    };

    fetchIntegrationStatus();
  }, []);

  const handleSaveIntegration = async () => {
    try {
      const response = await saveIntegration(apiKey, apiSecret, sellerId);
      setIntegrationStatus(response);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Trendyol Integration</Heading>
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
      <Button colorScheme="teal" onClick={handleSaveIntegration}>
        Save Integration
      </Button>
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          Error: {error.message}
        </Alert>
      )}
      {integrationStatus && (
        <Text mt={4}>
          Integration Status: {integrationStatus.status}
        </Text>
      )}
    </Box>
  );
};

export default IntegrationsPage;
