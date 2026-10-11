import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionLabel from '../components/common/SectionLabel';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80', category: 'Homes', alt: 'Traditional wooden farmhouse' },
  { id: 2, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', category: 'Interiors', alt: 'Modern living room with wood accents' },
  { id: 3, src: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80', category: 'Homes', alt: 'Contemporary wooden home exterior' },
  { id: 4, src: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80', category: 'Cottages', alt: 'Cozy pine cottage in the woods' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', category: 'Interiors', alt: 'Wooden kitchen interior' },
  { id: 6, src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80', category: 'Homes', alt: 'Prefabricated modern wooden house' },
  { id: 7, src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', category: 'Details', alt: 'Close up of timber framing' },
  { id: 8, src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', category: 'Interiors', alt: 'Bedroom with exposed wooden beams' },
  { id: 9, src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1200&q=80', category: 'Cottages', alt: 'Bamboo eco resort cottage' },
  { id: 10, src: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80', category: 'Homes', alt: 'Lakeside cedar wood home' },
  { id: 11, src: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80', category: 'Outdoor', alt: 'Wooden deck with seating' },
  { id: 12, src: 'https://images.unsplash.com/photo-1581404917879-53e19259f56e?w=1200&q=80', category: 'Construction', alt: 'Wooden frame house under construction' },
  { id: 13, src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80', category: 'Interiors', alt: 'Open plan living with wood flooring' },
  { id: 14, src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', category: 'Details', alt: 'Natural stone and wood wall' },
  { id: 15, src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', category: 'Outdoor', alt: 'Exterior lighting on wooden facade' },
  { id: 16, src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', category: 'Construction', alt: 'Architectural blueprints on wood' },
];

const categories = ['All', 'Homes', 'Cottages', 'Interiors', 'Construction', 'Details', 'Outdoor'];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  return (
    <div className="bg-offwhite min-h-screen w-full pt-32 pb-24">
      <Helmet>
        <title>Gallery | MakeMyCottage</title>
        <meta name="description" content="Explore our portfolio of premium wooden homes, cottages, and architectural details." />
      </Helmet>

      <div className="px-6 md:px-16 lg:px-24">
        <AnimatedSection className="mb-16">
          <SectionLabel text="GALLERY" />
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal mt-6 mb-12">
            A CLOSER LOOK.
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 md:gap-8 border-b border-charcoal/10 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-sans tracking-wide text-sm md:text-base transition-colors duration-300 pb-2 border-b-2 ${
                  activeCategory === category 
                    ? 'text-charcoal border-charcoal' 
                    : 'text-charcoal/50 border-transparent hover:text-charcoal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Masonry Grid */}
        <AnimatedSection>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid cursor-pointer group overflow-hidden relative"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-auto bg-charcoal/5 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-sand text-xs tracking-wider uppercase mb-1">{image.category}</span>
                    <p className="text-white font-serif text-lg">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center backdrop-blur-sm"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-12 text-white/50 hover:text-white transition-colors z-50 p-4"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-12 text-white/50 hover:text-white transition-colors z-50 p-4"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] px-4 md:px-0 w-full relative"
            >
              <img 
                src={filteredImages[currentIndex].src} 
                alt={filteredImages[currentIndex].alt}
                className="w-full h-full object-contain mx-auto max-h-[85vh]"
              />
              <div className="absolute bottom-[-40px] left-0 w-full text-center text-white/70 font-sans text-sm">
                {currentIndex + 1} / {filteredImages.length} &mdash; {filteredImages[currentIndex].alt}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default GalleryPage;
