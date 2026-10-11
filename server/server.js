const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Set security headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

// Apply rate limits
app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);

// Make uploads folder static
app.use('/uploads', express.static('uploads'));

// Route files
const auth = require('./routes/auth');
const projects = require('./routes/projects');
const services = require('./routes/services');
const gallery = require('./routes/gallery');
const testimonials = require('./routes/testimonials');
const enquiries = require('./routes/enquiries');
const content = require('./routes/content');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/projects', projects);
app.use('/api/services', services);
app.use('/api/gallery', gallery);
app.use('/api/testimonials', testimonials);
app.use('/api/enquiries', enquiries);
app.use('/api/content', content);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
