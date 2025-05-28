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
      <a href="https://www.socialagent.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
        <span className="backdrop-blur-md bg-white ">
          <img src="https://www.socialagent.in/_next/static/media/logoBlue.e3f23bf1.svg" alt="Social Agent Logo" className="h-7 w-auto" />
        </span>
      </a>
    </div>
  );
};

export default Footer;