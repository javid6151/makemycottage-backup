import React from 'react';

/**
 * GalleryHeroImage Component
 * Premium hero image banner for the gallery page with rounded corners.
 */
const GalleryHeroImage = ({
  src = '/images/gallery-hero.png',
  alt = 'MakeMyCottage Luxury Glass Cottage in Winter',
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-[30px] overflow-hidden bg-[#e9ecf2] shadow-lg pointer-events-none ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center select-none"
        loading="eager"
      />
    </div>
  );
};

export default GalleryHeroImage;
