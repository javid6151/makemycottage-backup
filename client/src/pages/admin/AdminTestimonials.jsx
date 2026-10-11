import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    quote: '',
    project: '',
    location: '',
    rating: 5
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get('/testimonials');
      const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
      setTestimonials(list);
    } catch (error) {
      console.error("Failed to fetch testimonials", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (testimonial = null) => {
    if (testimonial) {
      setEditingId(testimonial._id);
      setFormData({
        customerName: testimonial.customerName || '',
        quote: testimonial.quote || '',
        project: testimonial.project || '',
        location: testimonial.location || '',
        rating: testimonial.rating || 5
      });
    } else {
      setEditingId(null);
      setFormData({ customerName: '', quote: '', project: '', location: '', rating: 5 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, formData);
      } else {
        await api.post('/testimonials', formData);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (error) {
      alert("Failed to save testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B6914]"></div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Testimonials</h1>
        <button onClick={() => openModal()} className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          + Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.customerName}</div>
                  <div className="text-sm text-gray-500">{item.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 line-clamp-2 max-w-md">{item.quote}</div>
                  <div className="text-xs text-gray-500 mt-1">Project: {item.project}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">
                  {'★'.repeat(item.rating)}{'☆'.repeat(5-item.rating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openModal(item)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Testimonial</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                <input type="text" required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project</label>
                  <input type="text" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quote</label>
                <textarea required rows="4" value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
                <input type="number" min="1" max="5" required value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
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

export default AdminTestimonials;
