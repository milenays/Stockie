import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchOrdersFromTrendyol = async () => {
    try {
      await axios.get('http://localhost:5000/api/trendyol/fetch-orders');
      fetchOrders();
    } catch (error) {
      console.error('Error fetching orders from Trendyol:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Button onClick={fetchOrdersFromTrendyol}>Fetch Orders from Trendyol</Button>
      <Table>
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
            <Tr key={order.orderId}>
              <Td>{order.orderId}</Td>
              <Td>{order.customerName}</Td>
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
