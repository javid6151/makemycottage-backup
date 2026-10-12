import React from 'react';

/**
 * OurProjectsCard Component
 * Resentii / Framer architectural cutout badge with dual concave SVG fillet corners
 * and charcoal pill title container.
 */
const OurProjectsCard = ({
  title = 'Our Gallery',
  className = '',
}) => {
  return (
    <div className={`relative z-10 flex flex-row items-end select-none ${className}`}>
      {/* Column containing top inverted SVG fillet and white cutout container */}
      <div className="flex flex-col items-start flex-none">
        {/* Top Inverted Fillet (34px x 34px, rotate 270deg) */}
        <div
          className="w-[34px] h-[34px] flex-none pointer-events-none"
          style={{ transform: 'rotate(270deg)' }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
            <path d="M0 0L0 20C0 6 6 0 20 0L0 0Z" fill="rgb(255, 255, 255)" />
          </svg>
        </div>

        {/* White Cutout Box (border-top-right-radius: 30px, padding: 15px) */}
        <div
          className="bg-white flex-none"
          style={{
            borderTopRightRadius: '30px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            borderTopLeftRadius: '0px',
            padding: '15px',
          }}
        >
          {/* Dark Charcoal Pill (border-radius: 20px, translated -10px, 10px) */}
          <div
            className="bg-[#28282c] px-6 sm:px-10 md:px-14 py-3.5 sm:py-4 md:py-5 flex items-center justify-center shadow-md"
            style={{
              borderRadius: '20px',
              transform: 'translateX(-10px) translateY(10px)',
            }}
          >
            <h1 className="text-white text-3xl sm:text-5xl md:text-[56px] lg:text-[68px] font-bold tracking-[-0.03em] select-none whitespace-nowrap leading-none font-['Manrope',sans-serif]">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Right Inverted Fillet (34px x 34px, rotate -90deg) */}
      <div
        className="w-[34px] h-[34px] flex-none pointer-events-none"
        style={{ transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
          <path d="M0 0L0 20C0 6 6 0 20 0L0 0Z" fill="rgb(255, 255, 255)" />
        </svg>
      </div>
    </div>
  );
};

export default OurProjectsCard;
