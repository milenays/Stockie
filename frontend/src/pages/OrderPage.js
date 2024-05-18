import React, { useState } from 'react';
import { fetchTrendyolOrders } from '../api/orderApi';
import { Button, Box, Text } from '@chakra-ui/react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchTrendyolOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchTrendyolOrders();
      console.log('Fetched orders:', response.data.orders); // Add this log
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching Trendyol orders:', error);
      setError('Error fetching Trendyol orders');
    }
    setLoading(false);
  };

  return (
    <Box>
      <Button onClick={handleFetchTrendyolOrders} isLoading={loading}>
        Fetch Orders from Trendyol
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      {orders.length > 0 ? (
        orders.map((order) => (
          <Box key={order.id}>
            <Text>Order ID: {order.id}</Text>
            <Text>Customer: {order.customerFirstName} {order.customerLastName}</Text>
            <Text>Total Amount: {order.totalPrice} {order.currencyCode}</Text>
          </Box>
        ))
      ) : (
        !loading && <Text>No orders found</Text>
      )}
    </Box>
  );
};

export default OrderPage;
