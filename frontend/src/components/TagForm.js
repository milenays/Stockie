import React from 'react';
import { useFormik } from 'formik';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const TagForm = ({ tag, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: tag ? tag.name : '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel>Tag Name</FormLabel>
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter tag name"
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" mt={4}>
        Save
      </Button>
    </form>
  );
};

export default TagForm;
