import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/brands`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching brands:', error);
  }
};

export const addBrand = async (brand) => {
  try {
    const response = await axios.post(`${API_URL}/brands`, brand);
    return response.data;
  } catch (error) {
    throw new Error('Error adding brand:', error);
  }
};

export const updateBrand = async (id, brand) => {
  try {
    const response = await axios.put(`${API_URL}/brands/${id}`, brand);
    return response.data;
  } catch (error) {
    throw new Error('Error updating brand:', error);
  }
};

export const deleteBrand = async (id) => {
  try {
    await axios.delete(`${API_URL}/brands/${id}`);
  } catch (error) {
    throw new Error('Error deleting brand:', error);
  }
};
