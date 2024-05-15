import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { addCategory, updateCategory } from '../api/categoryApi';

const CategoryForm = ({
  fetchCategories,
  currentCategory,
  setCurrentCategory,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
      setDescription(currentCategory.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [currentCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCategory) {
        await updateCategory(currentCategory._id, { name, description });
      } else {
        await addCategory({ name, description });
      }
      fetchCategories();
      setCurrentCategory(null);
      setName('');
      setDescription('');
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{currentCategory ? 'Edit Category' : 'Add Category'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
              />
            </FormControl>
            <FormControl id="description" mb={3}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter category description"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              {currentCategory ? 'Update Category' : 'Add Category'}
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryForm;
