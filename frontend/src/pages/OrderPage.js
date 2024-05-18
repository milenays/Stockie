import React, { useState, useEffect } from 'react';
import { fetchTrendyolOrders } from '../api/orderApi';
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const handleFetchTrendyolOrders = async () => {
    try {
      const fetchedOrders = await fetchTrendyolOrders();
      setOrders(fetchedOrders);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Orders</Heading>
      <Button colorScheme="teal" onClick={handleFetchTrendyolOrders} mb={4}>
        Fetch Orders from Trendyol
      </Button>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          Error fetching Trendyol orders: {error.message}
        </Alert>
      )}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Total Price</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.orderNumber}</Td>
              <Td>{order.customerFirstName} {order.customerLastName}</Td>
              <Td>{order.totalPrice}</Td>
              <Td>{order.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderPage;
