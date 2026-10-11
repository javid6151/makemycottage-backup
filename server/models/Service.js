const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  icon: String,
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Service', ServiceSchema);
