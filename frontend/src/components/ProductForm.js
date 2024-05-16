import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct } from '../api/productApi';
import { Button, Input, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { getBrands, addBrand } from '../api/brandApi';
import { getCategories, addCategory } from '../api/categoryApi';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

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
    criticalStock: '',
    uniqueId: uuidv4(),
  };

  const [formState, setFormState] = useState(initialFormState);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormState(product);
    } else {
      setFormState(initialFormState);
    }
  }, [product]);

  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const brandsData = await getBrands();
        const categoriesData = await getCategories();
        setBrands(brandsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching brands or categories:', error);
      }
    };
    fetchBrandsAndCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleBarcodeGenerate = () => {
    const randomBarcode = '84' + Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
    setFormState({ ...formState, barcode: randomBarcode });
  };

  const handleBrandAdd = async () => {
    const newBrand = prompt('Enter new brand');
    if (newBrand) {
      try {
        const addedBrand = await addBrand({ name: newBrand });
        setBrands([...brands, addedBrand]);
        setFormState({ ...formState, brand: addedBrand.name });
      } catch (error) {
        console.error('Error adding brand:', error);
      }
    }
  };

  const handleCategoryAdd = async () => {
    const newCategory = prompt('Enter new category');
    if (newCategory) {
      try {
        const addedCategory = await addCategory({ name: newCategory });
        setCategories([...categories, addedCategory]);
        setFormState({ ...formState, category: addedCategory.name });
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
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
        <Button onClick={handleBarcodeGenerate}>Generate Barcode</Button>
      </FormControl>
      <FormControl>
        <FormLabel>Brand</FormLabel>
        <Select
          name="brand"
          value={formState.brand}
          onChange={handleChange}
          required
        >
          <option value="">Select a brand</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand.name}>{brand.name}</option>
          ))}
        </Select>
        <Button onClick={handleBrandAdd}>+ Add Brand</Button>
      </FormControl>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          name="category"
          value={formState.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </Select>
        <Button onClick={handleCategoryAdd}>+ Add Category</Button>
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
        <ReactQuill
          value={formState.description}
          onChange={(value) => setFormState({ ...formState, description: value })}
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
