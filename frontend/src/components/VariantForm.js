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
} from '@chakra-ui/react';
import { addVariant, updateVariant } from '../api/variantApi';

const VariantForm = ({ isOpen, onClose, variant, setVariants }) => {
  const [formData, setFormData] = useState({
    name: '',
    options: '',
  });

  useEffect(() => {
    if (variant) {
      setFormData({
        name: variant.name || '',
        options: Array.isArray(variant.options) ? variant.options.join(', ') : '',
      });
    } else {
      setFormData({
        name: '',
        options: '',
      });
    }
  }, [variant, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const variantData = {
      ...formData,
      options: formData.options.split(',').map(option => option.trim()),
    };
    try {
      if (variant) {
        await updateVariant(variant._id, variantData);
        setVariants((prevVariants) =>
          prevVariants.map((v) => (v._id === variant._id ? { ...variant, ...variantData } : v))
        );
      } else {
        const newVariant = await addVariant(variantData);
        setVariants((prevVariants) => [...prevVariants, newVariant]);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{variant ? 'Edit Variant' : 'Add Variant'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" isRequired>
            <FormLabel>Variant Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter variant name"
            />
          </FormControl>
          <FormControl id="options" isRequired mt={4}>
            <FormLabel>Options</FormLabel>
            <Input
              name="options"
              value={formData.options}
              onChange={handleInputChange}
              placeholder="Enter options (comma-separated)"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {variant ? 'Update Variant' : 'Add Variant'}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VariantForm;
