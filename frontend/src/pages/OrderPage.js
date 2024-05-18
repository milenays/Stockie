import React, { useState, useEffect } from 'react';
import { fetchTrendyolOrders } from '../api/orderApi';
import { Box, Text, Button } from '@chakra-ui/react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchTrendyolOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTrendyolOrders();
      setOrders(response.orders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchTrendyolOrders();
  }, []);

  return (
    <Box>
      <Button onClick={handleFetchTrendyolOrders} isLoading={loading}>
        Fetch Orders from Trendyol
      </Button>
      {error && <Text color="red.500">Error fetching Trendyol orders: {error}</Text>}
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <Box key={order.id} p={4} borderWidth="1px" borderRadius="lg">
            <Text>Order ID: {order.id}</Text>
            <Text>Order Number: {order.orderNumber}</Text>
            <Text>Customer Name: {order.customerFirstName} {order.customerLastName}</Text>
            <Text>Order Status: {order.status}</Text>
            <Text>Total Price: {order.totalPrice}</Text>
            <Text>Delivery Type: {order.deliveryType}</Text>
          </Box>
        ))
      ) : (
        <Text>No orders found</Text>
      )}
    </Box>
  );
};

export default OrderPage;
