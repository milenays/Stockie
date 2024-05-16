import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const addCategory = async (category) => {
  const response = await axios.post(`${API_URL}/add`, category);
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await axios.put(`${API_URL}/edit/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
