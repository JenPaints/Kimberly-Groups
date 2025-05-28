"use client";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "https://kimberly-group-iota.vercel.app/" },
  { label: "Products", href: "https://kimberlycoorg.myshopify.com/" },
  { label: "Cafes", href: "https://cafe-kimberly.jenpaints.art" },
  { label: "Events", href: "https://events-kimberly.jenpaints.art" }, // assuming this is internal
  { label: "Restaurants", href: "https://restaurants-kimberly.jenpaints.art" },
  { label: "Real Estate", href: "https://estates-kimberly.jenpaints.art" },
  { label: "About Us", href: "https://about-us-kimberly.jenpaints.art" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <a href="https://kimberly-group-iota.vercel.app/" className="text-2xl font-bold text-black">
          Kimberly Group
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <a
                href={item.href}
                className="font-medium text-black hover:text-red-600 flex items-center gap-1 transition"
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
            {/* You can add an icon here if you'd like */}
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
