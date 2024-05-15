import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

export const getProducts = async () => {
  const response = await axios.get(`${apiUrl}/products`);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(`${apiUrl}/products`, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${apiUrl}/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${apiUrl}/products/${id}`);
  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${apiUrl}/brands`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${apiUrl}/categories`);
  return response.data;
};
