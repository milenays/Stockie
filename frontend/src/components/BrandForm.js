import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';
import { addBrand, updateBrand } from '../api/brandApi';

const BrandForm = ({ isOpen, onClose, brand, setBrands }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (brand) {
      setFormData({ name: brand.name });
    } else {
      setFormData({ name: '' });
    }
  }, [brand]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (brand) {
        await updateBrand(brand._id, formData);
        setBrands((prevBrands) =>
          prevBrands.map((b) => (b._id === brand._id ? { ...b, name: formData.name } : b))
        );
      } else {
        const newBrand = await addBrand(formData);
        setBrands((prevBrands) => [...prevBrands, newBrand]);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{brand ? 'Edit Brand' : 'Add Brand'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" isRequired>
            <FormLabel>Brand Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter brand name"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {brand ? 'Update Brand' : 'Add Brand'}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BrandForm;
