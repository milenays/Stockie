import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Flex height="100vh">
      <Sidebar />
      <Box flex="1" padding="4">
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
