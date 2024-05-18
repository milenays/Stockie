import React, { useState } from 'react';
import { fetchTrendyolOrders } from '../api/orderApi';
import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(30);

  const handleFetchTrendyolOrders = async () => {
    try {
      const response = await fetchTrendyolOrders();
      if (Array.isArray(response.orders)) {
        setOrders(response.orders);
      } else {
        console.error('Fetched orders is not an array', response.orders);
      }
    } catch (error) {
      console.error('Error fetching Trendyol orders:', error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box>
      <Button onClick={handleFetchTrendyolOrders}>Fetch Orders from Trendyol</Button>
      <Text>Order List</Text>
      <Table>
        <Thead>
          <Tr>
            <Th>Order Number</Th>
            <Th>Customer Name</Th>
            <Th>Total Price</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentOrders.map(order => (
            <Tr key={order.orderNumber}>
              <Td>{order.orderNumber}</Td>
              <Td>{`${order.customerFirstName} ${order.customerLastName}`}</Td>
              <Td>{order.totalPrice}</Td>
              <Td>{order.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box>
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
          <Button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default OrderPage;
