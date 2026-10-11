import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Cottage',
    shortDescription: '',
    description: '',
    specifications: {
      area: '', locationType: '', projectType: '', constructionType: '', completion: '', materials: ''
    },
    featured: false,
    heroImage: '',
    imageUrls: ['']
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
      setProjects(list);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name || '',
        location: project.location || '',
        type: project.type || 'Cottage',
        shortDescription: project.shortDescription || '',
        description: project.description || '',
        specifications: project.specifications || { area: '', locationType: '', projectType: '', constructionType: '', completion: '', materials: '' },
        featured: project.featured || false,
        heroImage: project.heroImage || '',
        imageUrls: project.imageUrls?.length ? project.imageUrls : ['']
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '', location: '', type: 'Cottage', shortDescription: '', description: '',
        specifications: { area: '', locationType: '', projectType: '', constructionType: '', completion: '', materials: '' },
        featured: false, heroImage: '', imageUrls: ['']
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, formData);
      } else {
        await api.post('/projects', formData);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        alert("Failed to delete project");
      }
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...formData.imageUrls];
    newUrls[index] = value;
    setFormData({ ...formData, imageUrls: newUrls });
  };

  const addImageUrl = () => setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
  
  const removeImageUrl = (index) => {
    const newUrls = formData.imageUrls.filter((_, i) => i !== index);
    setFormData({ ...formData, imageUrls: newUrls.length ? newUrls : [''] });
  };

  if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B6914]"></div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Projects</h1>
        <button onClick={() => openModal()} className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          + Add Project
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map(project => (
              <tr key={project._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center">
                  <img src={project.heroImage || 'https://via.placeholder.com/50'} alt="" className="h-10 w-10 rounded object-cover mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{project.location}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{project.type}</td>
                <td className="px-6 py-4">
                  {project.featured ? <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Yes</span> : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">No</span>}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                  <button onClick={() => openModal(project)} className="text-blue-600 hover:text-blue-900">Edit</button>
                  <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option>Cottage</option>
                    <option>Villa</option>
                    <option>Resort</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="h-4 w-4 text-[#8B6914] focus:ring-[#8B6914] border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-900">Featured Project</label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Hero Image URL</label>
                  <input type="url" required value={formData.heroImage} onChange={e => setFormData({...formData, heroImage: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Short Description</label>
                  <textarea rows="2" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['area', 'locationType', 'projectType', 'constructionType', 'completion', 'materials'].map(spec => (
                    <div key={spec}>
                      <label className="block text-xs text-gray-600 capitalize">{spec.replace(/([A-Z])/g, ' $1').trim()}</label>
                      <input type="text" value={formData.specifications[spec]} onChange={e => setFormData({...formData, specifications: {...formData.specifications, [spec]: e.target.value}})} className="mt-1 block w-full border border-gray-300 rounded-md p-1.5 text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Gallery Images URLs</h3>
                  <button type="button" onClick={addImageUrl} className="text-sm text-blue-600">+ Add</button>
                </div>
                {formData.imageUrls.map((url, i) => (
                  <div key={i} className="flex mb-2">
                    <input type="url" value={url} onChange={e => handleImageUrlChange(i, e.target.value)} className="flex-1 border border-gray-300 rounded-md p-2" placeholder="Image URL" />
                    <button type="button" onClick={() => removeImageUrl(i)} className="ml-2 text-red-500 px-2">X</button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#1a1a1a] text-white rounded-md hover:bg-[#0c0c0c]">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
