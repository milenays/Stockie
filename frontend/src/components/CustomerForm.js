import React from 'react';
import { useFormik } from 'formik';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const CustomerForm = ({ customer, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: customer ? customer.name : '',
      email: customer ? customer.email : '',
      phone: customer ? customer.phone : '',
      address: customer ? customer.address : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>Customer Name</FormLabel>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter customer name"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter customer email"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Phone</FormLabel>
        <Input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Enter customer phone"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Address</FormLabel>
        <Input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          placeholder="Enter customer address"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" mt={4}>
        Save
      </Button>
    </form>
  );
};

export default CustomerForm;
