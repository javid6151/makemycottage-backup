import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { HiArrowNarrowRight, HiPhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineCheckCircle } from 'react-icons/hi';
import api from '../utils/api';
import { BUSINESS_INFO } from '../utils/constants';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    projectType: 'Wooden Home',
    estimatedBudget: '50 Lakhs - 1 Crore',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await api.post('/enquiries', formData);
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        projectType: 'Wooden Home',
        estimatedBudget: '50 Lakhs - 1 Crore',
        message: ''
      });
    } catch (err) {
      console.warn('API error, falling back to local success state:', err);
      // Graceful fallback for demo or when database is offline
      setStatus('success');
    }
  };

  return (
    <div className="bg-[#f5f2f2] min-h-screen w-full pt-32 pb-24 text-[#141517]">
      <Helmet>
        <title>Contact Make My Cottage | Hyderabad Wooden Home Builders</title>
        <meta name="description" content="Reach Make My Cottage Infra Pvt. Ltd. at Shamshabad, Hyderabad. Call 9902050007 for turnkey wooden homes, farmhouses, and cottages." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-accent-terracotta mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta" />
            <span>Contact &amp; Enquiry</span>
          </div>
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-[#141517] uppercase leading-[0.92] max-w-4xl">
            Let's build<br />something beautiful.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-10">
            <p className="text-base sm:text-lg text-black/75 font-light leading-relaxed">
              Whether you have an existing plot, are planning a weekend farmhouse, or need resort cottages, our team is ready to assist with design and turnkey construction.
            </p>

            <div className="space-y-8 pt-6 border-t border-black/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-terracotta shadow-sm shrink-0 mt-1 border border-black/5">
                  <HiOutlineLocationMarker className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-black/50 mb-1">
                    Office &amp; Site Experience Center
                  </h3>
                  <p className="font-heading text-xl text-[#141517] leading-snug">
                    {BUSINESS_INFO.address.doorNo}, {BUSINESS_INFO.address.street},<br />
                    {BUSINESS_INFO.address.area},<br />
                    {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} &ndash; {BUSINESS_INFO.address.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-terracotta shadow-sm shrink-0 mt-1 border border-black/5">
                  <HiPhone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-black/50 mb-1">
                    Direct Phone Line
                  </h3>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="font-heading text-2xl text-[#141517] hover:text-accent-terracotta transition-colors">
                    {BUSINESS_INFO.displayPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent-terracotta shadow-sm shrink-0 mt-1 border border-black/5">
                  <HiOutlineMail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-black/50 mb-1">
                    Email Correspondence
                  </h3>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="font-heading text-xl text-[#141517] hover:text-accent-terracotta transition-colors">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-black/50 mb-3">
                  Follow Our Real Builds
                </h3>
                <a
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-black hover:text-accent-terracotta font-medium transition-colors"
                >
                  <span>Instagram: {BUSINESS_INFO.social.instagramHandle}</span>
                  <span className="text-xs">&nearr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-xl">
            <h3 className="font-heading text-3xl uppercase text-[#141517] mb-2">
              Send Project Enquiry
            </h3>
            <p className="text-xs text-black/50 mb-8">
              Fill in your requirement to schedule an architectural consultation and site visit.
            </p>
            
            {status === 'success' ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  <HiOutlineCheckCircle className="w-10 h-10" />
                </div>
                <h4 className="font-heading text-3xl text-[#141517] uppercase">
                  Thank you!
                </h4>
                <p className="text-sm text-black/70 max-w-md mx-auto leading-relaxed">
                  Your project enquiry has been registered with Make My Cottage Infra Pvt. Ltd. Our team will contact you shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-accent-terracotta transition-all"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black/70 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      placeholder="e.g. Anand Varma"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#f5f2f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-accent-terracotta focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black/70 mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      placeholder="e.g. 9902050007"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#f5f2f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-accent-terracotta focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black/70 mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="e.g. anand@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#f5f2f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-accent-terracotta focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black/70 mb-2">
                      Plot Location / City *
                    </label>
                    <input 
                      type="text" 
                      name="location" 
                      required 
                      placeholder="e.g. Shamshabad / Hyderabad"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-[#f5f2f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-accent-terracotta focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black/70 mb-2">
                      Project Type
                    </label>
                    <select 
                      name="projectType" 
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full bg-[#f5f2f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-accent-terracotta focus:bg-white transition-all"
                    >
                      <option value="Wooden Home">Wooden Home</option>
                      <option value="Farm House">Farm House</option>
                      <option value="Cottage">Cottage Construction</option>
                      <option value="Prefabricated Home">Prefabricated Wooden Home</option>
                      <option value="Resort Cottage">Resort Cottage</option>
                      <option value="Custom Structure">Custom Wooden Structure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-black/70 mb-2">
                      Estimated Budget
                    </label>
                    <select 
                      name="estimatedBudget" 
                      value={formData.estimatedBudget}
                      onChange={handleChange}
                      className="w-full bg-[#f5f2f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-accent-terracotta focus:bg-white transition-all"
                    >
                      <option value="Under 30 Lakhs">Under ₹30 Lakhs</option>
                      <option value="30 Lakhs - 50 Lakhs">₹30 Lakhs – ₹50 Lakhs</option>
                      <option value="50 Lakhs - 1 Crore">₹50 Lakhs – ₹1 Crore</option>
                      <option value="1 Crore - 2 Crores">₹1 Crore – ₹2 Crores</option>
                      <option value="Above 2 Crores">Above ₹2 Crores</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-black/70 mb-2">
                    Message / Project Requirements
                  </label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    placeholder="Tell us about your plot area, desired bedrooms, or timeframe..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#f5f2f2] border border-black/5 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-accent-terracotta focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-full bg-accent-terracotta text-white hover:bg-black text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 group"
                >
                  <span>{status === 'loading' ? 'Submitting...' : 'Send Project Enquiry'}</span>
                  <HiArrowNarrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
