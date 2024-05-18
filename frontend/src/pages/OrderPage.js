import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { fetchTrendyolOrders } from '../api/orderApi';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchTrendyolOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchTrendyolOrders();
      setOrders(response.orders);
    } catch (error) {
      setError('Error fetching Trendyol orders: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <Box p={4}>
      <Button onClick={handleFetchTrendyolOrders} isLoading={loading} mb={4}>
        Fetch Orders from Trendyol
      </Button>
      {error && <Text color="red.500">{error}</Text>}
      <Flex direction="column">
        {orders.length === 0 ? (
          <Text>No orders found</Text>
        ) : (
          orders.map((order) => (
            <Box key={order.orderNumber} p={4} shadow="md" borderWidth="1px">
              <Text>Order Number: {order.orderNumber}</Text>
              <Text>Customer Name: {order.customerFirstName} {order.customerLastName}</Text>
              <Text>Address: {order.shipmentAddress.fullAddress}</Text>
              <Text>Amount: {order.grossAmount}</Text>
              <Text>Status: {order.status}</Text>
            </Box>
          ))
        )}
      </Flex>
    </Box>
  );
};

export default OrderPage;
