import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';
import { getOrders, fetchTrendyolOrders } from '../api/orderApi';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error fetching orders.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleFetchTrendyolOrders = async () => {
    try {
      await fetchTrendyolOrders();
      fetchOrders();
    } catch (error) {
      console.error('Error fetching Trendyol orders:', error);
      toast({
        title: 'Error fetching Trendyol orders.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box p={5}>
      <Button onClick={handleFetchTrendyolOrders} mb={5}>
        Fetch Orders from Trendyol
      </Button>
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

export default OrderList;
