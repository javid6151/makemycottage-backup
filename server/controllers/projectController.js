const mongoose = require('mongoose');
const Project = require('../models/Project');

const sampleProjects = [
  {
    _id: 'proj_1',
    name: 'Woodland Retreat',
    slug: 'woodland-retreat',
    location: 'Shamshabad, Hyderabad',
    type: 'Wooden Home',
    shortDescription: 'Contemporary bespoke timber home surrounded by lush nature.',
    description: 'A contemporary wooden home nestled among mature trees, designed to seamlessly blend indoor and outdoor living. Features floor-to-ceiling glass and natural timber framing.',
    specifications: {
      builtUpArea: '2,400 sq.ft',
      locationType: 'Suburban',
      projectType: 'Residential',
      constructionType: 'Timber Frame',
      completion: '2024',
      materials: 'Teak, Pine, Natural Stone'
    },
    heroImage: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1920&q=80',
    featured: true,
    order: 1,
    status: 'completed'
  },
  {
    _id: 'proj_2',
    name: 'Heritage Farmstead',
    slug: 'heritage-farmstead',
    location: 'Chevella, Hyderabad',
    type: 'Farm House',
    shortDescription: 'Spacious countryside farmhouse celebrating rustic timber joinery.',
    description: 'A spacious farmhouse that celebrates traditional Indian craftsmanship with modern comforts.',
    specifications: {
      builtUpArea: '3,800 sq.ft',
      locationType: 'Rural',
      projectType: 'Farmhouse',
      constructionType: 'Post & Beam',
      completion: '2024',
      materials: 'Sal Wood, Granite, Bamboo'
    },
    heroImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=80',
    featured: true,
    order: 2,
    status: 'completed'
  },
  {
    _id: 'proj_3',
    name: 'Pine Valley Cottage',
    slug: 'pine-valley-cottage',
    location: 'Ananthagiri Hills',
    type: 'Cottage',
    shortDescription: 'Intimate hilltop cabin featuring exposed cedar beams and valley views.',
    description: 'A charming hilltop cottage surrounded by pine forests, designed as a peaceful weekend escape.',
    specifications: {
      builtUpArea: '1,200 sq.ft',
      locationType: 'Hill Station',
      projectType: 'Weekend Retreat',
      constructionType: 'Log Cabin',
      completion: '2023',
      materials: 'Pine, Cedar, River Stone'
    },
    heroImage: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&q=80',
    featured: true,
    order: 3,
    status: 'completed'
  }
];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let query;
      const reqQuery = { ...req.query };
      const removeFields = ['select', 'sort', 'page', 'limit'];
      removeFields.forEach(param => delete reqQuery[param]);
      
      query = Project.find(reqQuery);

      if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
      }
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      } else {
        query = query.sort({ order: 1, createdAt: -1 });
      }

      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = await Project.countDocuments(reqQuery);

      query = query.skip(startIndex).limit(limit);

      const projects = await query;
      const pagination = {};
      if (endIndex < total) {
        pagination.next = { page: page + 1, limit };
      }
      if (startIndex > 0) {
        pagination.prev = { page: page - 1, limit };
      }

      return res.status(200).json({ success: true, count: projects.length, pagination, data: projects });
    }

    return res.status(200).json({ success: true, count: sampleProjects.length, data: sampleProjects });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    }

    const project = sampleProjects.find(p => p._id === req.params.id || p.slug === req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    return res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.create(req.body);
      return res.status(201).json({ success: true, data: project });
    }

    const newProject = {
      _id: 'proj_' + Date.now(),
      ...req.body,
      createdAt: new Date()
    };
    sampleProjects.unshift(newProject);
    return res.status(201).json({ success: true, data: newProject });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    }

    const idx = sampleProjects.findIndex(p => p._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Project not found' });
    sampleProjects[idx] = { ...sampleProjects[idx], ...req.body };
    return res.status(200).json({ success: true, data: sampleProjects[idx] });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      return res.status(200).json({ success: true, data: {} });
    }

    const idx = sampleProjects.findIndex(p => p._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Project not found' });
    sampleProjects.splice(idx, 1);
    return res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
