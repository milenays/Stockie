import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addOrder = async (order) => {
  const response = await axios.post(API_URL, order);
  return response.data;
};

export const updateOrder = async (id, order) => {
  const response = await axios.put(`${API_URL}/${id}`, order);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getOrder = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get('http://localhost:5000/api/products');
  return response.data;
};
