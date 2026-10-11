const Testimonial = require('../models/Testimonial');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find(req.query).sort({ order: 1, _id: -1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    next(err);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private
exports.createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
exports.updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.status(200).json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
