import React, { useState, useEffect } from 'react';
import { getVariants, addVariant, updateVariant, deleteVariant } from '../api/variantApi';
import VariantForm from '../components/VariantForm';
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const VariantsPage = () => {
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    const data = await getVariants();
    setVariants(data);
  };

  const handleAdd = () => {
    setSelectedVariant(null);
    onOpen();
  };

  const handleEdit = (variant) => {
    setSelectedVariant(variant);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteVariant(id);
    fetchVariants();
  };

  const handleSubmit = async (values) => {
    if (selectedVariant) {
      await updateVariant(selectedVariant._id, values);
    } else {
      await addVariant(values);
    }
    fetchVariants();
    onClose();
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="teal" mb={4}>Add Variant</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Options</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {variants.map((variant) => (
            <Tr key={variant._id}>
              <Td>{variant.name}</Td>
              <Td>{variant.options.join(', ')}</Td>
              <Td>
                <Button colorScheme="teal" onClick={() => handleEdit(variant)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(variant._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedVariant ? 'Edit Variant' : 'Add Variant'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VariantForm variant={selectedVariant} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default VariantsPage;
