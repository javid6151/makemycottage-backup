const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/makemycottage', {
      serverSelectionTimeoutMS: 3000
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MakeMyCottage] MongoDB connection notice: ${error.message}`);
    console.warn('[MakeMyCottage] Server will continue running. For full database persistence, ensure MongoDB is running or configure MONGODB_URI in server/.env');
  }
};

module.exports = connectDB;
