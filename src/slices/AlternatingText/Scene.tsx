"use client";
import { Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import StaticLogo from "@/components/StaticLogo"; // You'll need to create this component
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Scene() {
  const logoRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  
  // Track current logo index - start with 3.jpeg (index 0 in reordered array)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  
  const bgColors = ["#FAFAF9", "#FAFAF9", "#FAFAF9"];
  
  // Define your 3 logo images here (relative to public folder)
  // Order: 3.jpeg (start) -> 2.jpeg (right to left) -> 1.jpeg (left to right) -> repeat
  const logos = [
    "/3.JPEG", // Index 0 - Starting logo
    "/2.JPEG", // Index 1 - Right to left movement
    "/1.JPEG"  // Index 2 - Left to right movement
  ];

  useGSAP(
    () => {
      if (!logoRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // Smoother scrubbing
        },
      });

      sections.forEach((_, index) => {
        if (!logoRef.current) return;
        
        const isOdd = index % 2 !== 0;
        const xPosition = isDesktop ? (isOdd ? "-1" : "1") : 0;
        const yRotation = isDesktop ? (isOdd ? ".4" : "-.4") : 0;
        
        const logoIndex = index % logos.length;
        
        if (index === 0) {
          scrollTl.call(() => {
            setCurrentLogoIndex(logoIndex);
          });
          return;
        }
        
        if (logoRef.current) {
          scrollTl
            .to(logoRef.current.position, {
              x: xPosition,
              ease: "power3.inOut", // Smoother easing
              duration: 1.5,
            })
            .to(logoRef.current.rotation, {
              y: yRotation,
              ease: "elastic.out(1, 0.3)", // More playful rotation
              duration: 1.5,
            }, "<")
            .to(logoRef.current.scale, {
              x: 0.9, y: 0.9, z: 0.9, // Subtle scaling effect
              ease: "back.out",
              duration: 0.5
            }, "<");
        }

        scrollTl
          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index),
            duration: 0.8
          })
          .call(() => {
            setCurrentLogoIndex(logoIndex);
            // Reset scale after logo change
            if (logoRef.current) {
              gsap.to(logoRef.current.scale, {
                x: 1, y: 1, z: 1,
                duration: 0.5
              });
            }
          });
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group
      ref={logoRef}
      position-x={isDesktop ? 1 : 0}
      rotation-y={isDesktop ? -0.3 : 0}
    >
      <StaticLogo src={logos[currentLogoIndex]} />
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}