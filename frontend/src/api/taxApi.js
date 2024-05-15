import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

export const getTaxes = async () => {
  const response = await axios.get(`${apiUrl}/taxes`);
  return response.data;
};

export const addTax = async (tax) => {
  const response = await axios.post(`${apiUrl}/taxes`, tax);
  return response.data;
};

export const updateTax = async (id, tax) => {
  const response = await axios.put(`${apiUrl}/taxes/${id}`, tax);
  return response.data;
};

export const deleteTax = async (id) => {
  const response = await axios.delete(`${apiUrl}/taxes/${id}`);
  return response.data;
};
