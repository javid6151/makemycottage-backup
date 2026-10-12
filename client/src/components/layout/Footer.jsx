import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../../utils/constants';
import ConstructSpaceModal from '../common/ConstructSpaceModal';
import {
  FaRegEnvelope,
  FaPhone,
  FaLocationDot,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram
} from 'react-icons/fa6';

const Footer = () => {
  const footerRef = useRef(null);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Trigger puzzle game EVERY TIME the user reaches the footer section
  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            // Short 400ms delay so user sees footer before popup animates in
            setTimeout(() => {
              setIsGameOpen(true);
            }, 400);
          }
        } else {
          // When user scrolls away from footer, reset so next time they reach footer it triggers again!
          hasTriggeredRef.current = false;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  // Also support custom event triggers from buttons elsewhere on the site
  useEffect(() => {
    const handleCustomOpen = () => setIsGameOpen(true);
    window.addEventListener('open-construct-space', handleCustomOpen);
    return () => window.removeEventListener('open-construct-space', handleCustomOpen);
  }, []);

  const handleRewardClaimed = (code) => {
    navigator.clipboard?.writeText(code);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="bg-black text-white pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-10 md:pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Main 4-Column Grid (Exact Bildora Aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 sm:pb-20">
          
          {/* Col 1: Card Image & Built to Last Tagline */}
          <div className="lg:col-span-4 space-y-5">
            <div className="w-52 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10 group">
              <img
                src="https://framerusercontent.com/images/MYmdhDGEe2D4fRHyWEaBmO1tms.jpg"
                alt="Make My Cottage Architecture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="space-y-1">
              <p className="text-white/95 text-base font-normal leading-snug tracking-tight">
                Built to last. Delivered<br />with precision.
              </p>
              <p className="text-xs text-white/40 uppercase tracking-widest pt-1 font-medium">
                {BUSINESS_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Link 1 */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-white text-base font-semibold tracking-tight">
              Quick Link
            </h4>
            <ul className="space-y-3.5 text-sm text-white/70 font-normal">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-200 inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors duration-200 inline-block">
                  Service
                </Link>
              </li>
              <li>
                <Link to="/services#wooden-homes" className="hover:text-white transition-colors duration-200 inline-block">
                  Single Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Link 2 */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-white text-base font-semibold tracking-tight">
              Quick Link
            </h4>
            <ul className="space-y-3.5 text-sm text-white/70 font-normal">
              <li>
                <Link to="/projects" className="hover:text-white transition-colors duration-200 inline-block">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-200 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-200 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors duration-200 inline-block">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-white text-base font-semibold tracking-tight">
              Contact Info
            </h4>

            <div className="space-y-3.5">
              {/* Email */}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-3.5 text-white/80 hover:text-white transition-colors group"
              >
                <span className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/[0.14] transition-colors shrink-0">
                  <FaRegEnvelope className="text-sm" />
                </span>
                <span className="text-sm font-normal truncate">{BUSINESS_INFO.email}</span>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-3.5 text-white/80 hover:text-white transition-colors group"
              >
                <span className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/[0.14] transition-colors shrink-0">
                  <FaPhone className="text-sm" />
                </span>
                <span className="text-sm font-normal">{BUSINESS_INFO.displayPhone}</span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3.5 text-white/80 group">
                <span className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/[0.14] transition-colors shrink-0 mt-0.5">
                  <FaLocationDot className="text-sm" />
                </span>
                <span className="text-sm font-normal leading-relaxed text-white/70">
                  {BUSINESS_INFO.address.doorNo}, {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.area}, {BUSINESS_INFO.address.city}
                </span>
              </div>

              {/* Social Icon Buttons */}
              <div className="flex items-center gap-2.5 pt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.16] transition-all"
                >
                  <FaXTwitter className="text-xs" />
                </a>
                <a
                  href={BUSINESS_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.16] transition-all"
                >
                  <FaFacebookF className="text-xs" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.16] transition-all"
                >
                  <FaLinkedinIn className="text-xs" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.16] transition-all"
                >
                  <FaYoutube className="text-xs" />
                </a>
                <a
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.16] transition-all"
                >
                  <FaInstagram className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Copyright Divider */}
        <div className="pt-6 pb-2 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-2">
          <p>&copy; {new Date().getFullYear()} Make My Cottage Infra Pvt. Ltd. All rights reserved.</p>
          <p className="font-light">Shamshabad, Hyderabad &ndash; Wooden Homes &amp; Resort Cottages</p>
        </div>
      </div>

      {/* Giant Bildora-Style Brand Watermark across the Bottom */}
      <div className="w-full select-none pointer-events-none pt-4 sm:pt-6 pb-6 sm:pb-10 md:pb-14">
        <h2 className="w-full text-center font-extrabold tracking-[-0.035em] whitespace-nowrap text-[7.5vw] sm:text-[8.5vw] md:text-[9.4vw] lg:text-[10vw] leading-[1.05] bg-gradient-to-b from-[#e84416] via-[#d43d12] to-[#992508] bg-clip-text text-transparent px-1 sm:px-3">
          Make My Cottage
        </h2>
      </div>

      {/* Interactive Construct Your Space Game Modal */}
      <ConstructSpaceModal
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onRewardClaimed={handleRewardClaimed}
      />
    </footer>
  );
};

export default Footer;
