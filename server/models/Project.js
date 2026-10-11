const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: String,
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  type: {
    type: String,
    enum: ['Wooden Home', 'Farm House', 'Cottage', 'Prefabricated Home', 'Resort Cottage', 'Custom Structure'],
    required: [true, 'Please select a project type']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  shortDescription: {
    type: String,
    required: [true, 'Please add a short description'],
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  specifications: {
    builtUpArea: String,
    locationType: String,
    projectType: String,
    constructionType: String,
    completion: String,
    materials: [String]
  },
  images: [{
    url: String,
    alt: String,
    order: Number
  }],
  heroImage: {
    url: String,
    alt: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'upcoming'],
    default: 'completed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from name
ProjectSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
