import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { getProducts } from '../api/productApi';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
  };

  const handleSave = () => {
    fetchProducts();
  };

  return (
    <div>
      <Button onClick={handleAddProduct}>Ürün Ekle</Button>
      {selectedProduct && (
        <ProductForm product={selectedProduct} onSave={handleSave} />
      )}
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
