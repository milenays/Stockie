// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, VStack, Text } from '@chakra-ui/react';
import { FiHome, FiPackage, FiList, FiUsers, FiBox, FiTag, FiPercent, FiSliders } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <Box width="250px" bg="teal.500" color="white" padding="4">
      <Text fontSize="xl" fontWeight="bold" mb="4">Stockie</Text>
      <VStack spacing="4" align="stretch">
        <Link to="/dashboard"><FiHome /> Dashboard</Link>
        <Link to="/products"><FiPackage /> Products</Link>
        <Link to="/categories"><FiList /> Categories</Link>
        <Link to="/brands"><FiBox /> Brands</Link>
        <Link to="/customers"><FiUsers /> Customers</Link>
        <Link to="/suppliers"><FiBox /> Suppliers</Link>
        <Link to="/tags"><FiTag /> Tags</Link>
        <Link to="/taxes"><FiPercent /> Taxes</Link>
        <Link to="/variants"><FiSliders /> Variants</Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
