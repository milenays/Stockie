import React from 'react';
import { Box, Button, Flex, Heading, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { deleteProduct } from '../api/productApi';

const ProductList = ({ products, fetchProducts }) => {
  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Brand</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>{product.salePrice}</Td>
              <Td>{product.category}</Td>
              <Td>{product.brand}</Td>
              <Td>
                <Flex>
                  <IconButton
                    aria-label="Edit"
                    icon={<EditIcon />}
                    mr={2}
                    onClick={() => {
                      // Edit işlemi için gerekli kodlar
                    }}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(product._id)}
                  />
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProductList;
