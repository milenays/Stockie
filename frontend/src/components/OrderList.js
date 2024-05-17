import React, { useEffect, useState } from 'react';
import { fetchTrendyolOrders } from '../api/orderApi';
import { Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from '@chakra-ui/react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      const response = await fetchTrendyolOrders();
      setOrders(response.orders);
      toast({
        title: "Orders fetched successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to fetch orders",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Button onClick={fetchOrders} colorScheme="teal" mb={4}>Fetch Orders from Trendyol</Button>
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
          {orders.map(order => (
            <Tr key={order.orderNumber}>
              <Td>{order.orderNumber}</Td>
              <Td>{order.customerFirstName} {order.customerLastName}</Td>
              <Td>{order.totalPrice}</Td>
              <Td>{order.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default OrderList;
