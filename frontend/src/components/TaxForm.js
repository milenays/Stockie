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
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { addTax, updateTax } from '../api/taxApi';

const TaxForm = ({ isOpen, onClose, tax, setTaxes }) => {
  const [formData, setFormData] = useState({
    name: '',
    rate: '',
  });

  useEffect(() => {
    if (tax) {
      setFormData(tax);
    }
  }, [tax]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRateChange = (value) => {
    setFormData({
      ...formData,
      rate: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tax) {
        const updatedTax = await updateTax(tax._id, formData);
        setTaxes((prevTaxes) =>
          prevTaxes.map((t) => (t._id === updatedTax._id ? updatedTax : t))
        );
      } else {
        const newTax = await addTax(formData);
        setTaxes((prevTaxes) => [...prevTaxes, newTax]);
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
        <ModalHeader>{tax ? 'Edit Tax' : 'Add Tax'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter tax name"
            />
          </FormControl>
          <FormControl id="rate" isRequired mt={4}>
            <FormLabel>Rate</FormLabel>
            <NumberInput
              value={formData.rate}
              onChange={handleRateChange}
              min={0}
            >
              <NumberInputField name="rate" />
            </NumberInput>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {tax ? 'Update Tax' : 'Add Tax'}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaxForm;
