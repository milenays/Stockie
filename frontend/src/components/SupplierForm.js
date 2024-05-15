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
import { addSupplier, updateSupplier } from '../api/supplierApi';

const SupplierForm = ({ isOpen, onClose, supplier, setSuppliers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        name: supplier.name || '',
        email: supplier.email || '',
        phone: supplier.phone || '',
        address: supplier.address || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    }
  }, [supplier]);

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
      if (supplier) {
        await updateSupplier(supplier._id, formData);
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((s) =>
            s._id === supplier._id ? { ...s, ...formData } : s
          )
        );
      } else {
        const newSupplier = await addSupplier(formData);
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
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
        <ModalHeader>{supplier ? 'Edit Supplier' : 'Add Supplier'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="email" isRequired mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="phone" isRequired mt={4}>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="address" isRequired mt={4}>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {supplier ? 'Update Supplier' : 'Add Supplier'}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SupplierForm;
