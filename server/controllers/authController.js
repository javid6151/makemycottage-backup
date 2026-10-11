const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { id: user._id, role: user.role || 'admin', name: user.name || 'Admin' }, 
    process.env.JWT_SECRET || 'makemycottage_jwt_secret_key_2024_premium', 
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name || 'Admin',
      email: user.email,
      role: user.role || 'admin'
    }
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    if (mongoose.connection.readyState === 1) {
      // Check for user in MongoDB
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      // Check if password matches
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      return sendTokenResponse(user, 200, res);
    }

    // Standalone fallback: Built-in Admin credentials
    if (email === 'admin@makemycottage.com' && password === 'Admin@123') {
      const fallbackUser = {
        _id: 'admin_1',
        name: 'MMC Administrator',
        email: 'admin@makemycottage.com',
        role: 'admin'
      };
      return sendTokenResponse(fallbackUser, 200, res);
    }

    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/verify
// @access  Private
exports.verify = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user.id);
      return res.status(200).json({
        success: true,
        data: user
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: req.user.id || 'admin_1',
        name: req.user.name || 'Admin',
        role: 'admin'
      }
    });
  } catch (err) {
    next(err);
  }
};
