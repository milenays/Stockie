const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// Kategori Ekleme
router.post('/add', async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kategori Listeleme
router.get('/list', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kategori Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kategori Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
