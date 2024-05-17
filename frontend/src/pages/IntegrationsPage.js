import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { saveIntegration, getIntegrationStatus } from '../api/orderApi';

const IntegrationsPage = () => {
  const [trendyolIntegration, setTrendyolIntegration] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchIntegrationStatus = async () => {
      try {
        const status = await getIntegrationStatus();
        if (status) {
          setTrendyolIntegration(true);
          setApiKey(status.apiKey);
          setApiSecret(status.apiSecret);
          setSellerId(status.sellerId);
        }
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
        title: 'Integration saved.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      setTrendyolIntegration(true);
    } catch (error) {
      console.error('Error saving integration:', error);
      toast({
        title: 'Error saving integration.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <FormControl display="flex" alignItems="center" mb={5}>
        <FormLabel htmlFor="trendyol-integration" mb="0">
          Trendyol Integration
        </FormLabel>
        <Switch
          id="trendyol-integration"
          isChecked={trendyolIntegration}
          onChange={() => setTrendyolIntegration(!trendyolIntegration)}
          isDisabled={trendyolIntegration}
        />
      </FormControl>
      {trendyolIntegration ? (
        <>
          <FormControl id="apiKey" mb={4}>
            <FormLabel>API Key</FormLabel>
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </FormControl>
          <FormControl id="apiSecret" mb={4}>
            <FormLabel>API Secret</FormLabel>
            <Input
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
            />
          </FormControl>
          <FormControl id="sellerId" mb={4}>
            <FormLabel>Seller ID</FormLabel>
            <Input
              value={sellerId}
              onChange={(e) => setSellerId(e.target.value)}
            />
          </FormControl>
          <Button onClick={handleSaveIntegration}>Save Integration</Button>
        </>
      ) : (
        <Button onClick={handleSaveIntegration}>Add Trendyol Integration</Button>
      )}
    </Box>
  );
};

export default IntegrationsPage;
