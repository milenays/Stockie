import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { getDashboardData } from '../api/dashboardApi';

const Dashboard = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalSuppliers: 0,
    recentOrders: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>Dashboard</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={4}>
        <GridItem bg="blue.500" color="white" p={4} borderRadius="md">
          <Heading as="h2" size="md">Total Orders</Heading>
          <Text fontSize="2xl">{data.totalOrders}</Text>
        </GridItem>
        <GridItem bg="green.500" color="white" p={4} borderRadius="md">
          <Heading as="h2" size="md">Total Customers</Heading>
          <Text fontSize="2xl">{data.totalCustomers}</Text>
        </GridItem>
        <GridItem bg="yellow.500" color="white" p={4} borderRadius="md">
          <Heading as="h2" size="md">Total Products</Heading>
          <Text fontSize="2xl">{data.totalProducts}</Text>
        </GridItem>
        <GridItem bg="red.500" color="white" p={4} borderRadius="md">
          <Heading as="h2" size="md">Total Suppliers</Heading>
          <Text fontSize="2xl">{data.totalSuppliers}</Text>
        </GridItem>
      </Grid>
      <Heading as="h2" size="lg" mb={4}>Recent Orders</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.recentOrders.map((order) => (
            <Tr key={order._id}>
              <Td>{order._id}</Td>
              <Td>{order.customer.name}</Td>
              <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
              <Td>{order.total}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Dashboard;
