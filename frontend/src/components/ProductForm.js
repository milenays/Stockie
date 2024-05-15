import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { addProduct } from '../api/productApi';

const ProductForm = ({ isOpen, onClose, fetchProducts }) => {
  const initialValues = {
    name: '',
    price: '',
    category: '',
    brand: '',
  };

  const handleSubmit = async (values, actions) => {
    await addProduct(values);
    actions.resetForm();
    onClose();
    fetchProducts();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Field as={Input} name="name" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Field as={Input} name="price" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Category</FormLabel>
                  <Field as={Input} name="category" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Brand</FormLabel>
                  <Field as={Input} name="brand" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ProductForm;
