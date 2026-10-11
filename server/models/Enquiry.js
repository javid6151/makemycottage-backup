const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  location: String,
  projectType: String,
  estimatedBudget: String,
  message: String,
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'In Progress', 'Converted', 'Closed'],
    default: 'New'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
