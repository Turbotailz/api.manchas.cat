const express = require('express');
const multer = require('multer');
const router = express.Router();
const passport = require('../util/passport');

const { getImage, getImages, getLatestImage, getLatestImages, getRandomImage } = require('../actions');

function parsePage(page) {
  const pageInt = parseInt(page);
  return pageInt > 1 ? pageInt : 1;
}

function parseSort(sort) {
  return ['desc', 'asc'].includes(sort) ? sort : 'desc';
}

// Get random image
router.get('/', async (req, res) => {
  const image = await getRandomImage();
  image ? res.send(image) : res.sendStatus(404);
});

router.get('/auth', (req, res) => {
  if (req.user) {
    const { id, email } = req.user;
    res.send({ id, email });
  } else {
    res.sendStatus(401);
  }
});

router.post('/auth', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

// Get latest image
router.get('/latest', async (req, res) => {
  const image = await getLatestImage();
  image ? res.send(image) : res.sendStatus(404);
});

router.get('/all', async (req, res) => {
  const page = parsePage(req.query.page);
  const sort = parseSort(req.query.sort);
  const images = await getImages(page, sort);
  res.send(images);
});

// Get all images sorted by taken_at
router.get('/all/latest', async (req, res) => {
  const page = parsePage(req.query.page);
  const sort = parseSort(req.query.sort);
  const images = await getLatestImages(page, sort);
  res.send(images);
});

// Get image by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const image = await getImage(id);
  image ? res.send(image) : res.sendStatus(404);
});

router.post('/upload', (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded');
});

module.exports = router;