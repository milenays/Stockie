import React, { useState, useEffect } from 'react';
import { useFormik, Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
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
  Select,
  NumberInput,
  NumberInputField,
  Box,
} from '@chakra-ui/react';
import { addOrder, updateOrder, getProducts } from '../api/orderApi';

const OrderForm = ({ isOpen, onClose, onSave, order }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts();
      setProducts(result.data);
    };

    fetchProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      orderId: order?.orderId || '',
      cargo: order?.cargo || '',
      cargoNumber: order?.cargoNumber || '',
      customerName: order?.customerName || '',
      customerAddress: order?.customerAddress || '',
      customerPhone: order?.customerPhone || '',
      customerEmail: order?.customerEmail || '',
      orderProducts: order?.orderProducts || [],
      totalPrice: order?.totalPrice || 0,
      status: order?.status || 'Pending',
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required('Order ID is required'),
      cargo: Yup.string().required('Cargo is required'),
      cargoNumber: Yup.string().required('Cargo Number is required'),
      customerName: Yup.string().required('Customer Name is required'),
      customerAddress: Yup.string().required('Customer Address is required'),
      customerPhone: Yup.string().required('Customer Phone is required'),
      customerEmail: Yup.string().required('Customer Email is required'),
      orderProducts: Yup.array().of(
        Yup.object({
          productId: Yup.string().required('Product is required'),
          quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
          price: Yup.number().min(0, 'Price must be at least 0').required('Price is required'),
        })
      ).required('Order Products are required'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: (values) => {
      onSave(values);
    },
  });

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = formik.values.orderProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      formik.setFieldValue('totalPrice', total);
    };

    calculateTotalPrice();
  }, [formik.values.orderProducts]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? 'Edit Order' : 'Add Order'}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
          onSubmit={formik.handleSubmit}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <Form>
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Order ID</FormLabel>
                  <Input
                    id="orderId"
                    name="orderId"
                    onChange={handleChange}
                    value={values.orderId}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Cargo</FormLabel>
                  <Input
                    id="cargo"
                    name="cargo"
                    onChange={handleChange}
                    value={values.cargo}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Cargo Number</FormLabel>
                  <Input
                    id="cargoNumber"
                    name="cargoNumber"
                    onChange={handleChange}
                    value={values.cargoNumber}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    id="customerName"
                    name="customerName"
                    onChange={handleChange}
                    value={values.customerName}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Customer Address</FormLabel>
                  <Input
                    id="customerAddress"
                    name="customerAddress"
                    onChange={handleChange}
                    value={values.customerAddress}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Customer Phone</FormLabel>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    onChange={handleChange}
                    value={values.customerPhone}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Customer Email</FormLabel>
                  <Input
                    id="customerEmail"
                    name="customerEmail"
                    onChange={handleChange}
                    value={values.customerEmail}
                  />
                </FormControl>
                <FieldArray
                  name="orderProducts"
                  render={arrayHelpers => (
                    <div>
                      {values.orderProducts.map((product, index) => (
                        <Box key={index} display="flex" alignItems="center" mb={2}>
                          <FormControl isRequired>
                            <FormLabel>Product</FormLabel>
                            <Select
                              id={`orderProducts.${index}.productId`}
                              name={`orderProducts.${index}.productId`}
                              onChange={handleChange}
                              value={product.productId}
                            >
                              {products.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Quantity</FormLabel>
                            <NumberInput
                              min={1}
                              id={`orderProducts.${index}.quantity`}
                              name={`orderProducts.${index}.quantity`}
                              onChange={(valueString) => setFieldValue(`orderProducts.${index}.quantity`, parseInt(valueString))}
                              value={product.quantity}
                              maxW="100px"
                              mr="2"
                            >
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Price</FormLabel>
                            <NumberInput
                              min={0}
                              id={`orderProducts.${index}.price`}
                              name={`orderProducts.${index}.price`}
                              onChange={(valueString) => setFieldValue(`orderProducts.${index}.price`, parseFloat(valueString))}
                              value={product.price}
                              maxW="100px"
                              mr="2"
                            >
                              <NumberInputField />
                            </NumberInput>
                          </FormControl>
                          <Button type="button" onClick={() => arrayHelpers.remove(index)}>Remove</Button>
                        </Box>
                      ))}
                      <Button type="button" onClick={() => arrayHelpers.push({ productId: '', quantity: 1, price: 0 })}>
                        Add Product
                      </Button>
                    </div>
                  )}
                />
                <FormControl isRequired>
                  <FormLabel>Total Price</FormLabel>
                  <Input
                    id="totalPrice"
                    name="totalPrice"
                    value={values.totalPrice}
                    isReadOnly
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select
                    id="status"
                    name="status"
                    onChange={handleChange}
                    value={values.status}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" type="submit">
                  {order ? 'Update Order' : 'Add Order'}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default OrderForm;
