import React, { useState, useEffect } from 'react';
import { Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { getCustomers, deleteCustomer } from '../api/customerApi';
import CustomerForm from './CustomerForm';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    setCustomers(customers.filter((customer) => customer._id !== id));
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="blue" mb={4}>
        Add Customer
      </Button>
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
                <Button mr={2} onClick={() => handleEdit(customer)}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(customer._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isFormOpen && (
        <CustomerForm
          isOpen={isFormOpen}
          onClose={handleClose}
          customer={selectedCustomer}
          setCustomers={setCustomers}
        />
      )}
    </div>
  );
};

export default CustomerList;
