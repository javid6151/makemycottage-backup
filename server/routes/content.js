const express = require('express');
const {
  getContent,
  updateContent
} = require('../controllers/contentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getContent);

router
  .route('/:key')
  .put(protect, authorize('admin'), updateContent);

module.exports = router;
