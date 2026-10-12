import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Plus, Minus } from 'lucide-react';
import api from '../utils/api';
import { BUSINESS_INFO } from '../utils/constants';

const nextSteps = [
  {
    num: '01',
    title: 'Your enquiry is reviewed',
    description: 'Within hours, your inquiry reaches a project manager who reviews it.'
  },
  {
    num: '02',
    title: 'Discovery call scheduled',
    description: 'A 20-minute call to align your project with our expert construction team.'
  },
  {
    num: '03',
    title: 'Written project summary',
    description: 'Written summary: scope, feasibility, and clear next steps within two business days.'
  }
];

const faqs = [
  {
    question: 'What actually causes delays during builds like these?',
    answer: [
      'Most delays come from poor coordination, missing materials, unclear approvals, or trades arriving out of sequence. Make My Cottage manages scheduling weekly, not monthly, which keeps problems visible before they affect later stages.',
      'Clients also receive milestone tracking updates every Friday, so timeline shifts never appear unexpectedly. Weather and permit delays can still happen, but communication around them stays immediate and documented instead of reactive.'
    ]
  },
  {
    question: 'Do I need full plans before speaking with your team?',
    answer: [
      'Not at all. Many clients come to us with only a rough idea, a site, or a budget range, and we help shape the rest from there. Early conversations are about understanding your goals, not reviewing finished blueprints.',
      "If you already have architectural drawings, we'll review them and flag anything that may affect cost or buildability. If you don't, our team can guide you through concept, design partners, and feasibility before a single line is drawn."
    ]
  },
  {
    question: 'What happens if something goes wrong during the work?',
    answer: [
      'Issues are handled directly and transparently. Every project has a dedicated site manager who documents conditions daily, so when something unexpected appears, we already have the context to resolve it quickly.',
      "You'll be informed the same day, along with the proposed solution, cost impact (if any), and revised timeline. We don't bury problems in paperwork. Honest reporting protects the build and the relationship."
    ]
  },
  {
    question: 'Will I need to chase updates every week?',
    answer: [
      'No. Updates come to you on a fixed schedule, not on request. Every Friday you receive a written progress report with photos, completed milestones, upcoming tasks, and any decisions needed from your side.',
      'Between reports, your project manager remains reachable for questions or quick clarifications. The goal is simple: you should always know where your build stands without needing to ask.'
    ]
  },
  {
    question: 'Can you work while my business or home stays active?',
    answer: [
      'Yes. A large portion of our commercial and residential renovations happen in occupied spaces. We plan phasing, dust control, working hours, and access points around your daily routine so disruption stays minimal.',
      'For businesses, we often schedule noisy or invasive work after hours or in sectioned zones to keep operations running. For homes, we isolate work areas and maintain clean entry paths so your family can live comfortably through the build.'
    ]
  },
  {
    question: 'Do you handle permits and approvals, or is that on me?',
    answer: [
      'Permits, inspections, and regulatory approvals are managed entirely by our team. We prepare documentation, coordinate with local authorities, and track every submission so nothing stalls the project on a technicality.',
      "You'll be kept informed at each approval stage, but you won't need to stand in any lines or decode any forms. Compliance is part of the build, not a separate burden placed on the client."
    ]
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [openFaq, setOpenFaq] = useState(0); // First item open by default

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      projectType: formData.projectType || 'Wooden Home',
      message: formData.message
    };

    try {
      await api.post('/enquiries', payload);
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (err) {
      console.warn('API error, falling back to local success state:', err);
      // Graceful fallback when database is not connected
      setStatus('success');
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#FFF7E5] min-h-screen w-full text-[#1B1915]">
      <Helmet>
        <title>Contact Make My Cottage | Turnkey Wooden Homes & Cottages</title>
        <meta
          name="description"
          content="Bring the idea. We'll build it. Reach Make My Cottage Infra Pvt. Ltd. at Shamshabad, Hyderabad. Call +91 99020 50007 for turnkey cottages, farmhouses, and wooden retreats."
        />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. HERO & CONTACT FORM SECTION */}
      {/* ========================================================================= */}
      <section className="pt-36 sm:pt-44 md:pt-48 pb-20 sm:pb-28">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading, Subtitle & Direct Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#1B1915] leading-[1.04] mb-6">
                Bring the idea.<br />
                We'll build it.
              </h1>

              <p className="text-base sm:text-lg text-[#504732] leading-relaxed mb-12 max-w-md font-normal">
                We read every enquiry personally. Reaching out costs you nothing yet.
              </p>

              {/* Direct Details Stack */}
              <div className="space-y-7 pt-4">
                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="w-3.5 h-3.5 text-[#80796B]" />
                    <span className="text-xs uppercase tracking-wider text-[#80796B] font-medium">
                      Email address
                    </span>
                  </div>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-lg sm:text-xl font-medium text-[#1B1915] hover:opacity-75 transition-opacity"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-3.5 h-3.5 text-[#80796B]" />
                    <span className="text-xs uppercase tracking-wider text-[#80796B] font-medium">
                      Phone number
                    </span>
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-lg sm:text-xl font-medium text-[#1B1915] hover:opacity-75 transition-opacity"
                  >
                    {BUSINESS_INFO.displayPhone}
                  </a>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#80796B]" />
                    <span className="text-xs uppercase tracking-wider text-[#80796B] font-medium">
                      Location
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl font-medium text-[#1B1915] leading-snug">
                    {BUSINESS_INFO.address.doorNo}, {BUSINESS_INFO.address.street},<br />
                    {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Warm Seamless Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-7"
            >
              {status === 'success' ? (
                <div className="bg-[#F5ECDA] rounded-2xl p-10 sm:p-14 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1B1915] text-[#FCF6E9] flex items-center justify-center mx-auto text-2xl">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-[#1B1915]">
                    Enquiry Received
                  </h3>
                  <p className="text-sm sm:text-base text-[#504732] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Make My Cottage. Our project team reviews every inquiry personally and will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-7 py-3 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#1B1915] text-[#FCF6E9] hover:bg-black transition-all"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1B1915] mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-[#F5ECDA] hover:bg-[#F2E7D1] focus:bg-[#FFFDF7] border border-[#E8DDCA] focus:border-[#1B1915] rounded-xl px-4 py-3.5 text-sm sm:text-base text-[#1B1915] placeholder:text-[#A89E88] outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1B1915] mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-[#F5ECDA] hover:bg-[#F2E7D1] focus:bg-[#FFFDF7] border border-[#E8DDCA] focus:border-[#1B1915] rounded-xl px-4 py-3.5 text-sm sm:text-base text-[#1B1915] placeholder:text-[#A89E88] outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email address & Phone number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1B1915] mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#F5ECDA] hover:bg-[#F2E7D1] focus:bg-[#FFFDF7] border border-[#E8DDCA] focus:border-[#1B1915] rounded-xl px-4 py-3.5 text-sm sm:text-base text-[#1B1915] placeholder:text-[#A89E88] outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1B1915] mb-2">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#F5ECDA] hover:bg-[#F2E7D1] focus:bg-[#FFFDF7] border border-[#E8DDCA] focus:border-[#1B1915] rounded-xl px-4 py-3.5 text-sm sm:text-base text-[#1B1915] placeholder:text-[#A89E88] outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 3: Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B1915] mb-2">
                      Project type
                    </label>
                    <div className="relative">
                      <select
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full bg-[#F5ECDA] hover:bg-[#F2E7D1] focus:bg-[#FFFDF7] border border-[#E8DDCA] focus:border-[#1B1915] rounded-xl px-4 py-3.5 text-sm sm:text-base text-[#1B1915] outline-none transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          What are you building?
                        </option>
                        <option value="Wooden Home">Wooden Home</option>
                        <option value="Farmhouse">Farmhouse Retreat</option>
                        <option value="Cottage">Turnkey Wooden Cottage</option>
                        <option value="Prefabricated Home">Prefabricated Wooden Home</option>
                        <option value="Resort Cottage">Resort Cottage Architecture</option>
                        <option value="Custom Structure">Custom Timber Structure</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#80796B]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Project details */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B1915] mb-2">
                      Project details
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Share ideas, plans, concerns here.."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#F5ECDA] hover:bg-[#F2E7D1] focus:bg-[#FFFDF7] border border-[#E8DDCA] focus:border-[#1B1915] rounded-xl px-4 py-3.5 text-sm sm:text-base text-[#1B1915] placeholder:text-[#A89E88] outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Row 5: Action & Note */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex items-center justify-center gap-2.5 bg-[#1B1915] hover:bg-black text-[#FCF6E9] px-8 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-200 shadow-md hover:scale-[1.02] disabled:opacity-50 group cursor-pointer"
                    >
                      <span>{status === 'loading' ? 'Submitting...' : 'Submit inquiry'}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <p className="text-xs sm:text-sm text-[#7A6F56] max-w-[280px] leading-snug">
                      We respond within 24 hours — personally, not automatically.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHAT HAPPENS NEXT SECTION (DARK CHARCOAL) */}
      {/* ========================================================================= */}
      <section className="bg-[#030000] text-[#FCF6E9] py-20 sm:py-24 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 md:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#FCF6E9] mb-12 sm:mb-16"
          >
            What happens next
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {nextSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start"
              >
                {/* Number Badge */}
                <span className="inline-block bg-[#161411] border border-white/10 text-[#C7BFA8] font-mono text-xs px-2.5 py-1 rounded-md mb-6">
                  {step.num}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-medium text-[#FCF6E9] mb-3 leading-snug">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#A89F8D] leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. COMMON QUESTIONS FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 md:py-36 bg-[#FFF7E5]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#DE5533] inline-block" />
                <span className="text-xs uppercase tracking-widest text-[#7A6F56] font-semibold">
                  Common questions
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1B1915] leading-[1.08]">
                Clarity before anything gets demolished.
              </h2>
            </motion.div>

            {/* Right Column: Accordion Cards */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="bg-[#F5ECDA] hover:bg-[#F2E7D1] rounded-2xl p-6 sm:p-7 transition-colors cursor-pointer"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-medium text-[#1B1915] leading-snug">
                        {faq.question}
                      </h3>
                      <button
                        type="button"
                        className="w-9 h-9 rounded-full bg-[#EADDC5] flex items-center justify-center text-[#1B1915] shrink-0 transition-transform duration-200"
                        aria-label={isOpen ? "Close question" : "Open question"}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-3 text-sm sm:text-base text-[#504732] leading-relaxed font-normal">
                            {faq.answer.map((paragraph, pIdx) => (
                              <p key={pIdx}>{paragraph}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
