import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionLabel from '../components/common/SectionLabel';
import CTAButton from '../components/common/CTAButton';
import { SERVICES, BUSINESS_INFO } from '../utils/constants';

const ServicesPage = () => {
  return (
    <div className="bg-[#f5f2f2] min-h-screen w-full pt-32 pb-24 text-[#141517]">
      <Helmet>
        <title>Services | Make My Cottage - Wooden Home Construction India</title>
        <meta name="description" content="Turnkey construction services for wooden homes, farmhouses, cottages, prefabricated homes, and resort structures in Hyderabad and Pan-India." />
      </Helmet>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
        <AnimatedSection className="max-w-4xl">
          <SectionLabel text="OUR CAPABILITIES" />
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-[#141517] uppercase leading-[0.92] mt-6 mb-8">
            What We Build.
          </h1>
          <p className="font-sans text-black/75 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            From initial site topography analysis and 3D architectural renders to foundation work, timber erection, and turnkey key handover.
          </p>
        </AnimatedSection>
      </section>

      {/* Services List - Editorial Bildora Layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="space-y-24 md:space-y-36">
          {SERVICES.map((srv, index) => {
            const isReversed = index % 2 === 1;

            return (
              <AnimatedSection key={srv.id}>
                <div 
                  id={srv.id} 
                  className={`scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-black/5 shadow-xl group">
                      <img 
                        src={srv.image} 
                        alt={srv.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-4xl text-accent-terracotta font-medium">
                        {srv.num}
                      </span>
                      <span className="w-12 h-[1px] bg-black/10" />
                      <span className="text-xs uppercase tracking-widest text-black/40">
                        Turnkey Construction
                      </span>
                    </div>

                    <h2 className="font-heading text-3xl sm:text-4xl text-[#141517] uppercase leading-tight">
                      {srv.title}
                    </h2>

                    <p className="font-sans text-black/75 text-base font-light leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="pt-4">
                      <CTAButton to="/contact" variant="dark">
                        Enquire for {srv.title}
                      </CTAButton>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#141517] text-white py-24 md:py-36 px-6 md:px-12 text-center">
        <AnimatedSection className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionLabel text="GET STARTED" />
          <h2 className="font-heading text-4xl sm:text-6xl uppercase leading-[1] mt-4 mb-8">
            Let's build your bespoke wooden space.
          </h2>
          <p className="text-white/70 font-light text-base md:text-lg mb-10 max-w-xl">
            Contact Make My Cottage Infra Pvt. Ltd. today for architectural consultation and turnkey site feasibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton to="/contact" variant="accent">
              Start Project &rarr;
            </CTAButton>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/10 text-white hover:bg-white hover:text-black text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default ServicesPage;
