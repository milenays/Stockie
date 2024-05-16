import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
} from '@chakra-ui/react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';
import { addOrder, updateOrder, deleteOrder } from '../api/orderApi';

const OrderPage = () => {
  const [isOrderFormOpen, setOrderFormOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleOrderSave = async (order) => {
    if (currentOrder) {
      await updateOrder(currentOrder._id, order);
    } else {
      await addOrder(order);
    }
    setOrderFormOpen(false);
    setCurrentOrder(null);
  };

  const handleOrderEdit = (order) => {
    setCurrentOrder(order);
    setOrderFormOpen(true);
  };

  const handleOrderDelete = async (orderId) => {
    await deleteOrder(orderId);
  };

  return (
    <Box p={5}>
      <VStack spacing={5} align="stretch">
        <Heading as="h1" size="xl">Orders</Heading>
        <Button onClick={() => {
          setCurrentOrder(null);
          setOrderFormOpen(true);
        }}>Add Order</Button>
        <OrderList onEdit={handleOrderEdit} onDelete={handleOrderDelete} />
        <OrderForm
          isOpen={isOrderFormOpen}
          onClose={() => setOrderFormOpen(false)}
          onSave={handleOrderSave}
          order={currentOrder}
        />
      </VStack>
    </Box>
  );
};

export default OrderPage;
