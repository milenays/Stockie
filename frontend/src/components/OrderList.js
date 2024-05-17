import React from 'react';
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
} from '@chakra-ui/react';
import { fetchTrendyolOrders } from '../api/orderApi';

const OrderList = ({ orders }) => {
  const handleFetchOrders = async () => {
    await fetchTrendyolOrders();
  };

  return (
    <Box p={5}>
      <Heading size="lg" mb={5}>
        Orders
      </Heading>
      <Button onClick={handleFetchOrders} colorScheme="teal" mb={5}>
        Fetch Orders from Trendyol
      </Button>
      <TableContainer>
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
              <Tr key={order.orderNumber}>
                <Td>{order.orderNumber}</Td>
                <Td>{`${order.customerFirstName} ${order.customerLastName}`}</Td>
                <Td>{order.totalPrice}</Td>
                <Td>{order.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderList;
