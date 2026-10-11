import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    totalGallery: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [projectsRes, enquiriesRes, galleryRes] = await Promise.all([
        api.get('/projects').catch(() => ({ data: { data: [] } })),
        api.get('/enquiries').catch(() => ({ data: { data: [] } })),
        api.get('/gallery').catch(() => ({ data: { data: [] } }))
      ]);

      const projectsList = Array.isArray(projectsRes.data?.data) ? projectsRes.data.data : (Array.isArray(projectsRes.data) ? projectsRes.data : []);
      const enquiriesList = Array.isArray(enquiriesRes.data?.data) ? enquiriesRes.data.data : (Array.isArray(enquiriesRes.data) ? enquiriesRes.data : []);
      const galleryList = Array.isArray(galleryRes.data?.data) ? galleryRes.data.data : (Array.isArray(galleryRes.data) ? galleryRes.data : []);

      const newEnq = enquiriesList.filter(e => e.status === 'New').length;

      setStats({
        totalProjects: projectsList.length,
        totalEnquiries: enquiriesList.length,
        newEnquiries: newEnq,
        totalGallery: galleryList.length,
      });

      // Get latest 5 enquiries
      const sortedEnquiries = [...enquiriesList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentEnquiries(sortedEnquiries.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B6914]"></div></div>;
  }

  const statCards = [
    { title: 'Total Projects', value: stats.totalProjects, color: 'bg-blue-500', icon: '🏗️' },
    { title: 'Total Enquiries', value: stats.totalEnquiries, color: 'bg-green-500', icon: '✉️' },
    { title: 'New Enquiries', value: stats.newEnquiries, color: 'bg-yellow-500', icon: '🔥' },
    { title: 'Gallery Images', value: stats.totalGallery, color: 'bg-purple-500', icon: '🖼️' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="space-x-3">
          <Link to="/admin/projects" className="px-4 py-2 bg-[#1a1a1a] text-white rounded-md text-sm font-medium hover:bg-gray-800 transition">
            + Add Project
          </Link>
          <Link to="/admin/gallery" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition">
            + Add Image
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${stat.color} bg-opacity-10`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Enquiries</h3>
          <Link to="/admin/enquiries" className="text-sm text-[#8B6914] hover:underline font-medium">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500 text-sm">No recent enquiries found</td>
                </tr>
              ) : (
                recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                      <div className="text-sm text-gray-500">{enquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enquiry.projectType || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        enquiry.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {enquiry.status || 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
