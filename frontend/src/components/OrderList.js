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
} from '@chakra-ui/react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleFetchTrendyolOrders = async () => {
    try {
      await fetchTrendyolOrders();
      fetchOrders(); // Fetch the orders again after fetching from Trendyol
    } catch (error) {
      console.error('Error fetching Trendyol orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Button onClick={handleFetchTrendyolOrders} colorScheme="teal" mb={4}>
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
    </div>
  );
};

export default OrderList;
