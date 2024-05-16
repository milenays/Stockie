import axios from 'axios';

const API_URL = 'http://localhost:5000/api/brands';

export const getBrands = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const addBrand = async (brand) => {
  const response = await axios.post(`${API_URL}/add`, brand);
  return response.data;
};

export const updateBrand = async (id, brand) => {
  const response = await axios.put(`${API_URL}/edit/${id}`, brand);
  return response.data;
};

export const deleteBrand = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
