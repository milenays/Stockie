import React from 'react';
import { useFormik } from 'formik';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const CategoryForm = ({ category, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: category ? category.name : '',
      description: category ? category.description : ''
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>Category Name</FormLabel>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter category name"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Input
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Enter category description"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" mt={4}>
        Save
      </Button>
    </form>
  );
};

export default CategoryForm;
