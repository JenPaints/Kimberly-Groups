"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      gsap.fromTo(
        footerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div
      ref={footerRef}
      className="w-full py-6 px-4 flex justify-between items-center bg-yellow-950 text-yellow-100 shadow-lg border-t border-yellow-800"
      style={{ fontFamily: "var(--font-alpino)" }}
    >
      <span className="text-lg font-semibold tracking-wide">© {new Date().getFullYear()} Kimberly Group</span>
      <span className="text-sm opacity-80">Crafted by <span className="text-pink-400">♥</span> Social Agent</span>
    </div>
  );
};

export default Footer;