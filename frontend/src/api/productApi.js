import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Ürünleri listeleme
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Ürün ekleme
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/add`, product);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Ürün güncelleme
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/edit/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Ürün silme
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
