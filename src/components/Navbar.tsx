"use client";
<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> a5ec16d71ff74644ed305bc5242276caba5102fe

const navItems = [
  { label: "Home", href: "https://kimberly-group-iota.vercel.app/" },
  { label: "Products", href: "https://kimberlycoorg.myshopify.com/" },
  { label: "Cafes", href: "https://cafe-kimberly.jenpaints.art" },
<<<<<<< HEAD
  { label: "Events", href: "https://events-kimberly.jenpaints.art" },
  { label: "Resorts", href: "https://restaurants-kimberly.jenpaints.art" },
=======
  { label: "Events", href: "https://events-kimberly.jenpaints.art" }, // assuming this is internal
  { label: "Restaurants", href: "https://restaurants-kimberly.jenpaints.art" },
>>>>>>> a5ec16d71ff74644ed305bc5242276caba5102fe
  { label: "Real Estate", href: "https://estates-kimberly.jenpaints.art" },
  { label: "About Us", href: "https://about-us-kimberly.jenpaints.art" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Apply blur if user scrolls down a bit
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/60 backdrop-blur-md border-white/30 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="https://kimberly-group-iota.vercel.app/">
          <img
            src="/logo.png"
            alt="Kimberly Group Logo"
            className="h-20 w-auto"
          />
=======
  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="https://kimberly-group-iota.vercel.app/" className="text-2xl font-bold text-black">
          Kimberly Group
>>>>>>> a5ec16d71ff74644ed305bc5242276caba5102fe
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) => (
<<<<<<< HEAD
            <div key={item.label}>
=======
            <div key={item.label} className="relative">
>>>>>>> a5ec16d71ff74644ed305bc5242276caba5102fe
              <a
                href={item.href}
                className="font-medium text-black hover:text-red-600 transition"
              >
                {item.label}
              </a>
            </div>
          ))}
        </nav>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
<<<<<<< HEAD
=======
            {/* You can add an icon here if you'd like */}
>>>>>>> a5ec16d71ff74644ed305bc5242276caba5102fe
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 pt-2 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <a
                href={item.href}
                className="block text-base text-black font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
