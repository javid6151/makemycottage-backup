import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const adminName = localStorage.getItem('adminName') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Projects', path: '/admin/projects', icon: '🏗️' },
    { name: 'Services', path: '/admin/services', icon: '🛠️' },
    { name: 'Gallery', path: '/admin/gallery', icon: '🖼️' },
    { name: 'Testimonials', path: '/admin/testimonials', icon: '💬' },
    { name: 'Enquiries', path: '/admin/enquiries', icon: '✉️' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#1a1a1a] text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <span className="text-xl font-serif font-semibold tracking-widest text-white uppercase">Make My Cottage</span>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? 'bg-[#8B6914] text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Hello, {adminName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-[#1a1a1a] rounded-md hover:bg-gray-800 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
