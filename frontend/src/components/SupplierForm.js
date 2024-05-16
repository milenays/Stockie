import React from 'react';
import { useFormik } from 'formik';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const SupplierForm = ({ supplier, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: supplier ? supplier.name : '',
      email: supplier ? supplier.email : '',
      phone: supplier ? supplier.phone : '',
      address: supplier ? supplier.address : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>Supplier Name</FormLabel>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter supplier name"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter supplier email"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Phone</FormLabel>
        <Input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Enter supplier phone"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Address</FormLabel>
        <Input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          placeholder="Enter supplier address"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" mt={4}>
        Save
      </Button>
    </form>
  );
};

export default SupplierForm;
