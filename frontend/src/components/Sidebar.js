import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, Text, Stack, Collapse, useDisclosure, Icon } from '@chakra-ui/react';
import { MdDashboard, MdShoppingCart, MdCategory, MdBrandingWatermark, MdLocalOffer, MdPeople, MdLocalShipping, MdTag, MdAttachMoney, MdExpandMore, MdExpandLess, MdViewList, MdSettings, MdIntegrationInstructions } from 'react-icons/md';

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isSettingsOpen, onToggle: onSettingsToggle } = useDisclosure();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box bg="teal.500" color="white" minH="100vh" p={4}>
      <Flex mb={8}>
        <Text fontSize="2xl" fontWeight="bold">Stockie</Text>
      </Flex>
      <Stack spacing={4}>
        <Link to="/">
          <Flex align="center" p={2} bg={isActive('/') ? 'teal.700' : 'teal.500'} borderRadius="md">
            <Icon as={MdDashboard} mr={2} />
            <Text>Dashboard</Text>
          </Flex>
        </Link>
        <Link to="/orders">
          <Flex align="center" p={2} bg={isActive('/orders') ? 'teal.700' : 'teal.500'} borderRadius="md">
            <Icon as={MdShoppingCart} mr={2} />
            <Text>Orders</Text>
          </Flex>
        </Link>
        <Box>
          <Flex align="center" p={2} bg="teal.500" borderRadius="md" onClick={onToggle} cursor="pointer">
            <Icon as={MdCategory} mr={2} />
            <Text>Products</Text>
            <Icon as={isOpen ? MdExpandLess : MdExpandMore} ml="auto" />
          </Flex>
          <Collapse in={isOpen}>
            <Stack pl={4} mt={2} spacing={2}>
              <Link to="/products">
                <Flex align="center" p={2} bg={isActive('/products') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdViewList} mr={2} />
                  <Text>Product List</Text>
                </Flex>
              </Link>
              <Link to="/categories">
                <Flex align="center" p={2} bg={isActive('/categories') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdCategory} mr={2} />
                  <Text>Categories</Text>
                </Flex>
              </Link>
              <Link to="/variants">
                <Flex align="center" p={2} bg={isActive('/variants') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdLocalOffer} mr={2} />
                  <Text>Variants</Text>
                </Flex>
              </Link>
              <Link to="/brands">
                <Flex align="center" p={2} bg={isActive('/brands') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdBrandingWatermark} mr={2} />
                  <Text>Brands</Text>
                </Flex>
              </Link>
              <Link to="/taxes">
                <Flex align="center" p={2} bg={isActive('/taxes') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdAttachMoney} mr={2} />
                  <Text>Taxes</Text>
                </Flex>
              </Link>
              <Link to="/tags">
                <Flex align="center" p={2} bg={isActive('/tags') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdTag} mr={2} />
                  <Text>Tags</Text>
                </Flex>
              </Link>
              <Link to="/customers">
                <Flex align="center" p={2} bg={isActive('/customers') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdPeople} mr={2} />
                  <Text>Customers</Text>
                </Flex>
              </Link>
              <Link to="/suppliers">
                <Flex align="center" p={2} bg={isActive('/suppliers') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdLocalShipping} mr={2} />
                  <Text>Suppliers</Text>
                </Flex>
              </Link>
            </Stack>
          </Collapse>
        </Box>
        <Box>
          <Flex align="center" p={2} bg="teal.500" borderRadius="md" onClick={onSettingsToggle} cursor="pointer">
            <Icon as={MdSettings} mr={2} />
            <Text>Settings</Text>
            <Icon as={isSettingsOpen ? MdExpandLess : MdExpandMore} ml="auto" />
          </Flex>
          <Collapse in={isSettingsOpen}>
            <Stack pl={4} mt={2} spacing={2}>
              <Link to="/integrations">
                <Flex align="center" p={2} bg={isActive('/integrations') ? 'teal.700' : 'teal.500'} borderRadius="md">
                  <Icon as={MdIntegrationInstructions} mr={2} />
                  <Text>Integrations</Text>
                </Flex>
              </Link>
            </Stack>
          </Collapse>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
