import React, { useState, useEffect } from 'react';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../api/categoryApi';
import CategoryForm from '../components/CategoryForm';
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    onOpen();
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  const handleSubmit = async (values) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory._id, values);
    } else {
      await addCategory(values);
    }
    fetchCategories();
    onClose();
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="teal" mb={4}>Add Category</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category._id}>
              <Td>{category.name}</Td>
              <Td>{category.description}</Td>
              <Td>
                <Button colorScheme="teal" onClick={() => handleEdit(category)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(category._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCategory ? 'Edit Category' : 'Add Category'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CategoryForm category={selectedCategory} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
