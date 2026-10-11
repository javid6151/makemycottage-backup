const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');

// In-memory fallback for local development/offline testing
const memoryEnquiries = [
  {
    _id: 'mem_1',
    name: 'Suresh Kumar',
    phone: '9848012345',
    email: 'suresh@example.com',
    location: 'Chevella, Hyderabad',
    projectType: 'Farm House',
    estimatedBudget: '50 Lakhs - 1 Crore',
    message: 'Looking to build a 3-bedroom wooden farmhouse on 2 acres of farmland.',
    status: 'New',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mem_2',
    name: 'Deepak Varma',
    phone: '9988776655',
    email: 'deepak@example.com',
    location: 'Shamshabad, Hyderabad',
    projectType: 'Wooden Home',
    estimatedBudget: '1 Crore - 2 Crores',
    message: 'Interested in a modern timber residence with open floor layout.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private
exports.getEnquiries = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const startIndex = (page - 1) * limit;
      
      let queryObj = { ...req.query };
      ['page', 'limit', 'sort'].forEach(param => delete queryObj[param]);

      const total = await Enquiry.countDocuments(queryObj);
      const enquiries = await Enquiry.find(queryObj)
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(limit);

      return res.status(200).json({ 
        success: true, 
        count: enquiries.length, 
        total,
        page,
        pages: Math.ceil(total/limit),
        data: enquiries 
      });
    }

    // In-memory fallback
    return res.status(200).json({
      success: true,
      count: memoryEnquiries.length,
      total: memoryEnquiries.length,
      page: 1,
      pages: 1,
      data: memoryEnquiries
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.create(req.body);
      return res.status(201).json({ success: true, data: enquiry });
    }

    // In-memory fallback
    const newEnquiry = {
      _id: 'mem_' + Date.now(),
      ...req.body,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    memoryEnquiries.unshift(newEnquiry);
    console.log('[MakeMyCottage] New enquiry registered:', newEnquiry.name, newEnquiry.phone, newEnquiry.location);
    return res.status(201).json({ success: true, data: newEnquiry });
  } catch (err) {
    next(err);
  }
};

// @desc    Update enquiry status/notes
// @route   PUT /api/enquiries/:id
// @access  Private
exports.updateEnquiry = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!enquiry) return res.status(404).json({ success: false, error: 'Enquiry not found' });
      return res.status(200).json({ success: true, data: enquiry });
    }

    const idx = memoryEnquiries.findIndex(e => e._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Enquiry not found' });
    memoryEnquiries[idx] = { ...memoryEnquiries[idx], ...req.body };
    return res.status(200).json({ success: true, data: memoryEnquiries[idx] });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private
exports.deleteEnquiry = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
      if (!enquiry) return res.status(404).json({ success: false, error: 'Enquiry not found' });
      return res.status(200).json({ success: true, data: {} });
    }

    const idx = memoryEnquiries.findIndex(e => e._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Enquiry not found' });
    memoryEnquiries.splice(idx, 1);
    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
