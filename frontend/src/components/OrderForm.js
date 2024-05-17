import React from 'react';
import { useFormik } from 'formik';
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
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

const OrderForm = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      orderId: '',
      customerName: '',
      totalPrice: '',
      status: '',
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required('Order ID is required'),
      customerName: Yup.string().required('Customer Name is required'),
      totalPrice: Yup.number().required('Total Price is required'),
      status: Yup.string().required('Status is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={formik.touched.orderId && formik.errors.orderId}
            >
              <FormLabel htmlFor="orderId">Order ID</FormLabel>
              <Input
                id="orderId"
                name="orderId"
                onChange={formik.handleChange}
                value={formik.values.orderId}
              />
              <FormErrorMessage>{formik.errors.orderId}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.touched.customerName && formik.errors.customerName
              }
            >
              <FormLabel htmlFor="customerName">Customer Name</FormLabel>
              <Input
                id="customerName"
                name="customerName"
                onChange={formik.handleChange}
                value={formik.values.customerName}
              />
              <FormErrorMessage>{formik.errors.customerName}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                formik.touched.totalPrice && formik.errors.totalPrice
              }
            >
              <FormLabel htmlFor="totalPrice">Total Price</FormLabel>
              <Input
                id="totalPrice"
                name="totalPrice"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.totalPrice}
              />
              <FormErrorMessage>{formik.errors.totalPrice}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.touched.status && formik.errors.status}>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Input
                id="status"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
              />
              <FormErrorMessage>{formik.errors.status}</FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Save
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderForm;
