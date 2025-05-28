"use client";
import { useState } from "react";

const slides = [
  { type: "video", src: "https://video.restaurantguru.com/video/630/26820630.mp4" },
  { type: "video", src: "https://video.restaurantguru.com/video/628/26820628.mp4" },
  { type: "video", src: "https://video.restaurantguru.com/video/629/26820629.mp4" },
  { type: "reel", src: "https://www.instagram.com/reel/Cxawr42J-ee/embed" },
  { type: "reel", src: "https://www.instagram.com/reel/Cu9SDTRLfDi/embed" },
  { type: "reel", src: "https://www.instagram.com/reel/CUETdBZqmFy/embed" },
];

const Slideshow = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
        {slides[current].type === "video" ? (
          <video
            key={slides[current].src}
            src={slides[current].src}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        ) : (
          <iframe
            key={slides[current].src}
            src={slides[current].src}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-2 py-1 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-black px-2 py-1 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-sky-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
