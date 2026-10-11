const express = require('express');
const {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin'), getEnquiries)
  .post(createEnquiry); // Public can create

router
  .route('/:id')
  .put(protect, authorize('admin'), updateEnquiry)
  .delete(protect, authorize('admin'), deleteEnquiry);

module.exports = router;
