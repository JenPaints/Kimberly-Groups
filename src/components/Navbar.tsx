"use client";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "https://kimberly-group-iota.vercel.app/" },
  { label: "Products", href: "https://kimberlycoorg.myshopify.com/" },
  { label: "Cafes", href: "https://cafe-kimberly.jenpaints.art" },
  { label: "Events", href: "https://events-kimberly.jenpaints.art" },
  { label: "Restaurants", href: "https://restaurants-kimberly.jenpaints.art" },
  { label: "Real Estate", href: "https://estates-kimberly.jenpaints.art" },
  { label: "About Us", href: "https://about-us-kimberly.jenpaints.art" }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
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
