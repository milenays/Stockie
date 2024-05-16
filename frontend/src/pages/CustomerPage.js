import React, { useState, useEffect } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../api/customerApi';
import CustomerForm from '../components/CustomerForm';
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    onOpen();
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  const handleSubmit = async (values) => {
    if (selectedCustomer) {
      await updateCustomer(selectedCustomer._id, values);
    } else {
      await addCustomer(values);
    }
    fetchCustomers();
    onClose();
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="teal" mb={4}>Add Customer</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr key={customer._id}>
              <Td>{customer.name}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.phone}</Td>
              <Td>{customer.address}</Td>
              <Td>
                <Button colorScheme="teal" onClick={() => handleEdit(customer)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(customer._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCustomer ? 'Edit Customer' : 'Add Customer'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CustomerForm customer={selectedCustomer} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CustomersPage;
