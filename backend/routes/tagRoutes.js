const express = require('express');
const router = express.Router();
const Tag = require('../models/tagModel');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new tag
router.post('/', async (req, res) => {
  const tag = new Tag({
    name: req.body.name,
  });

  try {
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a tag
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    tag.name = req.body.name;

    const updatedTag = await tag.save();
    res.json(updatedTag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    await tag.remove();
    res.json({ message: 'Tag deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
