"use client";
import React, { useEffect, useRef } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if gsap is available
    if (typeof window !== 'undefined') {
      import('gsap').then((gsap) => {
        if (footerRef.current && contentRef.current) {
          const tl = gsap.default.timeline();
          
          tl.fromTo(
            footerRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
          ).fromTo(
            Array.from(contentRef.current.children),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.8"
          );
        }
      });
    }
  }, []);

  return (
    <div
      ref={footerRef}
      className="w-full bg-gradient-to-r from-yellow-950 via-amber-950 to-yellow-950 text-yellow-100 shadow-lg border-t border-yellow-800 relative overflow-hidden"
      style={{ fontFamily: "var(--font-alpino)" }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div ref={contentRef} className="relative z-10 py-8 px-6">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            {/* Brand & Description */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-yellow-50">Kimberly Coorg</h3>
              <p className="text-yellow-200 text-sm max-w-md leading-relaxed">
                Where Coorg's soul meets global taste. Experience authentic hospitality, premium coffee, and the tranquil charm of Coorg.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="https://kimberlycoorg.myshopify.com/" className="text-yellow-200 hover:text-yellow-50 transition-colors duration-300 hover:underline">
                Coffee
              </a>
              <a href="https://restaurants-kimberly.jenpaints.art/" className="text-yellow-200 hover:text-yellow-50 transition-colors duration-300 hover:underline">
                Resort
              </a>
              <a href="https://events-kimberly.jenpaints.art/" className="text-yellow-200 hover:text-yellow-50 transition-colors duration-300 hover:underline">
                Events
              </a>
              <a href="https://about-us-kimberly.jenpaints.art/" className="text-yellow-200 hover:text-yellow-50 transition-colors duration-300 hover:underline">
                Contact
              </a>
            </div>

            {/* Location & Contact */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-yellow-300 mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Madikeri, Coorg</span>
              </div>
              <a 
                href="mailto:Kimberlycoorg12@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-end gap-2 text-yellow-300 hover:text-yellow-100 transition-colors duration-300 group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="text-sm group-hover:underline">Kimberlycoorg12@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-yellow-800/50 mb-6"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright & Tagline */}
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span className="text-lg font-semibold tracking-wide text-yellow-50">
                © {new Date().getFullYear()} Kimberly Coorg
              </span>
              <span className="hidden md:block text-yellow-400">•</span>
              <span className="text-yellow-300 text-sm">
                Crafted with passion in the heart of Coorg
              </span>
            </div>

            {/* Social Media & Powered By */}
            <div className="flex items-center gap-4">
              {/* Social Icons */}
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-yellow-800/50 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </div>
                <div className="w-8 h-8 bg-yellow-800/50 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                  </svg>
                </div>
              </div>

              {/* Powered By */}
              <a 
                href="https://www.socialagent.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-white/20 transition-all duration-300 group"
              >
                <span className="text-xs text-yellow-200 group-hover:text-yellow-100">Powered by</span>
                <div className="bg-white rounded px-2 py-1">
                  <img 
                    src="https://www.socialagent.in/_next/static/media/logoBlue.e3f23bf1.svg" 
                    alt="Social Agent Logo" 
                    className="h-5 w-auto" 
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;