import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/enquiries');
      const list = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
      const sorted = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setEnquiries(sorted);
    } catch (error) {
      console.error("Failed to fetch enquiries", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}`, { status });
      fetchEnquiries(); // Refresh
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this enquiry?")) {
      try {
        await api.delete(`/enquiries/${id}`);
        fetchEnquiries();
      } catch (error) {
        alert("Failed to delete");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Qualified': return 'bg-purple-100 text-purple-800';
      case 'In Progress': return 'bg-orange-100 text-orange-800';
      case 'Converted': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statuses = ['New', 'Contacted', 'Qualified', 'In Progress', 'Converted', 'Closed'];

  if (loading) return <div className="flex justify-center mt-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B6914]"></div></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Enquiries</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Needs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map((enq) => (
                <tr key={enq._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{enq.name}</div>
                    <div className="text-sm text-gray-500">{enq.email}</div>
                    <div className="text-sm text-gray-500">{enq.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>Type: <span className="font-medium text-gray-900">{enq.projectType || 'N/A'}</span></div>
                    <div>Budget: {enq.budget || 'N/A'}</div>
                    {enq.message && <div className="mt-1 text-xs text-gray-400 truncate max-w-xs">{enq.message}</div>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={enq.status || 'New'}
                      onChange={(e) => updateStatus(enq._id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-0 cursor-pointer ${getStatusColor(enq.status || 'New')}`}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => handleDelete(enq._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No enquiries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEnquiries;
