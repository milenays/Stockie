import React, { useState, useEffect } from 'react';
import { getTaxes, addTax, updateTax, deleteTax } from '../api/taxApi';
import TaxForm from '../components/TaxForm';
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const TaxesPage = () => {
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchTaxes();
  }, []);

  const fetchTaxes = async () => {
    const data = await getTaxes();
    setTaxes(data);
  };

  const handleAdd = () => {
    setSelectedTax(null);
    onOpen();
  };

  const handleEdit = (tax) => {
    setSelectedTax(tax);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteTax(id);
    fetchTaxes();
  };

  const handleSubmit = async (values) => {
    if (selectedTax) {
      await updateTax(selectedTax._id, values);
    } else {
      await addTax(values);
    }
    fetchTaxes();
    onClose();
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="teal" mb={4}>Add Tax</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Rate</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {taxes.map((tax) => (
            <Tr key={tax._id}>
              <Td>{tax.name}</Td>
              <Td>{tax.rate}</Td>
              <Td>
                <Button colorScheme="teal" onClick={() => handleEdit(tax)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(tax._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedTax ? 'Edit Tax' : 'Add Tax'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaxForm tax={selectedTax} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TaxesPage;
