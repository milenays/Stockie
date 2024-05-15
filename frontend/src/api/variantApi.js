import axios from 'axios';

const API_URL = 'http://localhost:5000/api/variants';

export const getVariants = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching variants:', error);
    throw error;
  }
};

export const addVariant = async (variant) => {
  try {
    const response = await axios.post(API_URL, variant);
    return response.data;
  } catch (error) {
    console.error('Error adding variant:', error);
    throw error;
  }
};

export const updateVariant = async (id, variant) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, variant);
    return response.data;
  } catch (error) {
    console.error('Error updating variant:', error);
    throw error;
  }
};

export const deleteVariant = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting variant:', error);
    throw error;
  }
};
