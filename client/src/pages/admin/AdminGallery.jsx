import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    category: 'Exterior',
    caption: ''
  });

  const categories = ['Exterior', 'Interior', 'Construction', 'Finished', 'Details'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await api.get('/gallery');
      const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
      setImages(list);
    } catch (error) {
      console.error("Failed to fetch gallery", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/gallery', formData);
      setIsModalOpen(false);
      setFormData({ url: '', category: 'Exterior', caption: '' });
      fetchImages();
    } catch (error) {
      alert("Failed to add image");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await api.delete(`/gallery/${id}`);
        fetchImages();
      } catch (error) {
        alert("Failed to delete image");
      }
    }
  };

  if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B6914]"></div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          + Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map(image => (
          <div key={image._id} className="bg-white rounded-lg shadow-sm overflow-hidden group relative">
            <img src={image.url} alt={image.caption} className="w-full h-48 object-cover" />
            <div className="p-3">
              <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full text-gray-600 mb-2 inline-block">{image.category}</span>
              <p className="text-sm text-gray-800 truncate">{image.caption || 'No caption'}</p>
            </div>
            <button 
              onClick={() => handleDelete(image._id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        ))}
        {images.length === 0 && <p className="col-span-full text-center text-gray-500 py-10">No gallery images found.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add Gallery Image</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="url" required value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                  {categories.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Caption (Optional)</label>
                <input type="text" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#1a1a1a] text-white rounded-md hover:bg-[#0c0c0c]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
