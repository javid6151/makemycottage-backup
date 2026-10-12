import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiArrowNarrowRight, HiPhone } from 'react-icons/hi';
import { BUSINESS_INFO, NAV_LINKS } from '../../utils/constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId, e) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${sectionId}`);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [location]);

  return (
    <>
      {(() => {
        const isHomePage = location.pathname === '/';
        const isDarkTheme = isHomePage;

        return (
          <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 ${
              isScrolled
                ? isDarkTheme
                  ? 'py-3.5 bg-black/85 backdrop-blur-xl border-b border-white/10 shadow-lg'
                  : 'py-3.5 bg-[#FFF7E5]/90 backdrop-blur-xl border-b border-[#E8DDCA] shadow-sm'
                : 'py-5 sm:py-7 bg-transparent'
            }`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Logo with Brick / Cottage Icon */}
              <Link
                to="/"
                className={`flex items-center gap-2.5 group z-50 transition-opacity hover:opacity-85 ${
                  isDarkTheme ? 'text-white' : 'text-[#1B1915]'
                }`}
              >
                <div className={`w-7 h-7 flex items-center justify-center ${
                  isDarkTheme ? 'text-white' : 'text-[#1B1915]'
                }`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L2 10V21H22V10L12 3ZM4 19V11.2L12 5.6L20 11.2V19H4Z" />
                    <path d="M6 13H10V15H6V13ZM14 13H18V15H14V13ZM10 16H14V18H10V16ZM6 16H9V18H6V16ZM15 16H18V18H15V16Z" opacity="0.85" />
                  </svg>
                </div>
                <span className={`font-sans text-xl sm:text-2xl font-semibold tracking-tight transition-colors ${
                  isDarkTheme ? 'text-white' : 'text-[#1B1915]'
                }`}>
                  Make My Cottage.
                </span>
              </Link>

              {/* Floating Center Pill Nav */}
              <nav className={`hidden md:flex items-center gap-8 px-7 py-2.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'border border-white/20 bg-white/10'
                  : 'border border-[#1B1915]/15 bg-[#1B1915]/[0.05]'
              }`}>
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/' 
                      ? (isDarkTheme ? 'text-white font-semibold' : 'text-[#1B1915] font-semibold')
                      : (isDarkTheme ? 'text-white/85 hover:text-white' : 'text-[#1B1915]/70 hover:text-[#1B1915]')
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/about' 
                      ? (isDarkTheme ? 'text-white font-semibold' : 'text-[#1B1915] font-semibold')
                      : (isDarkTheme ? 'text-white/85 hover:text-white' : 'text-[#1B1915]/70 hover:text-[#1B1915]')
                  }`}
                >
                  About
                </Link>
                <Link 
                  to="/services" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/services' 
                      ? (isDarkTheme ? 'text-white font-semibold' : 'text-[#1B1915] font-semibold')
                      : (isDarkTheme ? 'text-white/85 hover:text-white' : 'text-[#1B1915]/70 hover:text-[#1B1915]')
                  }`}
                >
                  Services
                </Link>
                <Link 
                  to="/projects" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/projects') 
                      ? (isDarkTheme ? 'text-white font-semibold' : 'text-[#1B1915] font-semibold')
                      : (isDarkTheme ? 'text-white/85 hover:text-white' : 'text-[#1B1915]/70 hover:text-[#1B1915]')
                  }`}
                >
                  Projects
                </Link>
                <Link 
                  to="/gallery" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/gallery' 
                      ? (isDarkTheme ? 'text-white font-semibold' : 'text-[#1B1915] font-semibold')
                      : (isDarkTheme ? 'text-white/85 hover:text-white' : 'text-[#1B1915]/70 hover:text-[#1B1915]')
                  }`}
                >
                  Gallery
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/contact' 
                      ? (isDarkTheme ? 'text-white font-semibold' : 'text-[#1B1915] font-semibold')
                      : (isDarkTheme ? 'text-white/85 hover:text-white' : 'text-[#1B1915]/70 hover:text-[#1B1915]')
                  }`}
                >
                  Contact
                </Link>
              </nav>

              {/* Right Action Button */}
              <div className="hidden sm:flex items-center gap-3 z-50">
                <Link
                  to="/contact"
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-md ${
                    isDarkTheme
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-[#1B1915] text-[#FCF6E9] hover:bg-black'
                  }`}
                >
                  Let’s Build
                </Link>
              </div>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden z-50 p-2 rounded-full backdrop-blur-md transition-all focus:outline-none ${
                  isDarkTheme
                    ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    : 'bg-[#1B1915]/5 text-[#1B1915] border border-[#1B1915]/10 hover:bg-[#1B1915]/10'
                }`}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
              </button>
            </div>
          </header>
        );
      })()}

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-12 transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        <div className="pt-24">
          <p className="text-white/60 text-xs uppercase tracking-[0.25em] font-medium mb-8">
            • YOUR VISION. OUR CRAFT.
          </p>
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
            >
              Services
            </Link>
            <Link
              to="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
            >
              Projects
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-3xl font-medium text-white hover:text-white/80 transition-colors py-2 border-b border-white/10"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="pt-8 border-t border-white/15 space-y-4">
          <div className="flex flex-col gap-1 text-sm text-white/70">
            <span className="uppercase tracking-widest text-xs text-white/50">Experience Center</span>
            <span>{BUSINESS_INFO.address.area}, Hyderabad</span>
            <span className="text-white font-medium">{BUSINESS_INFO.displayPhone}</span>
          </div>

          <div className="flex gap-3">
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 py-3 text-center rounded-full text-xs uppercase tracking-widest font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-sm"
            >
              Let’s Build &rarr;
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-5 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-white/10 text-white border border-white/20 text-center hover:bg-white/20 transition-all flex items-center justify-center shadow-sm"
            >
              <HiPhone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
