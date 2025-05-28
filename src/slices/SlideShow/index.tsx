"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState, useEffect } from "react";

/**
 * Props for `SlideShow`.
 */
export type SlideShowProps = SliceComponentProps<Content.SlideShowSlice>;

// Hardcoded slides with both images and videos
const slides = [
  { type: "video", src: "https://video.restaurantguru.com/video/630/26820630.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=700&fit=crop" },
  { type: "video", src: "https://video.restaurantguru.com/video/628/26820628.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=700&fit=crop" },
  { type: "video", src: "https://video.restaurantguru.com/video/629/26820629.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=700&fit=crop" },
  { type: "reel", src: "https://www.instagram.com/reel/Cxawr42J-ee/embed" },
  { type: "image", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=700&fit=crop" },
  { type: "reel", src: "https://www.instagram.com/reel/Cu9SDTRLfDi/embed" },
  { type: "image", src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=700&fit=crop" },
  { type: "reel", src: "https://www.instagram.com/reel/CUETdBZqmFy/embed" },
];

const SlideShow = ({ slice }: SlideShowProps): JSX.Element => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-slide logic - different timing for images vs videos
  useEffect(() => {
    if (!isPlaying) return;
    
    const currentSlide = slides[current];
    // Images: 4 seconds, Videos/Reels: 8 seconds
    const duration = currentSlide.type === 'image' ? 4000 : 8000;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(interval);
  }, [current, isPlaying]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const renderSlide = (slide: typeof slides[0]) => {
    switch (slide.type) {
      case "video":
        return (
          <video
            key={slide.src}
            src={slide.src}
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
          />
        );
      case "image":
        return (
          <img
            key={slide.src}
            src={slide.src}
            alt="Cafe scene"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        );
      case "reel":
        return (
          <iframe
            key={slide.src}
            src={slide.src}
            className="w-full h-full"
            allowFullScreen
            title={`Instagram Reel`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-8 sm:py-12 lg:py-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-amber-25 to-sky-25"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent mb-3">
            Glimpse of Kimberly Cafe
          </h2>
          
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the warmth, flavors, and atmosphere that make our cafe special
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-4">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-24 sm:w-32"></div>
            <div className="mx-3 w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent w-24 sm:w-32"></div>
          </div>
        </div>

        {/* Slideshow Container - Mobile First Design */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          
          {/* Main Slideshow - 9:16 Aspect Ratio */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0">
            {/* Slide container with 9:16 ratio */}
            <div className="relative w-full aspect-[9/16] bg-gradient-to-br from-gray-900 to-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              {renderSlide(slides[current])}

              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 group">
                
                {/* Top controls bar */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  {/* Play/Pause button */}
                  <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all duration-200 opacity-80 group-hover:opacity-100"
                    aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  {/* Slide counter */}
                  <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {current + 1} / {slides.length}
                  </div>
                </div>

                {/* Navigation arrows - centered vertically */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-all duration-200 opacity-60 hover:opacity-100 group-hover:opacity-80"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-all duration-200 opacity-60 hover:opacity-100 group-hover:opacity-80"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Content type indicator */}
                <div className="absolute bottom-4 left-4">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    slides[current].type === 'video' ? 'bg-blue-500/80 text-white' :
                    slides[current].type === 'image' ? 'bg-green-500/80 text-white' :
                    'bg-pink-500/80 text-white'
                  }`}>
                    {slides[current].type === 'video' ? '📹 Video' :
                     slides[current].type === 'image' ? '🖼️ Photo' :
                     '📱 Reel'}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                  style={{ width: `${((current + 1) / slides.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Dots Navigation - Mobile optimized */}
            <div className="flex justify-center mt-4 px-4 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current 
                        ? "bg-gradient-to-r from-amber-400 to-orange-500 scale-125 shadow-lg" 
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                    }`}
                    onClick={() => setCurrent(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Information Panel - Desktop */}
          <div className="hidden lg:block w-80 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Find Us Here</h3>
              <div className="w-full h-56 rounded-xl overflow-hidden shadow-md mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15734.04942500253!2d75.7377582!3d12.4151101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDI0JzU0LjQiTiA3NcKwNDQnMTUuOSJF!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kimberly Cafe Location"
                ></iframe>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=12.4151101000,75.7377582000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-lg shadow hover:scale-105 hover:from-orange-500 hover:to-amber-400 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243m0 0A8 8 0 1112 20a8 8 0 01-5.657-2.343z" /></svg>
                Get Directions
              </a>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="space-y-3">
                <a 
                  href="https://www.instagram.com/kimberlycoorg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-pink-600 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="font-medium">Instagram</span>
                </a>

                <a 
                  href="https://facebook.com/kimberlycafe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="font-medium">Facebook</span>
                </a>

                <a 
                  href="https://youtube.com/@kimberlycafe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="font-medium">YouTube</span>
                </a>

                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>
                    </svg>
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Info Panel */}
        <div className="lg:hidden mt-6 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-1"></div>
              <div className="text-xs text-gray-600">Videos</div>
              <div className="text-sm font-semibold text-gray-800">{slides.filter(s => s.type === 'video').length}</div>
            </div>
            <div>
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-1"></div>
              <div className="text-xs text-gray-600">Photos</div>
              <div className="text-sm font-semibold text-gray-800">{slides.filter(s => s.type === 'image').length}</div>
            </div>
            <div>
              <div className="w-4 h-4 bg-pink-500 rounded-full mx-auto mb-1"></div>
              <div className="text-xs text-gray-600">Reels</div>
              <div className="text-sm font-semibold text-gray-800">{slides.filter(s => s.type === 'reel').length}</div>
            </div>
          </div>
        </div>
     

        {/* Events Bento Grid Video Collage */}
        <div className="mt-16 lg:mt-20">
          {/* Events Header */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4 tracking-tight">
              EVENTS
            </h2>
            
            <p className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Immerse yourself in the vibrant energy of Kimberly Coorg's exclusive events - where memories are crafted and magic happens
            </p>
            
            {/* Animated decorative elements */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent w-32 sm:w-48"></div>
              <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-bounce"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent w-32 sm:w-48"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-purple-500 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>

          {/* Clean Bento Grid Video Collage */}
          <div className="grid grid-cols-6 gap-4 sm:gap-8 max-w-7xl mx-auto">
            
            {/* Large Hero Video - Dominant Feature */}
            <div className="col-span-6 sm:col-span-4 h-[300px] sm:h-[400px] group relative overflow-hidden rounded-3xl shadow-2xl">
              <video
                src="https://jenpaints.art/wp-content/uploads/2025/05/7.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">Grand Celebration</h3>
                <p className="text-white/90 text-sm sm:text-base">Experience the grandeur of our signature events</p>
              </div>
            </div>

            {/* Tall Video - Right Column */}
            <div className="col-span-6 sm:col-span-2 h-[300px] sm:h-[400px] group relative overflow-hidden rounded-3xl shadow-xl">
              <video
                src="https://jenpaints.art/wp-content/uploads/2025/05/6.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-1">Gatherings</h3>
                <p className="text-white/80 text-xs sm:text-sm">Cozy moments that matter</p>
              </div>
            </div>

            {/* Three Equal Medium Videos */}
            <div className="col-span-6 sm:col-span-2 h-[200px] sm:h-[250px] group relative overflow-hidden rounded-2xl shadow-xl">
              <video
                src="https://jenpaints.art/wp-content/uploads/2025/05/5.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">Culinary Excellence</h3>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-2 h-[200px] sm:h-[250px] group relative overflow-hidden rounded-2xl shadow-xl">
              <video
                src="https://jenpaints.art/wp-content/uploads/2025/05/4.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">Special Events</h3>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-2 h-[200px] sm:h-[250px] group relative overflow-hidden rounded-2xl shadow-xl">
              <video
                src="https://jenpaints.art/wp-content/uploads/2025/05/3.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">Scenic Celebrations</h3>
              </div>
            </div>

            {/* Bottom Two Videos */}
            <div className="col-span-6 sm:col-span-3 h-[200px] sm:h-[250px] group relative overflow-hidden rounded-2xl shadow-xl">
              <video
                src="https://jenpaints.art/wp-content/uploads/2025/05/2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-base sm:text-lg mb-1">Musical Evenings</h3>
                <p className="text-white/90 text-xs sm:text-sm">Rhythm & soul combined</p>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3 h-[200px] sm:h-[250px] group relative overflow-hidden rounded-2xl shadow-xl">
              <video
                src="https://jenpaints.art/wp-content/uploads/2025/05/1.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-base sm:text-lg mb-1">Signature Moments</h3>
                <p className="text-white/90 text-xs sm:text-sm">Creating lasting memories</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 lg:mt-12">
            <a
              href="https://www.instagram.com/kimberlycoorg/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full px-8 py-4 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="text-white font-bold text-lg">Join Our Next Event</span>
              <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlideShow;