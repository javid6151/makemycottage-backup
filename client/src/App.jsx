import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';

gsap.registerPlugin(ScrollTrigger);

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));

// Premium Loader
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-primary-950">
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-primary-800"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-accent-terracotta animate-spin"></div>
      </div>
      <p className="font-heading tracking-[0.3em] text-xs uppercase text-primary-400">
        Make My Cottage
      </p>
    </div>
  </div>
);

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-screen bg-primary-950 flex items-center justify-center text-center px-6">
    <div>
      <h1 className="font-heading text-8xl md:text-9xl text-accent-terracotta mb-4">404</h1>
      <h2 className="font-heading text-3xl md:text-4xl text-primary-50 mb-6">Page Not Found</h2>
      <p className="text-primary-400 mb-10 max-w-md mx-auto font-light">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block px-8 py-4 bg-accent-terracotta text-white text-xs uppercase tracking-widest font-semibold hover:bg-primary-50 hover:text-primary-950 transition-colors duration-300"
      >
        Back to Home &rarr;
      </a>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes with layout (navbar + footer) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin Login (no layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin routes with AdminLayout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
