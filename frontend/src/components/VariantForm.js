import React from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { Button, Input, FormControl, FormLabel, Box, IconButton } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const VariantForm = ({ variant, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: variant ? variant.name : '',
      options: variant ? variant.options : [''],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>Variant Name</FormLabel>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter variant name"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Options</FormLabel>
          <FieldArray
            name="options"
            render={arrayHelpers => (
              <div>
                {formik.values.options && formik.values.options.length > 0 ? (
                  formik.values.options.map((option, index) => (
                    <Box key={index} display="flex" alignItems="center" mt={2}>
                      <Input
                        name={`options.${index}`}
                        value={formik.values.options[index]}
                        onChange={formik.handleChange}
                        placeholder={`Option ${index + 1}`}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => arrayHelpers.remove(index)}
                        ml={2}
                      />
                    </Box>
                  ))
                ) : (
                  <Button onClick={() => arrayHelpers.push('')}>Add an Option</Button>
                )}
                <Button mt={4} onClick={() => arrayHelpers.push('')} leftIcon={<AddIcon />}>
                  Add Option
                </Button>
              </div>
            )}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Save
        </Button>
      </form>
    </FormikProvider>
  );
};

export default VariantForm;
