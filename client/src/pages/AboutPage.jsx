import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionLabel from '../components/common/SectionLabel';
import CTAButton from '../components/common/CTAButton';
import { BUSINESS_INFO } from '../utils/constants';

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '10+', label: 'Years Experience' },
  { value: '100%', label: 'Turnkey Handover' },
  { value: '4.9★', label: 'Client Trust Rating' }
];

const values = [
  { 
    title: 'Precision Timber Craft', 
    desc: 'We combine traditional woodworking integrity with modern timber engineering to create durable structures engineered for decades.' 
  },
  { 
    title: 'Natural & Climate-Smart', 
    desc: 'Wood is nature’s most sustainable, thermally insulated building material. Seasoned and pressure-treated for tropical longevity.' 
  },
  { 
    title: 'Turnkey Accountability', 
    desc: 'From architectural concept and foundation to lighting and final handover, we deliver complete single-point execution.' 
  }
];

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen w-full pt-32 pb-24 text-[#141517]">
      <Helmet>
        <title>About Make My Cottage | Premium Wooden Home Builders India</title>
        <meta name="description" content="Learn about Make My Cottage Infra Pvt. Ltd., our story, our master craftsmanship, and our turnkey wooden homes across Hyderabad and India." />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <AnimatedSection className="max-w-5xl">
          <SectionLabel text="OUR STORY" />
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-[#141517] uppercase leading-[0.92] mt-6 mb-12">
            About Make My Cottage
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans text-black/75 text-base md:text-lg leading-relaxed font-light">
            <p>
              Make My Cottage Infra Pvt. Ltd. was established with a singular mission: to bring world-class wooden architecture, resort living, and tranquil farmhouse retreats to clients across India.
            </p>
            <p>
              Headquartered at Shamshabad, Hyderabad, we specialize in high-performance prefabricated and custom timber homes that seamlessly merge the organic warmth of natural wood with cutting-edge engineering.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Image Banner */}
      <section className="w-full h-[55vh] md:h-[65vh] relative mb-24 md:mb-32 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1920&q=80" 
          alt="Craftsmanship and architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28 md:mb-36">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-1">
              <SectionLabel text="OUR PRINCIPLES" />
              <h2 className="font-heading text-3xl sm:text-5xl text-[#141517] uppercase leading-[1.05] mt-4">
                Guided by quality, driven by craft.
              </h2>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <div className="text-accent-terracotta font-heading text-2xl font-bold mb-3">0{idx + 1}</div>
                  <h3 className="font-heading text-xl text-[#141517] uppercase mb-3">{val.title}</h3>
                  <p className="font-sans text-black/65 leading-relaxed text-xs font-light">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats Section */}
      <section className="bg-[#141517] text-white py-20 md:py-28 px-6 md:px-12 mb-28 md:mb-36">
        <AnimatedSection className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-heading text-5xl md:text-7xl text-accent-terracotta mb-2 font-light">{stat.value}</span>
                <span className="font-sans text-white/60 text-xs tracking-widest uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Craftsmanship Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28 md:mb-36">
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-black/5 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1581404917879-53e19259f56e?w=800&q=80" 
              alt="Master craftsmen at work" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div>
            <SectionLabel text="THE CRAFT" />
            <h2 className="font-heading text-3xl sm:text-5xl text-[#141517] uppercase leading-[1.05] mt-4 mb-6">
              Masters of the Timber Medium.
            </h2>
            <p className="font-sans text-black/75 leading-relaxed text-base md:text-lg font-light mb-6">
              Our team consists of master joiners, structural timber architects, and experienced site superintendents. We treat every farmhouse and cottage as an architectural legacy.
            </p>
            <p className="font-sans text-black/75 leading-relaxed text-base md:text-lg font-light mb-8">
              Every log and beam is selected for structural integrity, kiln-seasoned to optimal moisture content, and detailed for resistance against dampness, sun, and insects.
            </p>
            <CTAButton to="/contact" variant="accent">
              Schedule Site Consultation
            </CTAButton>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="bg-white border-t border-black/5 py-24 md:py-32 px-6 md:px-12 text-center">
        <AnimatedSection className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionLabel text="NEXT STEPS" />
          <h2 className="font-heading text-4xl sm:text-6xl text-[#141517] uppercase leading-[1] mt-4 mb-8">
            Ready to build your dream wooden home?
          </h2>
          <CTAButton to="/contact" variant="accent">
            Contact Us Direct
          </CTAButton>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default AboutPage;
