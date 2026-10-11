const express = require('express');
const {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .route('/')
  .get(getGallery)
  .post(protect, authorize('admin'), createGallery);

router
  .route('/:id')
  .put(protect, authorize('admin'), updateGallery)
  .delete(protect, authorize('admin'), deleteGallery);

// Route specifically for uploading images
router.post('/upload', protect, authorize('admin'), upload.single('image'), (req, res) => {
    if (req.file) {
        res.status(200).json({ success: true, url: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ success: false, error: 'Failed to upload image' });
    }
});

module.exports = router;
