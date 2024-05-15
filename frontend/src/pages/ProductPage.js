import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { getProducts } from '../api/productApi';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box p={5}>
      <Flex justify="space-between" mb={5}>
        <Heading size="lg">Products</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
          Add Product
        </Button>
      </Flex>
      <ProductList products={products} fetchProducts={fetchProducts} />
      <ProductForm isOpen={isOpen} onClose={onClose} fetchProducts={fetchProducts} />
    </Box>
  );
};

export default ProductPage;
