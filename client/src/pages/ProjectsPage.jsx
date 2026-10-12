import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionLabel from '../components/common/SectionLabel';
import CTAButton from '../components/common/CTAButton';
import { PROJECTS_DATA, BUSINESS_INFO } from '../utils/constants';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wooden Home', 'Farm House', 'Cottage', 'Resort Cottage', 'Prefabricated Home'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="bg-[#f5f2f2] min-h-screen w-full pt-32 pb-24 text-[#141517]">
      <Helmet>
        <title>Projects Portfolio | Make My Cottage - Handcrafted Wooden Homes</title>
        <meta 
          name="description" 
          content="Explore our completed portfolio of bespoke wooden homes, farmhouses, cottages, and prefabricated modular timber villas across India." 
        />
      </Helmet>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-20">
        <AnimatedSection className="max-w-4xl">
          <SectionLabel text="OUR PORTFOLIO" />
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-[#141517] uppercase leading-[0.92] mt-6 mb-8">
            Projects Made to Last.
          </h1>
          <p className="font-sans text-black/75 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-10">
            Each project represents our dedication to structural precision, honest timber craftsmanship, and sustainable architectural design.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#141517] text-white font-semibold shadow-md'
                    : 'bg-white text-[#555] hover:text-[#141517] border border-[#e3e3de]'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.map((project) => (
            <AnimatedSection key={project.id}>
              <article id={project.slug} className="group flex flex-col justify-between h-full bg-white rounded-3xl p-5 border border-[#e3e3de] shadow-sm hover:shadow-xl transition-all duration-500">
                <div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block relative rounded-2xl overflow-hidden aspect-[16/11] bg-black/5 mb-6 shadow-sm border border-black/5"
                  >
                    <img
                      src={project.heroImage}
                      alt={project.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#141517] shadow-sm">
                        {project.category}
                      </span>
                      <span className="font-heading text-sm text-white font-light">
                        {project.num}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141517] text-white text-[11px] uppercase tracking-wider font-semibold shadow-md">
                        <span>View Project</span>
                        <HiArrowNarrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>

                  <div className="px-2">
                    <div className="text-[11px] uppercase tracking-widest text-[#888] font-medium mb-1.5">
                      {project.location} &middot; {project.specs?.builtUpArea}
                    </div>
                    <h3 className="font-heading text-2xl text-[#141517] mb-2 group-hover:opacity-80 transition-opacity">
                      <Link to={`/projects/${project.slug}`}>
                        {project.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#666] font-light leading-relaxed line-clamp-3 mb-6">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-4 px-2 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[11px] text-[#999] uppercase tracking-wider">
                    {project.specs?.constructionType}
                  </span>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#141517] hover:underline"
                  >
                    <span>Full Details</span>
                    <HiArrowNarrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#141517] text-white py-24 md:py-36 px-6 md:px-12 text-center">
        <AnimatedSection className="max-w-3xl mx-auto flex flex-col items-center">
          <SectionLabel text="START YOUR BUILD" />
          <h2 className="font-heading text-4xl sm:text-6xl uppercase leading-[1] mt-4 mb-8">
            Ready to build something lasting?
          </h2>
          <p className="text-white/70 font-light text-base md:text-lg mb-10 max-w-xl">
            Get in touch with our team for customized 3D plans, budget estimations, and turnkey execution schedules.
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

export default ProjectsPage;
