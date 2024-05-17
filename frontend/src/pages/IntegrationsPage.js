import React, { useState, useEffect } from 'react';
import { Button, Input, Box, Text, useToast } from '@chakra-ui/react';
import { saveIntegration, getIntegrationStatus } from '../api/orderApi';

const IntegrationsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchIntegrationStatus = async () => {
      try {
        const data = await getIntegrationStatus();
        setApiKey(data.apiKey);
        setApiSecret(data.apiSecret);
        setSellerId(data.sellerId);
      } catch (error) {
        console.error('Error fetching integration status:', error);
      }
    };

    fetchIntegrationStatus();
  }, []);

  const handleSaveIntegration = async () => {
    try {
      await saveIntegration({ apiKey, apiSecret, sellerId });
      toast({
        title: "Integration saved.",
        description: "Your integration settings have been saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving integration.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={5}>Trendyol Integration</Text>
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
      <Button colorScheme="teal" onClick={handleSaveIntegration}>Save Integration</Button>
    </Box>
  );
};

export default IntegrationsPage;
