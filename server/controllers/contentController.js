const SiteContent = require('../models/SiteContent');

// @desc    Get all site content
// @route   GET /api/content
// @access  Public
exports.getContent = async (req, res, next) => {
  try {
    const content = await SiteContent.find();
    // Transform to key-value object for easier frontend consumption
    const contentMap = content.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.status(200).json({ success: true, data: contentMap });
  } catch (err) {
    next(err);
  }
};

// @desc    Update site content
// @route   PUT /api/content/:key
// @access  Private
exports.updateContent = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    
    let content = await SiteContent.findOne({ key });
    
    if (!content) {
      content = await SiteContent.create({ key, value });
    } else {
      content.value = value;
      content.updatedAt = Date.now();
      await content.save();
    }
    
    res.status(200).json({ success: true, data: content });
  } catch (err) {
    next(err);
  }
};
