import React, { useState, useEffect } from 'react';
import { getIntegrationStatus, saveIntegration } from '../api/orderApi';
import { Button, Input, Alert } from '@chakra-ui/react';

const IntegrationsPage = () => {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [integrationStatus, setIntegrationStatus] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSaveIntegration = async () => {
        try {
            const data = { apiKey, apiSecret };
            await saveIntegration(data);
            setSuccess('Integration saved successfully');
            setError(null);
        } catch (error) {
            setError('Error saving integration');
            setSuccess(null);
        }
    };

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const status = await getIntegrationStatus();
                setIntegrationStatus(status);
                setError(null);
            } catch (error) {
                setError('Error fetching integration status');
                setIntegrationStatus(null);
            }
        };

        fetchStatus();
    }, []);

    return (
        <div>
            <h1>Trendyol Integration</h1>
            {error && <Alert status="error">{error}</Alert>}
            {success && <Alert status="success">{success}</Alert>}
            <div>
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
                <Button onClick={handleSaveIntegration}>Save Integration</Button>
            </div>
            <div>
                {integrationStatus ? (
                    <p>Integration Status: {integrationStatus.status}</p>
                ) : (
                    <p>Loading integration status...</p>
                )}
            </div>
        </div>
    );
};

export default IntegrationsPage;
