import React, { useState, useEffect } from 'react';
import { getBrands, addBrand, updateBrand, deleteBrand } from '../api/brandApi';
import BrandForm from '../components/BrandForm';
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const data = await getBrands();
    setBrands(data);
  };

  const handleAdd = () => {
    setSelectedBrand(null);
    onOpen();
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteBrand(id);
    fetchBrands();
  };

  const handleSubmit = async (values) => {
    if (selectedBrand) {
      await updateBrand(selectedBrand._id, values);
    } else {
      await addBrand(values);
    }
    fetchBrands();
    onClose();
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="teal" mb={4}>Add Brand</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {brands.map((brand) => (
            <Tr key={brand._id}>
              <Td>{brand.name}</Td>
              <Td>{brand.description}</Td>
              <Td>
                <Button colorScheme="teal" onClick={() => handleEdit(brand)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(brand._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedBrand ? 'Edit Brand' : 'Add Brand'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BrandForm brand={selectedBrand} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BrandsPage;
