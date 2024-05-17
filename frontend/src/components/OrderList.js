import React, { useEffect, useState } from 'react';
import { fetchTrendyolOrders, getOrders } from '../api/orderApi';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  Heading,
  Flex,
  Text,
  Spinner,
} from '@chakra-ui/react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleFetchTrendyolOrders = async () => {
    setLoading(true);
    try {
      await fetchTrendyolOrders();
      fetchOrders(); // Fetch the orders again after fetching from Trendyol
    } catch (error) {
      console.error('Error fetching Trendyol orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading>Orders</Heading>
        <Button onClick={handleFetchTrendyolOrders} colorScheme="teal" isLoading={loading}>
          Fetch Orders from Trendyol
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
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
                <Td>{order.customerName}</Td>
                <Td>{order.totalPrice}</Td>
                <Td>{order.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {orders.length === 0 && !loading && <Text mt={4}>No orders found.</Text>}
    </Box>
  );
};

export default OrderList;
