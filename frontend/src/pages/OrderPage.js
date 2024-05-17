import React, { useState } from 'react';
import { Button, Table, Thead, Tbody, Tr, Th, Td, Box, useToast } from '@chakra-ui/react';
import { fetchTrendyolOrders } from '../api/orderApi';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const handleFetchTrendyolOrders = async () => {
    try {
      const fetchedOrders = await fetchTrendyolOrders();
      setOrders(fetchedOrders);
      toast({
        title: "Orders fetched.",
        description: "Orders fetched from Trendyol successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error fetching orders.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Button colorScheme="teal" onClick={handleFetchTrendyolOrders}>Fetch Orders from Trendyol</Button>
      {orders.length > 0 ? (
        <Table variant="simple" mt={5}>
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
                <Td>{order.customerFirstName} {order.customerLastName}</Td>
                <Td>{order.totalPrice}</Td>
                <Td>{order.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Box mt={5}>
          <Text>No orders found.</Text>
        </Box>
      )}
    </Box>
  );
};

export default OrderPage;
