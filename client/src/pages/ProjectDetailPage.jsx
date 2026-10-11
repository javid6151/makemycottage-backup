import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { HiArrowNarrowRight, HiArrowNarrowLeft, HiOutlineCheck } from 'react-icons/hi';
import { PROJECTS_DATA, BUSINESS_INFO } from '../utils/constants';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS_DATA.find((p) => p.slug === slug) || PROJECTS_DATA[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f5f2f2] flex flex-col items-center justify-center text-[#141517] px-6">
        <h1 className="font-heading text-5xl md:text-7xl mb-6">Project Not Found</h1>
        <Link 
          to="/"
          className="px-8 py-3.5 rounded-full bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-accent-terracotta transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f2f2] min-h-screen w-full text-[#141517]">
      <Helmet>
        <title>{`${project.name} | Make My Cottage`}</title>
        <meta name="description" content={project.shortDescription || project.description} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] w-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 text-white overflow-hidden bg-[#121315]">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.heroImage} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white mb-8 transition-colors"
          >
            <HiArrowNarrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest text-accent-terracotta border border-white/15 mb-4">
              <span>{project.category}</span>
              <span>&middot;</span>
              <span className="text-white/80">{project.location}</span>
            </div>

            <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl text-white uppercase leading-[0.92] mb-6">
              {project.name}
            </h1>

            <p className="text-base sm:text-lg text-white/80 font-light max-w-2xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Project Story & Specs Grid */}
      <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Story */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-terracotta block mb-2">
                Project Story &amp; Overview
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#141517] uppercase leading-tight">
                Architectural Vision<br />&amp; Living Experience
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-lg text-black/75 font-light leading-relaxed">
              <p>{project.description}</p>
              <p>
                Every timber element was precision engineered off-site and hand-fitted on site to ensure seamless joints, superior load distribution, and natural thermal comfort tailored to the local environment.
              </p>
            </div>

            <div className="pt-6 border-t border-black/10 flex flex-wrap gap-6 text-sm text-black/70">
              <div className="flex items-center gap-2">
                <HiOutlineCheck className="w-4 h-4 text-accent-terracotta" />
                <span>100% Termite Treated Timber</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCheck className="w-4 h-4 text-accent-terracotta" />
                <span>Weather-Sealed Joinery</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCheck className="w-4 h-4 text-accent-terracotta" />
                <span>Turnkey Execution</span>
              </div>
            </div>
          </div>

          {/* Specifications Card */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-black/5 shadow-lg">
            <h3 className="font-heading text-2xl uppercase text-[#141517] mb-6 pb-4 border-b border-black/5">
              Specifications
            </h3>

            <dl className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-black/5">
                <dt className="text-black/50 uppercase tracking-wider text-xs font-semibold">Built-up Area</dt>
                <dd className="font-medium text-black text-right">{project.specs.builtUpArea}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-black/5">
                <dt className="text-black/50 uppercase tracking-wider text-xs font-semibold">Location</dt>
                <dd className="font-medium text-black text-right">{project.specs.location}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-black/5">
                <dt className="text-black/50 uppercase tracking-wider text-xs font-semibold">Project Type</dt>
                <dd className="font-medium text-black text-right">{project.specs.projectType}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-black/5">
                <dt className="text-black/50 uppercase tracking-wider text-xs font-semibold">Construction</dt>
                <dd className="font-medium text-black text-right">{project.specs.constructionType}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-black/5">
                <dt className="text-black/50 uppercase tracking-wider text-xs font-semibold">Completion</dt>
                <dd className="font-medium text-black text-right">{project.specs.completion}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt className="text-black/50 uppercase tracking-wider text-xs font-semibold">Materials</dt>
                <dd className="font-medium text-black text-right">{project.specs.materials}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Project Gallery - Alternating Architectural Layout */}
      <section className="py-16 md:py-24 bg-[#141517] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-terracotta block mb-2">
              Visual Documentation
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-white uppercase leading-tight">
              Project Gallery
            </h2>
          </div>

          <div className="space-y-12">
            {project.images.map((img, idx) => {
              // Alternating layouts: full-width, two-column, large+small
              if (idx === 0) {
                return (
                  <div key={idx} className="rounded-3xl overflow-hidden aspect-[16/9] bg-black/40 shadow-2xl">
                    <img src={img} alt={`${project.name} primary elevation`} className="w-full h-full object-cover" />
                  </div>
                );
              }

              if (idx % 2 === 1 && idx + 1 < project.images.length) {
                return (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-black/40 shadow-xl">
                      <img src={img} alt={`${project.name} detail`} className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-black/40 shadow-xl">
                      <img src={project.images[idx + 1]} alt={`${project.name} interior`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                );
              }

              if (idx % 2 === 1) {
                return (
                  <div key={idx} className="rounded-3xl overflow-hidden aspect-[16/9] bg-black/40 shadow-xl">
                    <img src={img} alt={`${project.name} overview`} className="w-full h-full object-cover" />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </section>

      {/* End CTA */}
      <section className="py-24 md:py-36 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-accent-terracotta block mb-3">
          Custom Wooden Homes &middot; India
        </span>
        <h2 className="font-heading text-4xl sm:text-6xl text-[#141517] uppercase leading-[1] mb-6">
          Have a project like this<br />in mind?
        </h2>
        <p className="text-base sm:text-lg text-black/70 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Tell us about your plot or property. We will provide 3D layout options, feasibility analysis, and turnkey construction estimates.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-terracotta text-white hover:bg-black text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-xl"
          >
            <span>Start Your Project</span>
            <HiArrowNarrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black/5 hover:bg-black/10 text-[#141517] text-xs uppercase tracking-widest font-semibold transition-all duration-300"
          >
            <span>Call {BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
