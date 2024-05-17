import React, { useState, useEffect } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';
import { getOrders, fetchTrendyolOrders } from '../api/orderApi';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Error fetching orders.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFetchTrendyolOrders = async () => {
    try {
      await fetchTrendyolOrders();
      fetchOrders(); // Refresh the order list
      toast({
        title: 'Success',
        description: 'Orders fetched from Trendyol successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error fetching Trendyol orders:', error);
      toast({
        title: 'Error',
        description: 'Error fetching orders from Trendyol.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={handleFetchTrendyolOrders}>
        Fetch Orders from Trendyol
      </Button>
      <Table mt={4}>
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
            <Tr key={order._id}>
              <Td>{order.orderId}</Td>
              <Td>{order.customer.name}</Td>
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
