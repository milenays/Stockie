import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

// Kategorileri listeleme
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Kategori ekleme
export const addCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/add`, category);
    return response.data;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

// Kategori güncelleme
export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${API_URL}/edit/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Kategori silme
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
