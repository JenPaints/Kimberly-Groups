"use client";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products"},
  { label: "Cafes", href: "/cafes" },
  { label: "Events", href: "/events" },
  { label: "Restaurants", href: "/restaurants" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "About Us", href: "/about" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30 shadow-sm transition-all duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          Kimberly Group
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 relative">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
    
            >
              <Link
                href={item.href}
                className="font-medium text-black hover:text-red-600 flex items-center gap-1 transition"
              >
                {item.label}
                
              </Link>

            </div>
          ))}
        </nav>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 pt-2 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block text-base text-black font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
