import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct } from '../api/productApi';
import { Button, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const ProductForm = ({ product, onSubmit }) => {
  const initialFormState = {
    name: '',
    stockCode: '',
    barcode: '',
    brand: '',
    category: '',
    weight: '',
    description: '',
    images: [],
    marketPrice: '',
    salePrice: '',
    purchasePrice: '',
    stock: '',
    fakeStock: '',
    criticalStock: ''
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
        await addProduct({ ...formState, uniqueId: uuidv4() });
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
        <FormLabel>Product Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          maxLength={100}
          required
        />
        <div>{formState.name.length}/100</div>
      </FormControl>
      <FormControl>
        <FormLabel>Stock Code</FormLabel>
        <Input
          type="text"
          name="stockCode"
          value={formState.stockCode}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Barcode</FormLabel>
        <Input
          type="text"
          name="barcode"
          value={formState.barcode}
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
        <FormLabel>Weight</FormLabel>
        <Input
          type="number"
          name="weight"
          value={formState.weight}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Market Price</FormLabel>
        <Input
          type="number"
          name="marketPrice"
          value={formState.marketPrice}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Sale Price</FormLabel>
        <Input
          type="number"
          name="salePrice"
          value={formState.salePrice}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Purchase Price</FormLabel>
        <Input
          type="number"
          name="purchasePrice"
          value={formState.purchasePrice}
          onChange={handleChange}
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
        <FormLabel>Fake Stock</FormLabel>
        <Input
          type="number"
          name="fakeStock"
          value={formState.fakeStock}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Critical Stock</FormLabel>
        <Input
          type="number"
          name="criticalStock"
          value={formState.criticalStock}
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
