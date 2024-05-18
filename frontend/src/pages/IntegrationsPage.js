import React, { useState, useEffect } from 'react';
import { getIntegrationStatus, saveIntegration } from '../api/orderApi';
import { Box, Text, Input, Button, Select } from '@chakra-ui/react';

const IntegrationsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');
  const [integrationStatus, setIntegrationStatus] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState('trendyol');

  const fetchIntegrationStatus = async () => {
    try {
      const response = await getIntegrationStatus(selectedIntegration);
      setIntegrationStatus(response);
    } catch (error) {
      console.error('Error fetching integration status:', error);
    }
  };

  const handleSaveIntegration = async () => {
    try {
      const response = await saveIntegration({ apiKey, apiSecret, sellerId });
      setIntegrationStatus(response);
    } catch (error) {
      console.error('Error saving integration:', error);
    }
  };

  useEffect(() => {
    fetchIntegrationStatus();
  }, [selectedIntegration]);

  return (
    <Box>
      <Select onChange={(e) => setSelectedIntegration(e.target.value)}>
        <option value="trendyol">Trendyol</option>
        {/* Diğer entegrasyonlar buraya eklenecek */}
      </Select>
      {selectedIntegration === 'trendyol' && (
        <Box>
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
          <Button onClick={handleSaveIntegration}>Save Integration</Button>
          <Text>Integration Status: {integrationStatus.status}</Text>
        </Box>
      )}
    </Box>
  );
};

export default IntegrationsPage;
