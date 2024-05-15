import axios from 'axios';

const API_URL = 'http://localhost:5000/api/suppliers';

export const getSuppliers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};

export const addSupplier = async (supplier) => {
  try {
    const response = await axios.post(API_URL, supplier);
    return response.data;
  } catch (error) {
    console.error('Error adding supplier:', error);
    throw error;
  }
};

export const updateSupplier = async (id, supplier) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, supplier);
    return response.data;
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting supplier:', error);
    throw error;
  }
};
