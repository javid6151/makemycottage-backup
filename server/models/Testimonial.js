const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Please add a quote']
  },
  customerName: {
    type: String,
    required: [true, 'Please add customer name']
  },
  project: String,
  location: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
