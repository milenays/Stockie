const express = require('express');
const router = express.Router();
const Tag = require('../models/tagModel');

// Etiket Ekleme
router.post('/add', async (req, res) => {
  const { name } = req.body;

  try {
    const newTag = new Tag({ name });
    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Etiket Listeleme
router.get('/list', async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.json(tags);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Etiket Düzenleme
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    res.json(updatedTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Etiket Silme
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Tag.findByIdAndDelete(id);
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
