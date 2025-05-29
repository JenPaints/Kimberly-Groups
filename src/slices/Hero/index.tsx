"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import type { JSX } from "react";
import { useRef, useState, useEffect, useCallback } from "react";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import Navbar from "@/components/Navbar"; 
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const isMobile = useMediaQuery("(max-width: 767px)", false);
  
  // Mobile-specific states
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const surpriseRef = useRef<HTMLDivElement>(null);

  // Scratch-to-reveal functionality
  const initScratchCanvas = useCallback(() => {
    if (!canvasRef.current || !isMobile) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2; // High DPI
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Create scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#FEF3C7');
    gradient.addColorStop(0.5, '#FBBF24');
    gradient.addColorStop(1, '#F59E0B');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    // Add coffee bean pattern
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = '#92400E';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      ctx.beginPath();
      ctx.ellipse(x, y, 8, 12, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.globalCompositeOperation = 'source-over';
    
    // Add "Scratch to reveal" text
    ctx.fillStyle = '#7C2D12';
    ctx.font = 'bold 18px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch to reveal ✨', rect.width / 2, rect.height / 2);
  }, [isMobile]);

  const handleScratch = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!canvasRef.current || isRevealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * 2;
      y = (e.touches[0].clientY - rect.top) * 2;
    } else {
      x = (e.clientX - rect.left) * 2;
      y = (e.clientY - rect.top) * 2;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    
    const progress = transparent / (pixels.length / 4);
    setScratchProgress(progress);
    
    if (progress > 0.3 && !isRevealed) {
      setIsRevealed(true);
      // Animate reveal
      gsap.to(canvasRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, [isRevealed]);

  // Shake detection for surprise
  useEffect(() => {
    if (!isMobile) return;

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      const acceleration = e.accelerationIncludingGravity;
      if (!acceleration) return;
      
      const { x, y, z } = acceleration;
      const totalAcceleration = Math.sqrt(x! * x! + y! * y! + z! * z!);
      
      if (totalAcceleration > 25) {
        setShakeCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3 && !showSurprise) {
            setShowSurprise(true);
            // Reset shake count
            setTimeout(() => setShakeCount(0), 1000);
          }
          return newCount;
        });
      }
    };

    if (typeof DeviceMotionEvent !== 'undefined') {
      window.addEventListener('devicemotion', handleDeviceMotion);
      return () => window.removeEventListener('devicemotion', handleDeviceMotion);
    }
  }, [isMobile, showSurprise]);

  // Pull-to-refresh effect
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !heroRef.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    
    if (diff > 0 && window.scrollY === 0) {
      const distance = Math.min(diff * 0.5, 100);
      setPullDistance(distance);
      
      // Apply transform
      heroRef.current.style.transform = `translateY(${distance}px)`;
      
      // Color shift effect
      const intensity = distance / 100;
      document.body.style.backgroundColor = `hsl(${45 + intensity * 15}, ${70 + intensity * 20}%, ${95 - intensity * 10}%)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !heroRef.current) return;
    
    // Snap back animation
    gsap.to(heroRef.current, {
      y: 0,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
    
    setPullDistance(0);
    
    // Trigger surprise if pulled far enough
    if (pullDistance > 80) {
      setShowSurprise(true);
    }
  };

  // GSAP Animations
  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTl = gsap.timeline();

      if (isMobile) {
        // Mobile-specific intro animation
        introTl
          .set(".hero", { opacity: 1 })
          .from(".hero-header-word", {
            scale: 1.5,
            opacity: 0,
            rotateX: 90,
            transformOrigin: "center bottom",
            ease: "back.out(1.7)",
            stagger: 0.2,
          })
          .from(".hero-subheading", {
            opacity: 0,
            y: 20,
            scale: 0.9,
          }, "-=0.3")
          .from(".hero-body", {
            opacity: 0,
            y: 15,
            scale: 0.95,
          })
          .from(".hero-button", {
            opacity: 0,
            scale: 0.8,
            rotation: 5,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          })
          .from(".mobile-hint", {
            opacity: 0,
            y: 10,
            duration: 0.8
          });
      } else {
        // Desktop animation (original)
        introTl
          .set(".hero", { opacity: 1 })
          .from(".hero-header-word", {
            scale: 3,
            opacity: 0,
            ease: "power4.in",
            delay: 0.3,
            stagger: 1,
          })
          .from(".hero-subheading", {
            opacity: 0,
            y: 30,
          }, "+=.8")
          .from(".hero-body", {
            opacity: 0,
            y: 10,
          })
          .from(".hero-button", {
            opacity: 0,
            y: 10,
            duration: 0.6,
          });
      }

      // Scroll animations
      if (isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        scrollTl
          .to("body", {
            backgroundColor: "#FEF3C7",
          })
          .from(".text-side-heading .split-char", {
            scale: 1.2,
            y: 20,
            opacity: 0,
            stagger: 0.05,
            ease: "power2.out",
          })
          .from(".text-side-body", {
            y: 15,
            opacity: 0,
          });
      } else {
        // Desktop scroll animation (original)
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        scrollTl
          .fromTo("body", {
            backgroundColor: "#FAFAF9",
          }, {
            backgroundColor: "#FEF3C7",
            overwrite: "auto",
          }, 1)
          .from(".text-side-heading .split-char", {
            scale: 1.3,
            y: 40,
            rotate: -25,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(3)",
            duration: 0.5,
          })
          .from(".text-side-body", {
            y: 20,
            opacity: 0,
          });
      }
    },
    { dependencies: [ready, isDesktop, isMobile] },
  );

  // Surprise animation
  useGSAP(() => {
    if (showSurprise && surpriseRef.current) {
      gsap.fromTo(surpriseRef.current, 
        { 
          scale: 0, 
          rotation: -180,
          opacity: 0 
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        }
      );
      
      // Auto-hide after 3 seconds
      setTimeout(() => setShowSurprise(false), 3000);
    }
  }, [showSurprise]);

  useEffect(() => {
    if (isMobile) {
      initScratchCanvas();
    }
  }, [isMobile, initScratchCanvas]);

  return (
    <>
      <Navbar />
      
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      >
        <img
          src="/labels/beans-bg.png"
          alt="Coffee bean background"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
      </div>

      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="hero opacity-0 relative z-10"
        ref={heroRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desktop Scene */}
        {isDesktop && (
          <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
            <Scene />
            <Bubbles count={300} speed={2} repeat={true} />
          </View>
        )}

        <div className="grid">
          <div className="grid h-screen place-items-center relative">
            <div className="grid auto-rows-min place-items-center text-center relative">
              
              {/* Mobile Scratch Canvas Overlay */}
              {isMobile && !isRevealed && (
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full z-20 cursor-pointer"
                  onTouchMove={handleScratch}
                  onMouseMove={handleScratch}
                  style={{ touchAction: 'none' }}
                />
              )}
              
              <h1 className="hero-header text-5xl font-black uppercase leading-[.8] text-yellow-700 md:text-[4rem] lg:text-[7rem]">
                <TextSplitter
                  text={asText(slice.primary.heading)}
                  wordDisplayStyle="block"
                  className="hero-header-word"
                />
              </h1>
              
              <div className="hero-subheading mt-6 text-4xl font-semibold text-sky-950 lg:text-4xl">
                <PrismicRichText field={slice.primary.subheading} />
              </div>
              
              <div className="hero-body text-2xl font-normal text-sky-950">
                <PrismicRichText field={slice.primary.body} />
              </div>
              
              <Button
                buttonLink={slice.primary.button_link}
                buttonText={slice.primary.button_text}
                className="hero-button mt-12"
              />
              
              {/* Mobile Interaction Hints */}
              {isMobile && (
                <div className="mobile-hint mt-8 text-center text-sky-700">
                  <p className="text-sm opacity-70">
                    {!isRevealed ? "🎨 Scratch above to reveal" : "📱 Shake your phone for a surprise"}
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    Pull down to refresh the experience
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
            <PrismicNextImage
              className="w-full md:hidden"
              field={slice.primary.cans_image}
            />
            <div>
              <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
                <TextSplitter text={asText(slice.primary.second_heading)} />
              </h2>
              <div className="text-side-body mt-4 max-w-2xl text-balance text-2xl font-normal text-sky-950">
                <PrismicRichText field={slice.primary.second_body} />
              </div>
            </div>
          </div>
        </div>
      </Bounded>

      {/* Surprise Element */}
      {showSurprise && (
        <div
          ref={surpriseRef}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-full shadow-2xl text-center">
            <div className="text-4xl mb-2">🎉</div>
            <div className="font-bold text-xl">Surprise!</div>
            <div className="text-sm">You found the secret!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;