const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  image: {
    url: {
      type: String,
      required: [true, 'Please add an image URL']
    },
    alt: String
  },
  category: {
    type: String,
    enum: ['Homes', 'Cottages', 'Interiors', 'Construction', 'Details', 'Outdoor', 'Completed Projects'],
    required: [true, 'Please select a category']
  },
  caption: String,
  projectRef: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  order: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Gallery', GallerySchema);
