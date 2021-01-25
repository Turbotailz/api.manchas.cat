const express = require('express');
const router = express.Router();

const { getImage } = require('../actions');

// Get random image
router.get('/', async (req, res) => {
  const image = await getImage();
  res.send(image);
});

// Get image by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const image = await getImage(id);
  res.send(image);
});

module.exports = router;