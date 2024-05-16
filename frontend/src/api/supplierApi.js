import axios from 'axios';

const API_URL = 'http://localhost:5000/api/suppliers';

export const getSuppliers = async () => {
  const response = await axios.get(`${API_URL}/list`);
  return response.data;
};

export const addSupplier = async (supplier) => {
  const response = await axios.post(`${API_URL}/add`, supplier);
  return response.data;
};

export const updateSupplier = async (id, supplier) => {
  const response = await axios.put(`${API_URL}/edit/${id}`, supplier);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
