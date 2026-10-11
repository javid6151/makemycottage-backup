const Gallery = require('../models/Gallery');

// @desc    Get gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGallery = async (req, res, next) => {
  try {
    let query = Gallery.find(req.query).populate('projectRef', 'name slug');
    const items = await query.sort({ order: 1, _id: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private
exports.createGallery = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private
exports.updateGallery = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private
exports.deleteGallery = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Item not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
