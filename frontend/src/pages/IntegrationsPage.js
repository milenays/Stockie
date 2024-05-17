import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const IntegrationsPage = () => {
  const [integrationStatus, setIntegrationStatus] = useState('OFF');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [sellerId, setSellerId] = useState('');

  useEffect(() => {
    const fetchIntegrationStatus = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/trendyol/integration-status');
        setIntegrationStatus(data.status);
      } catch (error) {
        console.error('Error fetching integration status:', error);
      }
    };

    fetchIntegrationStatus();
  }, []);

  const saveIntegration = async () => {
    try {
      await axios.post('http://localhost:5000/api/trendyol/save-integration', {
        apiKey,
        apiSecret,
        sellerId,
      });
      setIntegrationStatus('ON');
    } catch (error) {
      console.error('Error saving integration:', error);
    }
  };

  return (
    <div>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="integration-status" mb="0">
          Trendyol Integration
        </FormLabel>
        <Switch id="integration-status" isChecked={integrationStatus === 'ON'} isReadOnly />
      </FormControl>
      <FormControl>
        <FormLabel>API Key</FormLabel>
        <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>API Secret</FormLabel>
        <Input value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Seller ID</FormLabel>
        <Input value={sellerId} onChange={(e) => setSellerId(e.target.value)} />
      </FormControl>
      <Button onClick={saveIntegration}>Add Integration</Button>
    </div>
  );
};

export default IntegrationsPage;
