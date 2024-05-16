import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { getOrders } from '../api/orderApi';
import OrderForm from './OrderForm';

const OrderList = ({ onEdit, onDelete }) => {
  const [orders, setOrders] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);
    onOpen();
  };

  const handleDelete = (orderId) => {
    onDelete(orderId);
    fetchOrders();
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Cargo</Th>
            <Th>Cargo Number</Th>
            <Th>Customer</Th>
            <Th>Order Products</Th>
            <Th>Total Price</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.length === 0 ? (
            <Tr>
              <Td colSpan="8" textAlign="center">No Orders Found</Td>
            </Tr>
          ) : (
            orders.map((order) => (
              <Tr key={order._id}>
                <Td>{order.orderId}</Td>
                <Td>{order.cargo}</Td>
                <Td>{order.cargoNumber}</Td>
                <Td>{order.customer.name}</Td>
                <Td>{order.orderProducts.map((product) => (
                  <Box key={product.productId}>
                    {product.name} - {product.quantity} x ${product.salePrice}
                  </Box>
                ))}</Td>
                <Td>${order.totalPrice}</Td>
                <Td>{order.status}</Td>
                <Td>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => handleEdit(order)}
                    mr={2}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(order._id)}
                  />
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <OrderForm
        isOpen={isOpen}
        onClose={onClose}
        onSave={(order) => {
          onEdit(order);
          fetchOrders();
        }}
        order={currentOrder}
      />
    </Box>
  );
};

export default OrderList;
