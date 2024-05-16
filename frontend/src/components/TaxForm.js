import React from 'react';
import { useFormik } from 'formik';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const TaxForm = ({ tax, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: tax ? tax.name : '',
      rate: tax ? tax.rate : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>Tax Name</FormLabel>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter tax name"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Rate</FormLabel>
        <Input
          name="rate"
          type="number"
          value={formik.values.rate}
          onChange={formik.handleChange}
          placeholder="Enter tax rate"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" mt={4}>
        Save
      </Button>
    </form>
  );
};

export default TaxForm;
