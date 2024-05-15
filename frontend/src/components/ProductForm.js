import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct } from '../api/productApi';
import { Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const ProductForm = ({ product, onSubmit }) => {
  const initialFormState = {
    name: '',
    brand: '',
    category: '',
    supplier: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: ''
  };

  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (product) {
      setFormState(product);
    } else {
      setFormState(initialFormState);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product._id, formState);
      } else {
        await addProduct(formState);
      }
      setFormState(initialFormState);
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Brand</FormLabel>
        <Input
          type="text"
          name="brand"
          value={formState.brand}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Input
          type="text"
          name="category"
          value={formState.category}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Supplier</FormLabel>
        <Input
          type="text"
          name="supplier"
          value={formState.supplier}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          name="price"
          value={formState.price}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Stock</FormLabel>
        <Input
          type="number"
          name="stock"
          value={formState.stock}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input
          type="text"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        {product ? 'Update' : 'Add'} Product
      </Button>
    </form>
  );
};

export default ProductForm;
