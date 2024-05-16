import React, { useState, useEffect } from 'react';
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../api/supplierApi';
import SupplierForm from '../components/SupplierForm';
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleAdd = () => {
    setSelectedSupplier(null);
    onOpen();
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteSupplier(id);
    fetchSuppliers();
  };

  const handleSubmit = async (values) => {
    if (selectedSupplier) {
      await updateSupplier(selectedSupplier._id, values);
    } else {
      await addSupplier(values);
    }
    fetchSuppliers();
    onClose();
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="teal" mb={4}>Add Supplier</Button>
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
          {suppliers.map((supplier) => (
            <Tr key={supplier._id}>
              <Td>{supplier.name}</Td>
              <Td>{supplier.email}</Td>
              <Td>{supplier.phone}</Td>
              <Td>{supplier.address}</Td>
              <Td>
                <Button colorScheme="teal" onClick={() => handleEdit(supplier)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(supplier._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SupplierForm supplier={selectedSupplier} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SuppliersPage;
