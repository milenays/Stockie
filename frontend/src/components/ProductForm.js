import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { addProduct } from '../api/productApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({ isOpen, onClose, fetchProducts }) => {
  const [description, setDescription] = useState('');

  const initialValues = {
    name: '',
    sku: '',
    barcode: '',
    brand: '',
    category: '',
    weight: '',
    marketPrice: '',
    purchasePrice: '',
    salePrice: '',
    stock: '',
    fakeStock: '',
    criticalStock: '',
    images: '',
  };

  const handleSubmit = async (values, actions) => {
    const productData = { ...values, description };
    try {
      await addProduct(productData);
      actions.resetForm();
      onClose();
      fetchProducts();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Product</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <ModalBody>
                <FormControl>
                  <FormLabel>Name (0/100)</FormLabel>
                  <Field as={Input} name="name" maxLength={100} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>SKU</FormLabel>
                  <Field as={Input} name="sku" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Barcode</FormLabel>
                  <Field as={Input} name="barcode" />
                  <Button
                    mt={2}
                    onClick={() =>
                      setFieldValue('barcode', `84${Math.floor(Math.random() * 1e12).toString().padStart(12, '0')}`)
                    }
                  >
                    Generate Barcode
                  </Button>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Brand</FormLabel>
                  <Field as={Input} name="brand" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Category</FormLabel>
                  <Field as={Input} name="category" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Weight</FormLabel>
                  <Field as={Input} name="weight" type="number" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <ReactQuill value={description} onChange={setDescription} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Market Price</FormLabel>
                  <Field as={Input} name="marketPrice" type="number" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Purchase Price</FormLabel>
                  <Field as={Input} name="purchasePrice" type="number" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Sale Price</FormLabel>
                  <Field as={Input} name="salePrice" type="number" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Stock</FormLabel>
                  <Field as={Input} name="stock" type="number" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Fake Stock</FormLabel>
                  <Field as={Input} name="fakeStock" type="number" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Critical Stock</FormLabel>
                  <Field as={Input} name="criticalStock" type="number" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Images</FormLabel>
                  <Field as={Input} name="images" type="file" multiple />
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
