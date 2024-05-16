import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/add`, product, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Diğer endpointler
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
