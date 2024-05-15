import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/productApi';
import ProductForm from './ProductForm';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setSelectedProduct(null);
    onOpen();
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleFormSubmit = () => {
    fetchProducts();
    onClose();
  };

  return (
    <div>
      <h1>Products</h1>
      <Button onClick={handleAddClick}>Add Product</Button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Button onClick={() => handleEditClick(product)}>Edit</Button>
                <Button>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProduct ? 'Edit Product' : 'Add Product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductForm product={selectedProduct} onSubmit={handleFormSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductPage;
