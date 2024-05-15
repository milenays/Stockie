import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { getCategories, deleteCategory } from '../api/categoryApi';
import CategoryForm from './CategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    onOpen();
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    onOpen();
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Category List</Heading>
      <Button onClick={handleAdd} colorScheme="teal" mb={5}>
        Add Category
      </Button>
      <CategoryForm
        fetchCategories={fetchCategories}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Table variant="simple" mt={5}>
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
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={() => handleEdit(category)}
                  mr={2}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CategoryList;
