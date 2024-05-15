import axios from 'axios';

const apiUrl = 'http://localhost:5000/api';

export const getTags = async () => {
  const response = await axios.get(`${apiUrl}/tags`);
  return response.data;
};

export const addTag = async (tag) => {
  const response = await axios.post(`${apiUrl}/tags`, tag);
  return response.data;
};

export const updateTag = async (id, tag) => {
  const response = await axios.put(`${apiUrl}/tags/${id}`, tag);
  return response.data;
};

export const deleteTag = async (id) => {
  const response = await axios.delete(`${apiUrl}/tags/${id}`);
  return response.data;
};
