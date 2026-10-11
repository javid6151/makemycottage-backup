const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' }); // Load env variables

const User = require('../models/User');
const Project = require('../models/Project');
const Service = require('../models/Service');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');
const SiteContent = require('../models/SiteContent');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/makemycottage');

const seedData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();
    await Service.deleteMany();
    await Gallery.deleteMany();
    await Testimonial.deleteMany();
    await SiteContent.deleteMany();

    console.log('Data cleared...');

    // Users
    await User.create({
      name: 'Admin',
      email: 'admin@makemycottage.com',
      password: 'Admin@123',
      role: 'admin'
    });

    // Projects
    const projects = await Project.insertMany([
      {
        name: 'Woodland Retreat',
        location: 'Shamshabad, Hyderabad',
        type: 'Wooden Home',
        description: 'A luxurious wooden home nestled in nature, providing a serene environment away from the city hustle.',
        shortDescription: 'Luxurious wooden home in Shamshabad.',
        specifications: { builtUpArea: '2500 sq ft', locationType: 'Suburban', projectType: 'Residential', constructionType: 'Wood Frame', completion: '2023', materials: ['Teak Wood', 'Pine', 'Glass'] },
        status: 'completed',
        featured: true,
        order: 1
      },
      {
        name: 'Heritage Farmstead',
        location: 'Chevella, Hyderabad',
        type: 'Farm House',
        description: 'Spacious farm house combining modern amenities with traditional wooden architecture.',
        shortDescription: 'Modern farm house in Chevella.',
        specifications: { builtUpArea: '4000 sq ft', locationType: 'Rural', projectType: 'Farm House', constructionType: 'Hybrid', completion: '2022', materials: ['Wood', 'Stone'] },
        status: 'completed',
        featured: true,
        order: 2
      },
      {
        name: 'Pine Valley Cottage',
        location: 'Ananthagiri Hills',
        type: 'Cottage',
        description: 'Cozy cottage surrounded by pine trees, perfect for weekend getaways.',
        shortDescription: 'Cozy weekend cottage in Ananthagiri.',
        specifications: { builtUpArea: '1200 sq ft', locationType: 'Hill Station', projectType: 'Weekend Home', constructionType: 'Log Cabin', completion: '2024', materials: ['Pine Wood', 'Slate'] },
        status: 'in-progress',
        featured: false,
        order: 3
      },
      {
        name: 'Cedar View Residence',
        location: 'Shamirpet, Hyderabad',
        type: 'Wooden Home',
        description: 'Elegant two-story wooden residence with lake views and expansive decking.',
        shortDescription: 'Two-story wooden home near Shamirpet lake.',
        specifications: { builtUpArea: '3200 sq ft', locationType: 'Suburban', projectType: 'Residential', constructionType: 'Wood Frame', completion: '2023', materials: ['Cedar', 'Glass'] },
        status: 'completed',
        featured: true,
        order: 4
      },
      {
        name: 'Bamboo Grove Resort',
        location: 'Nagarjuna Sagar',
        type: 'Resort Cottage',
        description: 'Eco-friendly resort cottages made predominantly from treated bamboo and wood.',
        shortDescription: 'Eco-friendly resort cottages.',
        specifications: { builtUpArea: '800 sq ft per unit', locationType: 'Riverside', projectType: 'Commercial', constructionType: 'Bamboo & Wood', completion: '2022', materials: ['Bamboo', 'Teak'] },
        status: 'completed',
        featured: false,
        order: 5
      },
      {
        name: 'Oak Haven',
        location: 'Vikarabad, Hyderabad',
        type: 'Prefabricated Home',
        description: 'Quick-assembly prefabricated home offering modern living with minimal environmental impact.',
        shortDescription: 'Modern prefabricated home in Vikarabad.',
        specifications: { builtUpArea: '1800 sq ft', locationType: 'Suburban', projectType: 'Residential', constructionType: 'Prefab Wood', completion: '2024', materials: ['Oak', 'Steel'] },
        status: 'upcoming',
        featured: false,
        order: 6
      }
    ]);

    // Services
    await Service.insertMany([
      { name: 'Wooden Homes', description: 'Custom designed wooden homes built for durability and aesthetics.', image: '/uploads/wooden-home.jpg', order: 1 },
      { name: 'Farm Houses', description: 'Spacious farm houses that blend naturally with the surrounding landscape.', image: '/uploads/farmhouse.jpg', order: 2 },
      { name: 'Cottage Homes', description: 'Cozy and comfortable cottage homes perfect for vacations or retreats.', image: '/uploads/cottage.jpg', order: 3 },
      { name: 'Prefabricated Homes', description: 'High-quality prefab homes assembled quickly on your site.', image: '/uploads/prefab.jpg', order: 4 },
      { name: 'Resort Cottages', description: 'Commercial resort cottages designed for luxury and comfort.', image: '/uploads/resort.jpg', order: 5 },
      { name: 'Custom Structures', description: 'Gazebos, pergolas, and other custom wooden structures.', image: '/uploads/custom.jpg', order: 6 }
    ]);

    // Gallery
    const galleryItems = [
      { category: 'Homes', image: { url: '/uploads/g1.jpg', alt: 'Wooden home exterior' } },
      { category: 'Interiors', image: { url: '/uploads/g2.jpg', alt: 'Wooden interior' } },
      { category: 'Cottages', image: { url: '/uploads/g3.jpg', alt: 'Cottage in woods' } },
      { category: 'Details', image: { url: '/uploads/g4.jpg', alt: 'Wood texture' } },
      { category: 'Completed Projects', image: { url: '/uploads/g5.jpg', alt: 'Completed home' } },
      { category: 'Outdoor', image: { url: '/uploads/g6.jpg', alt: 'Deck and patio' } },
      { category: 'Construction', image: { url: '/uploads/g7.jpg', alt: 'Under construction' } },
      { category: 'Homes', image: { url: '/uploads/g8.jpg', alt: 'Modern wooden house' } }
    ];
    // Assign project refs
    galleryItems.forEach((item, index) => {
        if(index < projects.length) item.projectRef = projects[index]._id;
    });
    await Gallery.insertMany(galleryItems);

    // Testimonials
    await Testimonial.insertMany([
      { quote: 'MakeMyCottage built our dream farmhouse perfectly.', customerName: 'Rajesh K', location: 'Hyderabad', project: 'Heritage Farmstead' },
      { quote: 'The attention to detail in our wooden home is phenomenal.', customerName: 'Sunita M', location: 'Shamshabad' },
      { quote: 'Eco-friendly and delivered on time.', customerName: 'Vikram S', location: 'Vikarabad' },
      { quote: 'Best investment we made for our weekend getaway.', customerName: 'Anita R', location: 'Ananthagiri' }
    ]);

    // Site Content
    await SiteContent.insertMany([
      { key: 'contact_info', value: { phone: '+91 9876543210', email: 'info@makemycottage.com', address: 'Banjara Hills, Hyderabad' } },
      { key: 'social_links', value: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' } },
      { key: 'homepage_text', value: { title: 'Crafting Your Dream Wooden Spaces', subtitle: 'Sustainable, beautiful, and built to last.' } }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
